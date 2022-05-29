const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const e = require("express");

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
      },
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      hash_password: {
        type: String,
        required: true,
        min: 4,
      },
      role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
      },
      authorized: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      contactNumber: { type: String },

      pofilePicture: { type: String },
    }
  );

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

userSchema.methods = {
    authenticate: function (password) {
        if (password === this.hash_password)
        {
            return 'true';
        }
        else
        return 'false';
      //return bcrypt.compareSync(password, this.hash_password);
    },
};

module.exports = mongoose.model("User", userSchema);