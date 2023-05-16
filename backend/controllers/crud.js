const User = require("../models/user");

exports.getMyLists = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  res.status(200).send(req.user.lists);
};

exports.createList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  if (!req.body.data) {
    res.status(422).send({ error: "You need to pass in data" });
  }
  const data = req.body.data;
  const userID = data.listMakerID;
  const user = await User.findOne({ uniqueID: userID });
  user.lists.push(data);
  user.save().then((savedDoc) => {
    if (savedDoc === user) {
      res.status(200).send(savedDoc.lists);
    }
  });
};

exports.addToList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  const book = req.body.book;
  const listID = req.body.listID;
  const listTitle = req.body.listTitle;
  const uniqueID = req.user.uniqueID;
  
  let doc = await User.findOneAndUpdate(
    { uniqueID, "lists.listID": listID },
    { $push: { "lists.$.list": book } },
    { new: true }
  );
  const date = new Date();
  const dateString =
    date.getHours() +
    ":" +
    date.getMinutes() +
    ", " +
    date.getMonth() +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();

  const string =
    req.user.profile.userName +
    " added book " +
    req.body.book.title +
    " to his list " +
    listTitle +
    ". --- " +
    dateString;
  try {
    res.send(doc.lists);
  } catch {
    console.error("failed to get doc");
  }
};

exports.deleteFromList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  const bookID = req.body.bookID;
  const listID = req.body.listID;
  const uniqueID = req.user.uniqueID;

  let doc = await User.findOneAndUpdate(
    { uniqueID, "lists.listID": listID },
    { $pull: { "lists.$.list": { ID: bookID } } },
    { new: true }
  );
  res.send(doc.lists);
};

exports.editList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  if (!req.body.changeData.listTitle && !req.body.changeData.listComment) {
    res.status(406).send("Your request format is incorrect");
  }
  const newTitle = req.body.changeData.listTitle;
  const newComment = req.body.changeData.listComment;
  const listID = req.body.changeData.listID;
  const uniqueID = req.user.uniqueID;

  let doc = await User.findOneAndUpdate(
    { uniqueID, "lists.listID": listID },
    {
      $set: {
        "lists.$.listTitle": newTitle,
        "lists.$.listComment": newComment,
      },
    },
    { new: true }
  );
  doc.save().then(() => res.send(doc.lists));
};

exports.deleteList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  const listTitle = req.body.listTitle;
  const uniqueID = req.user.uniqueID;
  const user = await User.findOne({ uniqueID });
  const ListOfInterest = user.lists.filter(
    (elem) => elem.listTitle == listTitle
  )[0];
  const index = user.lists.indexOf(ListOfInterest);
  user.lists.splice(index, 1);
  user.save().then((savedDoc) => {
    savedDoc === user;
    res.status(200).send(savedDoc.lists);
  });
};

exports.getCommLists = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  const users = await User.aggregate([{ $sample: { size: 10 } }]);
  let commLists = [];
  const usedIndexMap = new Map();
  while (commLists.length < 10) {
    for (let i = 0; i < users.length; i++) {
      if (!usedIndexMap.has(i)) {
        usedIndexMap.set(i, []);
      }
      let listLength = users[i].lists.length;
      if (listLength == 0) {
        continue;
      }
      if (usedIndexMap.get(i).length == listLength) {
        continue;
      }

      const userID = users[i].uniqueID;
      const listMakerName =
        users[i].profile.userName == "Booklist User"
          ? "Anonymous User"
          : users[i].profile.userName;

      let index = Math.floor(Math.random() * (listLength + 1));
      while (
        usedIndexMap.get(i).includes(index) &&
        usedIndexMap.get(i).length != listLength
      ) {
        index = Math.floor(Math.random() * (listLength + 1));
      }
      usedIndexMap.get(i).push(index);
      const currList = users[i].lists[index];
      const listObjWithName = { currList, listMakerName, userID };
      if (users[i].lists[index] != undefined) {
        commLists.push(listObjWithName);
      }
    }
  }
  res.status(200).send({ commLists });
};

exports.getList = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  const listID = req.query.listID;
  const userID = req.query.userID;
  const user= await User.findOne({uniqueID: userID})
  const lists = user.lists.filter((elem) => elem.listID == listID)
  res.status(200).send({ lists });
};

