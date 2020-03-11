const passport = require('koa-passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let user

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/google/callback",
},

  function (token, tokenSecret, profile, done) {
    user = { profile, token, tokenSecret }
    return done(null, user)
    // User.findOrCreate({ flickrId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

passport.serializeUser((user, done) => {
  console.log(user, '------------------');

  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})


module.exports = passport