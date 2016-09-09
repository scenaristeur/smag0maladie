/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/

function ListenerAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	this.FADE_TIME = 150; // ms
	this.TYPING_TIMER_LENGTH = 400; // ms
	this.COLORS = [
		'#e21400', '#91580f', '#f8a700', '#f78b00',
		'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
		'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	];
	
	// Initialize variables
	this.$window = $(window);
	this.$usernameInput = $('.usernameInput'); // Input for username
	this.$messages = $('.messages'); // Messages area
	this.$sujetInput = $('.sujetInput'); // Sujet input box
	this.$proprieteInput = $('.proprieteInput'); // propriete input box
	this.$objetInput = $('.objetInput'); // Objet input box
	
	this.$loginPage = $('.login.page'); // The login page
	this.$chatPage = $('.chat.page'); // The chatroom page
	
	// Prompt for setting a username
	this.username;
	this.connected = false;
	this.typing = false;
	this.lastTypingTime;
	this.$currentInput = this.$usernameInput.focus();
	this.addListeners();
	
}

// extend the eve.Agent prototype
ListenerAgent.prototype = Object.create(eve.Agent.prototype);
ListenerAgent.prototype.constructor = ListenerAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
ListenerAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use ListenerAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
ListenerAgent.prototype.receive = function(from, message) {
	var me = this;
    console.log(message);
	switch(message.action) {
		case "log":
		me.log(message.message);
        break;
		case "addParticipantsMessage":
		me.addParticipantsMessage(message.message);
        break;
		case "addChatMessage":
		me.addChatMessage(message.message);
        break;
		case "addChatTyping":
		me.addChatTyping(message.message);
        break;
		case "removeChatTyping":
		me.removeChatTyping(message.message);
        break;
		case "setAttribute":
		if (message.attribut="connected"){
			me.connected=message.valeur;
		}
        break;
		default:
        console.log("non traite : ");
		console.log(message);	
	}
};

ListenerAgent.prototype.addListeners=function(){
	var me = this;
	// Keyboard events
	
	me.$window.keydown(function (event) {
		
		// When the client hits ENTER on their keyboard
		if (event.which === 13) {
			if (me.username) {
				me.sendMessage();
				data = { action : "emit",
					channel : "stop typing",
					data : ""
				};
				me.send('socketAgent', data);
				me.typing = false;
				} else {
				me.setUsername();
			}
		}
	});
	
	me.$sujetInput.on('input', function() {
		me.updateTyping();
	});
	me.$proprieteInput.on('input', function() {
		me.updateTyping();
	});
	me.$objetInput.on('input', function() {
		me.updateTyping();
	});
	
	// Click events
	
	// Focus input when clicking anywhere on login page
	me.$loginPage.click(function () {
		me.$currentInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	me.$sujetInput.click(function () {
		me.$sujetInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	me.$proprieteInput.click(function () {
		me.$proprieteInput.focus();
	});
	
	// Focus input when clicking on the message input's border
	me.$objetInput.click(function () {
		me.$objetInput.focus();
	});
};

ListenerAgent.prototype.setUsername=function(){
	var me = this;
	me.username = me.cleanInput(me.$usernameInput.val().trim());
	
	// If the username is valid
	if (me.username) {
		me.$loginPage.fadeOut();
		me.$chatPage.show();
		me.$loginPage.off('click');
		me.$currentInput = me.$sujetInput.focus();
		
		// a deplacer par un send vers GuiAgent
		var canvas=document.getElementById("canvas");
		var canvasDiv=document.getElementById("canvasDiv");
		canvasDiv.appendChild(canvas);
		canvas.style.display = "block";
		// var saisieDiv2=document.getElementById("saisieDiv2");
		// var chatPage=document.getElementById("chatPage");
		// saisieDiv2.appendChild(chatPage);
		
		// Tell the server your username
		data = { action : "emit",
			channel : "add user",
			data : me.username
		};
		me.send('socketAgent', data);
	}
};


ListenerAgent.prototype.cleanInput = function(input){
return $('<div/>').text(input).text();
};

ListenerAgent.prototype.updateTyping = function (){
var me = this;
if (me.connected) {
if (!me.typing) {
me.typing = true;
data = { action : "emit",
channel : "typing"
};
me.send('socketAgent', data);
}
me.lastTypingTime = (new Date()).getTime();

setTimeout(function () {
var typingTimer = (new Date()).getTime();
var timeDiff = typingTimer - me.lastTypingTime;
if (timeDiff >= me.TYPING_TIMER_LENGTH && me.typing) {
data = { action : "emit",
channel : "stop typing"
};
me.send('socketAgent', data);
me.typing = false;
}
}, me.TYPING_TIMER_LENGTH);
}
};

ListenerAgent.prototype.sendMessage = function () {
var me = this;
if ( me.$sujetInput.val() == ''){
me.$sujetInput.val(me.$sujetInput.attr('placeholder'));
}

if ( me.$proprieteInput.val() == ''){
me.$proprieteInput.val(me.$proprieteInput.attr('placeholder'));
}
if ( me.$objetInput.val() == ''){
me.$objetInput.val(me.$objetInput.attr('placeholder'));
}

var message={};
// Prevent markup from being injected into the message
message.sujet = me.cleanInput(me.$sujetInput.val());
message.propriete = me.cleanInput(me.$proprieteInput.val());
message.objet = me.cleanInput(me.$objetInput.val());
// if there is a non-empty message and a socket connection
if (message && me.connected) {
me.$sujetInput.focus();
me.$sujetInput.attr("placeholder", me.$sujetInput.val());
me.$proprieteInput.attr("placeholder", me.$proprieteInput.val());
me.$objetInput.attr("placeholder", me.$objetInput.val());
me.$sujetInput.val('');
me.$proprieteInput.val('');
me.$objetInput.val('');
me.addChatMessage({
username : me.username,
message : message
});
// tell server to execute 'new message' and send along one parameter
//console.log("NEW MESSAGE");
data2send = { action : "emit",
channel : "new message",
data : message
};
me.send('socketAgent', data2send);
}
};


ListenerAgent.prototype.addParticipantsMessage = function(data){
var me = this;
var message = '';
if (data.numUsers === 1) {
message += "there's 1 participant";
} else {
message += "there are " + data.numUsers + " participants";
}
me.log(message);


};

// Log a message
ListenerAgent.prototype.log = function(message, options) {
var me = this;

var $el = $('<li>').addClass('log').text(message);
me.addMessageElement($el, options);
};

// Adds the visual chat message to the message list
ListenerAgent.prototype.addChatMessage = function (data, options) {
var me = this;
// Don't fade the message in if there is an 'X was typing'
var $typingMessages = me.getTypingMessages(data);
options = options || {};
if ($typingMessages.length !== 0) {
options.fade = false;
$typingMessages.remove();
}

var sujet = data.message.sujet;
var propriete = data.message.propriete;
var objet = data.message.objet;
var triplet = sujet+" "+propriete+" "+objet;
// console.log(triplet);
if(sujet != 'is typing'){
/*creer agent Statement
var newStatement = new Statement(sujet, propriete, objet);
newStatement.add2Statements();
*/
var statement={
sujet:sujet,
propriete:propriete,
objet:objet
};
var statementGraphe = new StatementAgent(statement);
statementGraphe.send('agent1', 'Hello AGENT1');
} 

var $usernameDiv = $('<span class="username"/>')
.text(data.username)
.css('color', me.getUsernameColor(data.username));
var $messageBodyDiv = $('<span class="messageBody">')
.text(triplet.toString());

var typingClass = data.typing ? 'typing' : '';
var $messageDiv = $('<li class="message"/>')
.data('username', data.username)
.addClass(typingClass)
.append($usernameDiv, $messageBodyDiv);

me.addMessageElement($messageDiv, options);
};

// Adds the visual chat typing message
ListenerAgent.prototype.addChatTyping = function(data) {
var me = this;
data.typing = true;
data.message = {};
data.message.sujet = 'is typing';
data.message.propriete = '';
data.message.objet = '';
me.addChatMessage(data);
};

// Removes the visual chat typing message
ListenerAgent.prototype.removeChatTyping = function(data) {
var me = this;
me.getTypingMessages(data).fadeOut(function () {
$(this).remove();
});
};

// Adds a message element to the messages and scrolls to the bottom
// el - The element to add as a message
// options.fade - If the element should fade-in (default = true)
// options.prepend - If the element should prepend
//   all other messages (default = false)
ListenerAgent.prototype.addMessageElement = function (el, options) {
var me = this;
var $el = $(el);

// Setup default options
if (!options) {
options = {};
options.prepend = "true";
}
if (typeof options.fade === 'undefined') {
options.fade = true;
}
if (typeof options.prepend === 'undefined') {
options.prepend = true;
}

// Apply options
if (options.fade) {
$el.hide().fadeIn(me.FADE_TIME);
}
if (options.prepend) {
me.$messages.prepend($el);
me.$messages[0].scrollTop = 0;
} else {
me.$messages.append($el);
me.$messages[0].scrollTop = me.$messages[0].scrollHeight;
}
};


// Gets the 'X is typing' messages of a user
ListenerAgent.prototype.getTypingMessages = function (data) {
return $('.typing.message').filter(function (i) {
return $(this).data('username') === data.username;
});
};

// Gets the color of a username through our hash function
ListenerAgent.prototype.getUsernameColor = function (username) {
var me = this;
// Compute hash code
var hash = 7;
for (var i = 0; i < username.length; i++) {
hash = username.charCodeAt(i) + (hash << 5) - hash;
}
// Calculate color
var index = Math.abs(hash % me.COLORS.length);
return me.COLORS[index];
}	;

