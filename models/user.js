const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'please insert an email'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'please give a password for the account']
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
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return callback(err, null);
          newUser.password = hash;
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
