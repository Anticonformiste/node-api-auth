const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create the User schema
const userSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      unique: true,
      // required: [true, 'please insert an email'],
      trim: true,
      lowercase: true
    },
    password: {
      type: String
      // required: [true, 'please give a password for the account']
    }
  },
  facebook: {
    id: {
      type: String
    },
    tokens: {
      access: { type: String },
      refresh: { type: String }
    },
    email: {
      type: String,
      lowercase: true
    },
    fullName: {
      type: String
    }
  }
});
//Compile model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  Actions: {
    // the CRUD + Business Logic
    createUser: (newUser, callback) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.local.password, salt, (err, hash) => {
          if (err) return callback(err, null);
          newUser.local.password = hash;
          User.create(newUser, callback);
        });
      });
    },
    comparePasswords: (plainInput, hash, callback) => {
      bcrypt.compare(plainInput, hash, (err, isMatch) => {
        if (err) return callback(err, false);
        callback(null, isMatch);
      });
    }
  }
};
