'use strict';
const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

router.get('/pictures', controller.getPictures);

router.get('/categories', controller.getPicturesFromTag)

module.exports = router;
