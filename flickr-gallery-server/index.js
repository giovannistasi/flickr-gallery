'use strict';
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const http = require('http');
const https = require('https');

const passport = require('./authentication')
const session = require('koa-session');


<<<<<<< HEAD
app.use(passport.initialize())
app.use(session(app))
app.keys = ['super-secret-key'];
=======
passport.use(new FlickrStrategy({
  consumerKey: process.env.FLICKR_KEY,
  consumerSecret: 'c85e7e225d9bfefd',
  callbackURL: "http://127.0.0.1:3000/auth/flickr/callback"
},
  function (token, tokenSecret, profile, done) {
    User.findOrCreate({ flickrId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
>>>>>>> a08f769ab2b1eeb9b506d5a3abc5bb5d92a2d21f

require('dotenv').config()
const PORT = process.env.PORT || 8080

app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes())

const server = app.listen(PORT, console.log(`Koa server listening on port ${PORT}`))
// const server = https.createServer(app.callback()).listen(8080, () => console.log(`Koa server listening on port ${PORT}`))
app.on('error', err => console.error(err));

module.exports = server;