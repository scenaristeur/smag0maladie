  /**
   * Custom agent prototype
   * @param {String} id
   * @constructor
   * @extend eve.Agent
   */
  function SocketAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
   
    
  }

  // extend the eve.Agent prototype
  SocketAgent.prototype = Object.create(eve.Agent.prototype);
  SocketAgent.prototype.constructor = HelloAgent;

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
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');

    if (message.indexOf('Hello') === 0) {
      // reply to the greeting
      this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
  };
  
 //// Socket events
	
////	Whenever the server emits 'login', log the login message
	// socket.on('login', function (data) {
		// connected = true;
		// var triplets=data.triplets;
	////	console.log(triplets);
////		Display the welcome message
		// var message = "Welcome to DreamCatcher (Smag0) Socket.IO Chat – ";
		// log(message, {
			// prepend: true
		// });
		// addParticipantsMessage(data);
				// for (triplet of triplets){
			// var newStatement = new Statement(triplet.sujet, triplet.propriete, triplet.objet); 
			// newStatement.add2Statements();
		// }
		// $sujetInput.attr("placeholder", username);
		// $proprieteInput.attr("placeholder", "type");
		// $objetInput.attr("placeholder", "Joueur");
		
		
		
	// });
	
////	Whenever the server emits 'new message', update the chat body
	// socket.on('new message', function (data) {
					// var options={};
				// options.prepend=true;
		// addChatMessage(data);
	// });
	
////	Whenever the server emits 'user joined', log it in the chat body
	// socket.on('user joined', function (data) {
		// log(data.username + ' joined');
		// addParticipantsMessage(data);
				// var newStatement = new Statement(data.username, "type", "Joueur"); 
		// newStatement.add2Statements();
	// });
	
////	Whenever the server emits 'user left', log it in the chat body
	// socket.on('user left', function (data) {
		// log(data.username + ' left');
		// addParticipantsMessage(data);
		// removeChatTyping(data);
	// });
	
////	Whenever the server emits 'typing', show the typing message
	// socket.on('typing', function (data) {
		// addChatTyping(data);
	// });
	
////	Whenever the server emits 'stop typing', kill the typing message
	// socket.on('stop typing', function (data) {
		// removeChatTyping(data);
	// });
