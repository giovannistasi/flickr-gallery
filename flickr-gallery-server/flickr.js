const passport = require('koa-passport')
  , FlickrStrategy = require('passport-flickr').Strategy;

passport.serializeUser((user, done) => {
  console.log(user, "serialize");

  done(null, user)
})
passport.deserializeUser((obj, done) => {
  console.log(obj, "desserialize");
  done(null, obj)
})

passport.use(new FlickrStrategy({
  consumerKey: process.env.FLICKR_KEY,
  consumerSecret: process.env.FLICKR_SECRET,
  callbackURL: "https://localhost:8080/auth/flickr/callback",
},
  function (token, tokenSecret, profile, done) {
    let user = { profile, token, tokenSecret }

    return done(null, user)
    // User.findOrCreate({ flickrId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));


module.exports = passport