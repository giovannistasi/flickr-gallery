require('dotenv').config()
const axios = require('axios');

const apiKey = process.env.FLICKR_KEY;
let pageNum = 0;

module.exports.getPictures = async (ctx) => {
  let tagsList = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.tags.getHotList&api_key=${apiKey}&count=10&period=week&format=json&nojsoncallback=1`)
  console.log(tagsList.data.hottags.tag);

  //  Recursively fetch to avoid flickr server errors
  let response;
  const recursiveGet = async () => {
    let pictureList = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=30&format=json&nojsoncallback=1`)
    response = pictureList.data.photos.photo
    if (!response) recursiveGet()
  }
  await recursiveGet()


  const pictureList = response

  const pictures = await Promise.all(pictureList.map(async p => {
    const photo = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${p.id}&format=json&nojsoncallback=1`)
    const ownerInfo = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.profile.getProfile&api_key=${apiKey}&user_id=${p.owner}&format=json&nojsoncallback=1`)

    return {
      ...photo.data,
      ownerInfo: ownerInfo.data,
      ...p
    }
  }))
  ctx.body = pictures
}

module.exports.getPicturesFromTag = async (ctx) => {

  pageNum++;
  //  Recursively fetch to avoid flickr server errors
  let response;
  const recursiveGet = async () => {
    let pictureList = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&sort=interestingness-desc&per_page=30&page=${pageNum}&format=json&nojsoncallback=1`)
    response = pictureList.data.photos.photo
    if (!response) recursiveGet()
  }
  await recursiveGet()

  const pictureList = response

  const pictures = await Promise.all(pictureList.map(async p => {
    const photo = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${p.id}&format=json&nojsoncallback=1`)
    const ownerInfo = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.profile.getProfile&api_key=${apiKey}&user_id=${p.owner}&format=json&nojsoncallback=1`)

    return {
      ...photo.data,
      ownerInfo: ownerInfo.data,
      ...p
    }
  }))
  ctx.body = pictures
}

module.exports.getTagsList = async (ctx) => {
  let tagsList = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.tags.getHotList&api_key=${apiKey}&count=10&period=week&format=json&nojsoncallback=1`);
  console.log(tagsList);

  ctx.body = tagsList.data.hottags.tag;
}