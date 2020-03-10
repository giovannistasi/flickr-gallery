'use strict';
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const session = require('koa-session');

const passport = require('passport')
  , FlickrStrategy = require('passport-flickr').Strategy;

passport.use(new FlickrStrategy({
  consumerKey: 'c2ab258da096d1f0f8fe6788b230ccbe',
  consumerSecret: 'c85e7e225d9bfefd',
  callbackURL: "http://127.0.0.1:3000/auth/flickr/callback"
},
  function (token, tokenSecret, profile, done) {
    User.findOrCreate({ flickrId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

require('dotenv').config()
const PORT = process.env.PORT || 8080

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes());

const server = app.listen(PORT, console.log(`Koa server listening on port ${PORT}`))

app.on('error', err => console.error(err));

module.exports = server;