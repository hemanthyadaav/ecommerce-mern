const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
// const crypto = require('node:crypto');
var CryptoJS = require("crypto-js");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    userInfo: {
      type: String,
      trim: true,
    },

    encry_password: {
      type: String,
      required: true,
    },

    salt: String,
    role: {
      type: Number,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    // console.log(this.getOriginalPassword(this.encry_password))
    return this.getOriginalPassword(this.encry_password) === plainPassword;
  },

  getOriginalPassword: function (encry_password) {
    var bytes = CryptoJS.AES.decrypt(encry_password, this.salt);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return CryptoJS.AES.encrypt(plainPassword, this.salt).toString();
    } catch (err) {
      return "Empty password cannot be stored!";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
