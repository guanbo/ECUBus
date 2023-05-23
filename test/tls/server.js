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
	key: fs.readFileSync('privkey.pem'),
	cert: fs.readFileSync('cert.pem'),
	rejectUnauthorized: true
};

// Creating and initializing server
const server = tls.createServer(options, function (socket) {

	// Print the data that we received
	socket.on('data', function (data) {
		console.log('\nReceived: %s ',
			data.toString().replace(/(\n)/gm, ""));
	});

	// Stopping the server
	// by using the close() method
	server.close(() => {
		console.log("Server closed successfully");
	});
});

// Start listening on a specific port and address
// by using listen() method
server.listen(PORT, HOST, function () {
	console.log("I'm listening at %s, on port %s", HOST, PORT);
});

// // Creating and initializing client
// const client = tls.connect(PORT, HOST, {
//     ca: options.cert,
//     checkServerIdentity: () => {return null;},
//   }, function () {
// 	// Getting list of cipher
// 	// by using tls.getCiphers() method
// 	const value = tls.getCiphers();

// 	client.write(" Cipher : " + value[12]);

// 	client.end(() => {
// 		console.log("Client closed successfully");
// 	});
// });
