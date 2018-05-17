// const { URL } = require('url'); 
// const myURL = new URL('https://example.org/foo#bar'); 
// console.log(myURL.hash); 
// // Prints #bar myURL.hash = 'baz'; console.log(myURL.href);

const { URL } = require("url")
const myURL =  new URL('https://example.org/foo#bar');
console.log(myURL.hash);
