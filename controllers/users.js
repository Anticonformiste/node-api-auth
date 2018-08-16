const JWT = require('jsonwebtoken');

const { User, Actions } = require('../models/user');
const { JWT_KEY } = require('../configuration');

// the token generattor function
signToken = user => {
  return JWT.sign(
    {
      iss: 'ac97 Inc',
      sub: user._id,
      iat: new Date().getTime()
    },
    JWT_KEY
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    // get email & password
    const { email, password } = req.value.body;
    const newUser = new User({ email, password });
    await Actions.createUser(newUser, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: `Failed to create new user: ${err.message}` });
      }
      // Genereate a token.
      const token = signToken(newUser);
      return res
        .status(200)
        .json({ msg: `user created: ${user.email}`, token });
    });
  },

  signIn: async (req, res, next) => {
    // generate a Token
    const token = signToken(req.user);

    return res
      .status(200)
      .json({ msg: `user "${req.user.email}" logged In !`, token });
  },

  getProfile: async (req, res, next) => {
    return res.status(200).json({ msg: 'Profile Getted' });
  }
};
