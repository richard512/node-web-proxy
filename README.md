# node-web-proxy

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
