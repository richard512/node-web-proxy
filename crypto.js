function Crypto() {
	var fs = require('fs');
	var NodeRSA = require('node-rsa');
	var privateKey = new Buffer(fs.readFileSync('./ssl/privatekey.pem.base64', 'utf8'), 'base64').toString('utf8');
	var crypt = new NodeRSA(privateKey);

	return {
		encrypt: function(clearText) {
			return crypt.encrypt(clearText);
		},
		decrypt: function(cypherText) {
			return crypt.decrypt(cypherText, "json");
		}
	};
}
module.exports = CryptoService();
