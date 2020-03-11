const passport = require('koa-passport')
  , FlickrStrategy = require('passport-flickr').Strategy;




passport.serializeUser((user, done) => {
  console.log(user, '------------------');

  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

let user;

passport.use(new FlickrStrategy({
  consumerKey: process.env.FLICKR_KEY,
  consumerSecret: process.env.FLICKR_SECRET,
  callbackURL: "https://localhost:8080/auth/flickr/callback",
},
  function (token, tokenSecret, profile, done) {
    user = { profile, token, tokenSecret }
    // console.log(user);

    return done(null, profile)
    console.log(profile);
    console.log(token);
    console.log(tokenSecret);
    done()
    // User.findOrCreate({ flickrId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

module.exports = passport