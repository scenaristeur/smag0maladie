// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];
var numUsers = 0;
var triplets= [];
var roomTriplets=[];


io.sockets.on('connection', function (socket) {
	var addedUser = false;
	
	// when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		var triplet = {
			sujet : data.sujet,
			propriete : data.propriete,
			objet : data.objet
		};		
		var triplets = roomTriplets[socket.room];
		if (triplets === undefined){
			triplets = [];
		}
		triplets.push(triplet);
		roomTriplets[socket.room] = triplets;
		console.log(roomTriplets);
		
		socket.broadcast.to(socket.room).emit('new message', {
			username: socket.username,
			message: data
		});
	});
	
	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {	
		console.log("add user "+username);
		if (addedUser) return;
		
		// we store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = 'room1';
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
		++numUsers;
		addedUser = true;
		var triplet = {
			sujet : username,
			propriete : "type",
			objet : "Joueur"
		};
		var triplets = roomTriplets[socket.room];
		if (triplets === undefined){
			triplets = [];
		}
		triplets.push(triplet);
		roomTriplets[socket.room] = triplets;
		console.log(roomTriplets);
		socket.emit('login', {
			numUsers : numUsers,
			triplets : triplets
		});
		// echo globally (all clients) that a person has connected
		socket.broadcast.to(socket.room).emit('user joined', {
			username : socket.username,
			numUsers : numUsers,
			options : {"prepend":true}
		});
	});	
	
	
	//SUPPRIMER SENDCHAT ?
	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		console.log("receive " +data);
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});
	
	socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});
	
	// when the client emits 'typing', we broadcast it to others
	socket.on('typing', function () {
		message = {username: socket.username};
		socket.broadcast.to(socket.room).emit('typing', message);
	});
	
	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', function () {
		socket.broadcast.to(socket.room).emit('stop typing', {
			username : socket.username
		});
	});
	
	// when the user disconnects.. perform this
	socket.on('disconnect', function () {
		if (addedUser) {
			--numUsers;
			// echo globally that this client has left
			socket.broadcast.emit('user left', {
				username : socket.username,
				numUsers : numUsers
			});
		}
		
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});
