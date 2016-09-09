/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/
function SocketAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
	this.socket= io.connect();
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	this.initSocket();
}

// extend the eve.Agent prototype
SocketAgent.prototype = Object.create(eve.Agent.prototype);
SocketAgent.prototype.constructor = SocketAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
SocketAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use SocketAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
SocketAgent.prototype.receive = function(from, message) {
	//	console.log(message);
	switch(message.action) {
		case "emit" :
		this.socket.emit(message.channel,message.data);
        break;
		default :
        console.log("non traite par "+this);
		console.log(message);
	}
};

SocketAgent.prototype.getSocket = function(){
	return this.socket;
};

SocketAgent.prototype.initSocket = function(){
	var me = this;
	switchRoom = function(room){
		me.socket.emit('switchRoom', room);
	}
	
	// listener, whenever the server emits 'updatechat', this updates the chat body
	me.socket.on('updatechat', function (username, data) {
		console.log("update chat");
		data2send = { action : "log",
			message : username + ' : '+data,
		};
		me.send('listenerAgent', data2send);
	});
	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	me.socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
		// a revoir pour afficher en gras la room courante, u la mettre en tete de liste
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});
	
	// Whenever the server emits 'login', log the login message
	me.socket.on('login', function (data) {
		data2send = { action : "setAttribute",
			attribut : "connected",
			valeur : true
		};
		me.send('listenerAgent', data2send);
		var triplets = data.triplets;
		// Display the welcome message
		var message = "Welcome to DreamCatcher (Smag0) Socket.IO Chat";
		data2send = { action : "log",
			message : message,
			prepend : true
		};
		me.send('listenerAgent', data2send);
		data2send = { action : "addParticipantsMessage",
			message : data
		};
		me.send('listenerAgent', data2send);
		
		for (triplet of triplets){
			/* creer agent statement
				var newStatement = new Statement(triplet.sujet, triplet.propriete, triplet.objet); 
				newStatement.add2Statements();
			*/
			//	console.log(triplet);
			var statement={
				sujet:triplet.sujet,
				propriete:triplet.propriete,
				objet:triplet.objet
			};
			var statementGraphe = new StatementAgent(statement);
			statementGraphe.send('agent1', 'Hello AGENT1');
		}
		agentListener.$sujetInput.attr("placeholder", agentListener.username);
		agentListener.$proprieteInput.attr("placeholder", "type");
		agentListener.$objetInput.attr("placeholder", "Joueur");
	});
	
	// Whenever the server emits 'new message', update the chat body
	me.socket.on('new message', function (data) {
		console.log("retour new message");
		console.log(data);
		var options = {};
	options.prepend = true;
	data2send = { action : "addChatMessage",
	message : data
	};
	me.send('listenerAgent', data2send);
	});
	
	// Whenever the server emits 'user joined', log it in the chat body
	me.socket.on('user joined', function (data) {
	data2send = { action : "log",
	message : data.username + ' joined'
	};
	me.send('listenerAgent', data2send);
	data2send = { action : "addParticipantsMessage",
	message : data
	};
	me.send('listenerAgent', data2send);
	/* creer agent statement 
	var newStatement = new Statement(data.username, "type", "Joueur"); 
	newStatement.add2Statements();*/
	});
	
	// Whenever the server emits 'user left', log it in the chat body
	me.socket.on('user left', function (data) {
	data2send = { action : "log",
	message : data.username + ' left'
	};
	me.send('listenerAgent', data2send);
	data2send = { action : "addParticipantsMessage",
	message : data
	};
	me.send('listenerAgent', data2send);
	data2send = { action : "removeChatTyping",
	message : data
	};
	me.send('listenerAgent', data2send);
	});
	
	// Whenever the server emits 'typing', show the typing message
	me.socket.on('typing', function (data) {
	data2send = { action : "addChatTyping",
	message : data
	};
	me.send('listenerAgent', data2send);
	});
	
	// Whenever the server emits 'stop typing', kill the typing message
	me.socket.on('stop typing', function (data) {
	data2send = { action : "removeChatTyping",
	message : data
	};
	me.send('listenerAgent', data2send);
	});
	
	};
		