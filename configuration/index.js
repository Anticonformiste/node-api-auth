// Preferably set environment variables for those keys values
// then get them via: ex=> process.env.JWT_KEY, etc.
module.exports = {
  DB: {
    PATH: 'mongodb://localhost:27017/auth_node',
    name: 'auth-node'
  },
  JWT_KEY: 'our-private-key-s@lt',
  oAuth: {
    facebook: {
      clientID: 'YOUR-FB-APP-ID',
      clientSecret: 'YOUR-APP-SECRET-KEY'
    }
  }
};
