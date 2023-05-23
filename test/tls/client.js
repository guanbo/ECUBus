// Copyright 2023 AutoCore
// 
// This program and the accompanying materials are made available under the
// terms of the AutoCore License v. 1.0

// Node.js program to demonstrate the
// tls.getCiphers() method
const tls = require('tls'),
	fs = require('fs'),

	// Port and host address for server
	PORT = 13400,
	HOST = '127.0.0.1'

// Private key and public certificate for access
// openssl req -newkey rsa:2048 -keyout privkey.pem -x509 -nodes -out cert.pem
const options = {
	ca: fs.readFileSync('cert.pem'),
  checkServerIdentity: () => {return null;},
};

// Creating and initializing client
const client = tls.connect(PORT, HOST, options, function () {
	// Getting list of cipher
	// by using tls.getCiphers() method
	const value = tls.getCiphers();

	client.write(" Cipher : " + value[12]);

	client.end(() => {
		console.log("Client closed successfully");
	});
});
