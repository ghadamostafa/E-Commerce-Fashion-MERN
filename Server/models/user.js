const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "Please fill a valid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(uniqueValidator);

// encrypt password before saving user
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

//hide password when returning user object
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

//generate access token
userSchema.methods.generateAccessToken = async function (response) {
  const user = this;
  const token = await jwt.sign(
    { user: user._id },
    process.env.ACCSESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_DATE,
    }
  );
  response.cookie("token", token, {
    expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRATION_DATE),
    secure: false,
    httpOnly: true,
  });
  return token;
};

//find user
userSchema.statics.findByCredentials = async function (
  email,
  password,
  response
) {
  const user = await User.findOne({ email });
  if (!user) {
    response.statusCode = 404;
    throw new Error("Unable to login ,password or email is invalid");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    response.statusCode = 404;
    throw new Error("Unable to login ,password or email is invalid");
  }
  return user;
};

module.exports = User = mongoose.model("user", userSchema);
