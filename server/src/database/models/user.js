const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  isAdmin: { type: Boolean, default: false, require: false },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      const passwordRegEx = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,50})/;
      if (!passwordRegEx.test(value))
        throw new Error(
          'Password must be at least 8 characters long, should contain uppercase, lowercase, numbers and special characters'
        );
    },
  },
});


userSchema.pre()

const User = mongoose.model('User', userSchema);

module.exports = User;
