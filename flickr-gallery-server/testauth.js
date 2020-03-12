// // const cgi = require('cgi');
// // const base64 = require('base64');
// // const openssl = require('openssl');

// // const id = '49648343923'
// // const oauth_consumer_key = 'c2ab258da096d1f0f8fe6788b230ccbe'
// const oauth_nonce = Math.ceil(Math.random() * 10000000)
// // const oauth_signature_method = 'HMAC-SHA1'
// // const oauth_timestamp = Date.now()
// // const oauth_version = '1.0'


// // const parameters = 'oauth_consumer_key=' +
// //   oauth_consumer_key +
// //   '&oauth_nonce=' +
// //   oauth_nonce +
// //   '&oauth_signature_method=' +
// //   oauth_signature_method +
// //   '&oauth_timestamp=' +
// //   oauth_timestamp +
// //   '&oauth_version=' +
// //   oauth_version

// // const base_string = 'GET&' + cgi(url) + '&' + cgi(parameters)

// // const secret_key = 'c85e7e225d9bfefd'

// // const oauth_signature = cgi(Buffer.from("#{OpenSSL::HMAC.digest('sha1',secret_key, base_string)}").toString('base64'))

// // const testable_url = url + '?' + parameters + '&oauth_signature=' + oauth_signature

// // console.log(testable_url);

// // const url = 'https://api.flickr.com/services/rest/?method=flickr.favorites.add'

// base_string = 'POST&https%3A%2F%2Fapi.flickr.com%2services%2rest&oauth_consumer_key%3Dc2ab258da096d1f0f8fe6788b230ccbe%26oauth_nonce%3D524568%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D123456789%26+oauth_token%3D72157713438077933-42f1e38ce3b345ad'


// const signingkey = 'c85e7e225d9bfefd&e75bb959f6f5ccc0'

// console.log(oauth_nonce);

const crypto = require('crypto');

const tessturl = 'http%3A%2F%2Fwww.flickr.com%2Fservices%2Foauth%2Frequest_token'
const testparams = encodeURIComponent('oauth_callback=http%3A%2F%2Fwww.wackylabs.net%2Foauth%2Ftest&oauth_consumer_key=768fe946d252b119746fda82e1599980&oauth_nonce=C2F26CD5C075BA9050AD8EE90644CF29&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1316657628&oauth_version=1.0')

const baseurl = 'http://www.flickr.com/services/oauth/request_token?'
const params = 'oauth_callback=https%3A%2F%2Flocalhost%3A8080%2Fauth%2Fflickr%2Fcallback&oauth_consumer_key=c2ab258da096d1f0f8fe6788b230ccbe&oauth_nonce=89601180&oauth_timestamp=1305583871&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&oauth_signature=ObG63izEySgNfH1Nlv8x%2BfHMsas%3D'

const secret = 'c85e7e225d9bfefd&'

'e75bb959f6f5ccc0'

const first = 'POST&'
const second = 'https%3A%2F%2Fwww.flickr.com%2Fservices%2Foauth%2Frequest_token&'
const third = 'oauth_callback%3Dhttps%253A%252F%252Flocalhost%253A3000%26oauth_consumer_key%3Dc2ab258da096d1f0f8fe6788b230ccbe%26oauth_nonce%3D89601180%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1305583871%26oauth_version%3D1.0';

const foo = 'oauth_callback%3Dhttp%253A%252F%252Fwww.wackylabs.net%252Foauth%252Ftest%26oauth_consumer_key%3D768fe946d252b119746fda82e1599980%26oauth_nonce%3DC2F26CD5C075BA9050AD8EE90644CF29%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1316657628%26oauth_version%3D1.0'
const payload = first + second + third
const payloadtest = first + second + testparams

console.log(payload);
console.log('<-------------------------------------->');


const accessToken = crypto.createHmac('sha1', secret).update(payload).digest('hex')


console.log(accessToken);

// const x = encodeURIComponent('https://www.flickr.com/services/rest?nojsoncallback=1 ')
// const y = encodeURIComponent('https://www.flickr.com/services/oauth/request_token?')
// const z = encodeURIComponent(payload)

// const signature = 'g1C1QjA+uPIbim3+I/LpYeNvIM4='
// const sigencoded = encodeURIComponent(signature)
// console.log(sigencoded);
// console.log(Date.now());


// console.log('------------');


// console.log(encodeURIComponent('http://www.flickr.com/services/oauth/request_token?oauth_callback=https%3A%2F%2Flocalhost%3A3000&oauth_consumer_key=c2ab258da096d1f0f8fe6788b230ccbe&oauth_nonce=89601180&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1584006480462&oauth_version=1.0'))





