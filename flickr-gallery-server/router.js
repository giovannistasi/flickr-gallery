'use strict';
const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');
const passport  = require('passport');

router.get('/pictures', controller.getPictures);

router.get('/categories', controller.getPicturesFromTag);

router.get('/tags', controller.getTagsList);

router.get('/pictures-from-tags/:tag/:pageNum', controller.getPicturesFromTag);

router.get('/pictures-from-search/:search/:pageNum', controller.getPicturesFromSearch);

router.get('/auth/flickr',
  passport.authenticate('flickr'),
  function(req, res){
    // The request will be redirected to Flickr for authentication, so this
    // function will not be called.
  });

router.get('/auth/flickr/callback', 
  passport.authenticate('flickr', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.post('/favorites', passport.authenticate('flickr'), function () {console.log(passport); return controller.addFavorite});

module.exports = router;
