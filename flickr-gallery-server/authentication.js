const passport = require('koa-passport')
  , FlickrStrategy = require('passport-flickr').Strategy;


passport.use(new FlickrStrategy({
  consumerKey: process.env.FLICKR_KEY,
  consumerSecret: process.env.FLICKR_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/flickr/callback",
},
  function (token, tokenSecret, profile, done) {
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