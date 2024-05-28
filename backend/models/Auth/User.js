const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    mobile: {
      type: String,
      required: [true, 'Please provide mobile'],
      minlength: 10,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['parent', 'student'],
    },
    terms_Conditions: {
      type: Boolean,
    },
    profilePic: {type: String},
    followers: {type: Number},
  },
  {timestamps: true},
);
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
