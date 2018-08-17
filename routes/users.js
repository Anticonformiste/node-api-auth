// This router gives us a better exceptions handling
const router = require('express-promise-router')();
const { validateBody, schema } = require('../helpers/routerHelpers');

const passport = require('passport');
const passportConf = require('../passport');

const usersController = require('../controllers/users');

router
  .route('/signup')
  .post(validateBody(schema.authSchema), usersController.signUp);

router
  .route('/signin')
  .post(
    validateBody(schema.authSchema),
    passport.authenticate('local-strat', { session: false }),
    usersController.signIn
  );

router
  .route('/profile')
  .get(
    passport.authenticate('jwt-strat', { session: false }),
    usersController.getProfile
  );

router
  .route('/oauth/fb')
  .post(
    passport.authenticate('fb-token', { session: false }),
    usersController.facebookOauth
  );
module.exports = router;
