const User = require("../models/user");
const isImageURL = require("image-url-validator").default;
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("node:path");

//install mongodb driver and create profile picture collection
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbName = "booklistAuth";
const client = new MongoClient("mongodb://localhost:27017");

exports.getProfile = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  const user = await User.findOne({ uniqueID: req.user.uniqueID });
  const profilePicture = user.profile.profilePicture[0];
  console.log(profilePicture);

  if (profilePicture.type == "pfpUploadSubmit") {
    client.connect(function (err) {
      assert.equal(null, err);
      console.log("Connected successfully to server!");
      const db = client.db(dbName);
      const bucket = new mongodb.GridFSBucket(db);
      const dlpath = path.join(
        __dirname,
        `../public/${profilePicture.payload}.jpeg`
      );

      bucket
        .openDownloadStreamByName(profilePicture.payload)
        .pipe(fs.createWriteStream(dlpath))
        .on("error", function (error) {
          assert.ifError(error);
        })
        .on("finish", function () {
          console.log("done!");
          res.send({
            ...user.profile,
            url: `http://localhost:3020/${profilePicture.payload}.jpeg`,
          });
        });
    });
  }
  if (profilePicture.type == "pfpUrlSubmit") {
    res.send({ ...user.profile, url: profilePicture.payload });
  }
};

exports.updateProfile = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  const data = req.body;
  console.log(data);
  const user = await User.findOne({ uniqueID: req.user.uniqueID });
  user.profile = { ...user.profile, ...data };
  user.save().then(() => {
    console.log(user);
    res.status(200).send("success");
  });
};

exports.updatePfp = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  //req.file is the profile picture if it's uploaded
  const data = req.body;
  console.log(req.body);
  const user = await User.findOne({ uniqueID: req.user.uniqueID });

  isImageURL(data.payload).then((is_image) => {
    if (is_image) {
      user.profile = { ...user.profile, profilePicture: data };
      user.save().then((user) => {
        res.status(200).json(user.profile.profilePicture);
      });
    }
    if (!is_image) {
      res.status(406).send("invalid url");
    }
  });
};

exports.uploadPfp = async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  console.log(req.file);
  const user = await User.findOne({ uniqueID: req.user.uniqueID });

  //install mongodriver and add pfp collection

  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    var bucket = new mongodb.GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(req.file.filename);

    fs.createReadStream(req.file.path)
      .pipe(uploadStream)
      .on("error", function (error) {
        assert.ifError(error);
      })
      .on("finish", function () {
        console.log("done!");
      });
  });

  user.profile = {
    ...user.profile,
    profilePicture: { type: "pfpUploadSubmit", payload: req.file.filename },
  };
  user.save().then((user) => {
    res.json(user.profile.profilePicture);
    console.log(user.profile.profilePicture);
  });
};
