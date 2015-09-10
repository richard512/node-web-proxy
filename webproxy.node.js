/*
This is a web proxy in nodejs
HTTP proxy works, but not yet HTTPS

1) Get the required node modules
npm install http https request express

2) Generate HTTPS credentials
openssl genrsa -des3 -out server.key 2048
openssl rsa -in server.key -out server.key.insecure
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

3) Run it with sudo so you can listen on port 80 and 443
sudo node webproxy.node.js
*/

var fs = require('fs');
var http = require('http');
var https = require('https');
var request = require('request');

var privateKey  = fs.readFileSync('server.key.insecure', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use(function(req, res, next) {
  if (!req) return;
  var url = req.url;
  console.log('proxying '+url)
  req.pipe(request(url)).pipe(res);
  req.on('end', function() {
    console.log('finished');
  });
});

httpServer.listen(80);
httpsServer.listen(443);
