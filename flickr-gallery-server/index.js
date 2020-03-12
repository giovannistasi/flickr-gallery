'use strict';
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const https = require('https');
const fs = require('fs')

const passport = require('./flickr')
const session = require('koa-session');


app.use(session(app))
app.use(passport.initialize())
// app.use(passport.session())
app.keys = ['super-secret-key'];

require('dotenv').config()
const PORT = process.env.PORT || 8080

app
  .use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  .use(logger())
  .use(bodyParser())
  .use(router.routes())

// const server = app.listen(PORT, console.log(`Koa server listening on port ${PORT}`))
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app.callback()).listen(8080, () => {
  console.log(`Koa server listening on port ${PORT}`)
});

app.on('error', err => console.error(err));

module.exports = server;