const express = require('express');
const path = require('path');
//var secure = require('express-force-https')
const port = process.env.PORT || 3001;
const app = express();

// serve static assets normally
//app.use(secure);
app.use(express.static(__dirname + '/dist'));
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port);
console.log("Compropertee Dashboard Started on port " + port);
