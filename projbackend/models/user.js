const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const crypto = require('node:crypto');
const { Schema } = mongoose;


const userSchema = new Schema({
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
  
}, {timestamps: true});

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
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto.createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "Empty password cannot be stored!";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
