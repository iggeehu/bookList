const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  uniqueID: String,
  email: { type: String, unique: true, lowercase: true },
  status: { confirmed: Boolean, dataset: { uniqueID: String, token: String } },
  password: String,
  lists: [Schema.Types.Mixed],
  watchedLists: Array,
  profile: {
    profilePicture: [Schema.Types.Mixed],
    userName: String,
    age: Number,
    gender: String,
    followedBy: Array,
    following: Array,
    aboutMe: String,
  },
});

//On save hook, encrypt password
userSchema.pre("save", function (next) {
  const user = this;

  if (user.password.length <= 30) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        console.log(hash);
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  console.log(`this.password is ${this.password}`);
  console.log(`candidatePassword is ${candidatePassword}`);
  bcrypt.compare(candidatePassword, this.password, function (err, ismatch) {
    if (err) {
      return err;
    }
    console.log(ismatch);
    cb(err, ismatch);
  });
};

const ModelClass = mongoose.model("User", userSchema);

module.exports = ModelClass;
