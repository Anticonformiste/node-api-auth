const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const FacebookTokensStrategy = require('passport-facebook-token');

const { User, Actions } = require('./models/user');
const config = require('./configuration');

// = = = = Definign the strategie = = = =

// the jwt strategy (to verify the JWT before accessing any protected resource)
passport.use(
  'jwt-strat',
  new JwtStrategy(
    {
      // all the fields here, are to verify, so they must match those of sign(), in the User's controller
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_KEY,
      issuer: 'ac97 Inc'
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

// the local strategy (the local login)
passport.use(
  'local-strat',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err)
          return done(err, false, {
            msg: 'Something went wrong while verifying auth!'
          });
        if (!user) return done(null, false);
        else
          Actions.comparePasswords(
            password,
            user.local.password,
            (err, isMatch) => {
              return isMatch ? done(null, user) : done(err, false); //err = error|null
            }
          );
      });
    }
  )
);

// FacebookToken Strategy(for FB register&Auth)
passport.use(
  'fb-token',
  new FacebookTokensStrategy(
    {
      clientID: config.oAuth.facebook.clientID,
      clientSecret: config.oAuth.facebook.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        User.findOne({ 'facebook.id': profile.id }, (err, already) => {
          if (err)
            return done(err, false, {
              msg: 'Something went wrong on FB oAuth!'
            });

          if (already) return done(null, already);

          // Create a new user account in our DB of production
          const newUser = new User({
            method: 'facebook',
            facebook: {
              id: profile.id,
              tokens: {
                access: accessToken,
                refresh: refreshToken
              },
              email: profile.emails[0].value,
              fullName: profile.displayName
            }
          });
          newUser.save();
          return done(null, newUser);
        });
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
