const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { User, Actions } = require('./models/user');
const { JWT_KEY } = require('./configuration');

// = = = = Definign the strategie = = = =

// the jwt strategy
passport.use(
  'jwt-strat',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY,
      issuer: 'marcov Inc'
    },
    async (jwt_payload, done) => {
      //====The verification function of the stragtegy====
      // The payload is the object inside sign() method
      // done(error, result)
      User.findById(jwt_payload.sub, (err, user) => {
        if (err)
          return done(err, false, {
            msg: 'Something went wrong while verifying auth!'
          });
        return user ? done(null, user) : done(null, false);
      });
    }
  )
);

// the local strategy
passport.use(
  'local-strat',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err)
          return done(err, false, {
            msg: 'Something went wrong while verifying auth!'
          });
        if (!user) return done(null, false);
        else
          Actions.comparePasswords(password, user.password, (err, isMatch) => {
            return isMatch ? done(null, user) : done(err, false); //err = error|null
          });
      });
    }
  )
);
