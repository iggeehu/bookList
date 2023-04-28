const uuid = require("uuid");

const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");
const read = require("body-parser/lib/read");
const { request } = require("express");
const sign = require("jwt-encode");
const nodemailer = require("nodemailer");

function tokenForUser(user) {
  return jwt.encode({ sub: user.id }, config.secret);
}

exports.signup = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password",
    });
  }

  if (password.length > 30) {
    return res
      .status(422)
      .send({ error: "Please keep your password under 30 digits." });
  }

  const secret = "xbuhjyklh";

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    //if it does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: "email is in use" });
    }
  });

  const user = new User({
    uniqueID: uuid.v4(),
    status: { confirmed: false, dataset: { ID: this.uniqueID, token: "" } },
    email: email,
    password: password,
    profile: {
      profilePicture:
        "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg",
      userName: "Booklist User",
      age: 30,
      gender: "",
      followedBy: [],
      following: [],
      aboutMe: "There is nothing about me yet.",
    },
  });

  token = sign(user.uniqueID, secret);
  user.status.dataset.token = token;

  // res.json({token:tokenForUser(user),
  //     id: user.uniqueID })
  //if a user with email does not exist in db, create and save user record

  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"Booklist Signup 👻" <bookList@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Please confirm your account", // Subject line
    text: `Thank you for signing up, please click here to confirm your account: http://localhost:3020/confirm/${token}`, // plain text body
    html: "<div>`Thank you for signing up, please click here to confirm your account: http://localhost:3020/confirm/${token}`</div>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  user
    .save()
    .then(() =>
      res.send(
        "We sent a confirmation email to you through a simulator, check your email at:" +
          nodemailer.getTestMessageUrl(info)
      )
    );
};

exports.activate = async function (req, res, next) {
  const token = req.params.token;
  const doc = await User.findOne({ "status.dataset.token": token });
  if (doc.status.confirmed == true) {
    res.send("This account has already been confirmed.");
  }
  if (doc.status.confirmed == false) {
    doc.status.confirmed = true;
    doc.save().then(() => {
      console.log(doc);
      res.send(
        "Your account has been successfully activated. Now please log in again."
      );
    });
  }
};

exports.signin = function (req, res, next) {
  console.log("called")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "authorization");
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password",
    });
  }

  var id = "";
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      if (existingUser.status.confirmed == true) {
        res.send({
          token: tokenForUser(req.user),
          id: existingUser.uniqueID,
          userName: existingUser.profile.userName
            ? existingUser.profile.userName
            : existingUser.email,
        });
      }
      if (existingUser.status.confirmed == false) {
        res.send("inactive");
      }
    }
  });
};
