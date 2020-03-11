'use strict';
const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');
const flickrPassport = require('./authentication');
const googlePassport = require('./auth/google');



router.get('/pictures', controller.getPictures);

router.get('/categories', controller.getPicturesFromTag);

router.get('/tags', controller.getTagsList);

router.get('/pictures-from-tags/:tag/:pageNum', controller.getPicturesFromTag);

router.get('/pictures-from-search/:search/:pageNum', controller.getPicturesFromSearch);

// router.get('/login', () => {
//   passport.authenticate('local', {
//     successRedirect: '/app',
//     failureRedirect: '/death'
//   })
// }
// )

router.get('/app', async (ctx) => {
  console.log('here');
  if (ctx.isAuthenticated()) {
    console.log('Yuhuu! 🙌');
    ctx.body = 'LOGGED IN';
  } else {
    console.log('Nooope! 😠');
    ctx.body = { success: false };
    ctx.throw(401);
  }
})

router.get('/auth/google',
  googlePassport.authenticate('google', { scope: ['email profile'] })
);

router.post('/auth/google/callback',
  googlePassport.authenticate('google', { failureRedirect: '/fail' }),
  function (ctx) {
    ctx.redirect('localhost:3000');
  });

router.get('/auth/flickr',
  flickrPassport.authenticate('flickr'),
  // function (req, res) {
  //   // The request will be redirected to Flickr for authentication, so this
  //   // function will not be called.
  // }
);

router.get('/auth/flickr/callback',
  flickrPassport.authenticate('flickr', { failureRedirect: '/login' },
    function (ctx) {
      console.log("CTX", ctx)
      ctx.redirect('/')

    })

);

router.post('/favorites/:add', flickrPassport.authenticate('flickr'), function () {
  console.log(passport)
  return controller.addFavorite
});

module.exports = router;
