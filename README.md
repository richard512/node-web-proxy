# node-web-proxy

<b>HTTP proxy works, but not yet HTTPS</b>

<h3>1) Get the required node modules</h3>
npm install http https request express

<h3>2) Generate HTTPS credentials</h3>
openssl genrsa -des3 -out server.key 2048<br>
openssl rsa -in server.key -out server.key.insecure<br>
openssl req -new -key server.key -out server.csr<br>
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

<h3>3) sudo for port 80 and 443 listening permission</h3>
sudo node webproxy.node.js
