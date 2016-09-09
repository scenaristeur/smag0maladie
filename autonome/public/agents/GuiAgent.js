/**
    * Custom agent prototype
    * @param {String} id
    * @constructor
    * @extend eve.Agent
*/


function GuiAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
    
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
    
    //prepare l'affichage
    this.makeUi();
    
    
    
    
}

// extend the eve.Agent prototype
GuiAgent.prototype = Object.create(eve.Agent.prototype);
GuiAgent.prototype.constructor = GuiAgent;

/**
    * Send a greeting to an agent
    * @param {String} to
*/
GuiAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
    * Handle incoming greetings. This overloads the default receive,
    * so we can't use GuiAgent.on(pattern, listener) anymore
    * @param {String} from     Id of the sender
    * @param {*} message       Received message, a JSON object (often a string)
*/
GuiAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
    
    if (message.indexOf('Hello') === 0) {
        // reply to the greeting
        this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
    
    if (message.indexOf('Salut') === 0) {
        // reply to the greeting
        this.send(from, 'Salut ' + from + ', nice to meet you!');
    }
    
};

GuiAgent.prototype.makeUi = function(){
    
    ////////////////////////////////////////////////
    //CHAT
    ////////////////////////////////////////////////
    var pages = document.createElement("UL");
    pages.className = "pages";
    document.body.appendChild(pages);
    
    //chatPage
    var chatPage = document.createElement("LI");
    chatPage.className = "chat page";
    pages.appendChild(chatPage);
    
    var chatArea = document.createElement("DIV");
    chatArea.className = "chatArea";
    chatPage.appendChild(chatArea);
    
    var messages = document.createElement("UL");
    messages.className = "messages";
    chatArea.appendChild(messages);
    
    //LoginPage
    var loginPage =  document.createElement("LI");
    loginPage.className = "login page";
    pages.appendChild(loginPage);
    
    var form = document.createElement("DIV");
    form.className = "form";
    loginPage.appendChild(form);
    
    var title = document.createElement("H3");
    title.className = "title";
    title.innerHTML = "YOU are an expert </br>What's your nickname ?";
    form.appendChild(title);
    
    var usernameInput = document.createElement("INPUT");
    usernameInput.className = "usernameInput";
    usernameInput.type = "text";
    usernameInput.setAttribute("maxlength","14");
    form.appendChild(usernameInput);
    
    
    
    
    ////////////////////////////////////////////////    
    //FORMULAIRE SAISIE TRIPLET
    ////////////////////////////////////////////////
    
    var sujetInput = document.createElement("INPUT");
    sujetInput.className = "sujetInput";
    sujetInput.placeholder="Sujet here...";
    chatArea.appendChild(sujetInput);
    
    var proprieteInput = document.createElement("INPUT");
    proprieteInput.className = "proprieteInput";
    proprieteInput.placeholder="propriete here...";
    chatArea.appendChild(proprieteInput);
    
    var objetInput = document.createElement("INPUT");
    objetInput.className = "objetInput";
    objetInput.placeholder="Sujet here...";
    chatArea.appendChild(objetInput);
    
    
    //        <span class="context-menu-one btn btn-neutral">left click me</span>
	var docuLink = document.createElement("A");
	 docuLink.setAttribute('href', "https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/README.md");
	docuLink.innerHTML="Documentation";
	chatArea.appendChild(docuLink);
	
/*    var menuSpan = document.createElement("SPAN");
    menuSpan.innerHTML="menu";
    menuSpan.className="context-menu-one btn btn-neutral";
        chatArea.appendChild(menuSpan);*/
    
    
    ////////////////////////////////////////////////    
    //OUTILS IMPORTS
    ////////////////////////////////////////////////
    // <div>
    // <a href="https://github.com/scenaristeur/collaborativeRdf" target="_blank">dreamcatcher</a>
    // <div id="nbAtt" ></div>
    // Importer un fichier owl (<a href="importRDF/appliSmag0rdf.owl" target='_blank'>appliSmag0rdf.owl</a>) (ou ttl) 
    // <div id="newSourceFiles"></div>
    // </br>
    // <a href="importRDF/js-xlsx/index.html" target='newXls'> Importer un fichier XLS </a>
    // <div id="newXls"></div>
    // </div>
    
    
    
    ////////////////////////////////////////////////    
    //SKETCH P5JS
    ////////////////////////////////////////////////
    
    var myContainer = document.createElement("DIV");
    myContainer.setAttribute("id","myContainer");
    myContainer.style.position="relative";
    myContainer.style.zIndex="-1";
    myContainer.style.top="0px";
    myContainer.style.left="0px";
    document.body.appendChild(myContainer);
    
    /*
    var defaultCanvas0 = document.createElement("CANVAS");
    defaultCanvas0.setAttribute("id","defaultCanvas0");
    document.body.appendChild(defaultCanvas0);*/
    
    var textCanvas = document.createElement("CANVAS");
    textCanvas.setAttribute("id","textCanvas");
    textCanvas.style.height=40;
    textCanvas.style.left=-1000;
    textCanvas.style.top=-1000;
    document.body.appendChild(textCanvas);
    
    
    var importDiv = document.createElement("DIV");
    importDiv.setAttribute("id","newSourceFiles");
    document.body.appendChild(importDiv); 
    
    var loadSourceInput=document.createElement("INPUT");
    loadSourceInput.setAttribute('id', 'file');
    loadSourceInput.setAttribute('type', 'file');
    loadSourceInput.multiple=true;
    document.getElementById("newSourceFiles").appendChild(loadSourceInput);
    var reader = new FileReader();
    var fichierAgent = new FichierAgent('fichierAgent');
    
    loadSourceInput.addEventListener('change', function() {
        var listeFichiers=this.files;
        console.log(this.files);
        
        for (i=0; i<listeFichiers.length; i++) {
            var fichier=listeFichiers[i];
            
            //  var fichierAgent = new FichierAgent('fichierAgent'+i);
            //   console.log(fichier);
            fichierAgent.setFile(fichier);
            //     fichierAgent.send('contexte1', "Hello contexte1, peux-tu rajouter le fichier ' "+fichier.name+" ' dans l'interface pour suivre son traitement");
        }
    }
    );
    
    
    
    // Initialize variables
    var FADE_TIME = 150; // ms
	var TYPING_TIMER_LENGTH = 400; // ms
	var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	];    
    
	var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
	var $messages = $('.messages'); // Messages area
	// var $inputMessage = $('.inputMessage'); // Input message input box
	var $sujetInput = $('.sujetInput'); // Sujet input box
	var $proprieteInput = $('.proprieteInput'); // propriete input box
	var $objetInput = $('.objetInput'); // Objet input box
	
	var $loginPage = $('.login.page'); // The login page
	var $chatPage = $('.chat.page'); // The chatroom page
	
	// Prompt for setting a username
	var username;
	var connected = false;
	var typing = false;
	var lastTypingTime;
	var $currentInput = $usernameInput.focus();
    
    
    
    function setUsername() {
		username = cleanInput($usernameInput.val().trim());
		
		// If the username is valid
		if (username) {
			$loginPage.fadeOut();
			$chatPage.show();
			$loginPage.off('click');
			//$currentInput = $inputMessage.focus();
			$currentInput = $sujetInput.focus();
			
			// Tell the server your username
            console.log(username);
            if (typeof socket != "undefined"){
                socket.emit('add user', username);
                }else{
                //test sans socket
                var newStatement = new Statement(username, "type", "Joueur"); 
                newStatement.add2Statements();
                $sujetInput.attr("placeholder", username);
                $proprieteInput.attr("placeholder", "type");
                $objetInput.attr("placeholder", "Joueur");
            }
        }
    }
    
    function addParticipantsMessage (data) {
		var message = '';
		if (data.numUsers === 1) {
			message += "there's 1 participant";
			} else {
			message += "there are " + data.numUsers + " participants";
        }
		log(message);
    }
	
    
	
	// Sends a chat message
	function sendMessage () {
		
		if ( $sujetInput.val() == ''){
			$sujetInput.val($sujetInput.attr('placeholder'));
        }
		
	    if ( $proprieteInput.val() == ''){
			$proprieteInput.val($proprieteInput.attr('placeholder'));
        }
		if ( $objetInput.val() == ''){
			$objetInput.val($objetInput.attr('placeholder'));
        }
		
		
		var message={};
		// Prevent markup from being injected into the message
		message.sujet = cleanInput($sujetInput.val());
		message.propriete  = cleanInput($proprieteInput.val());
		message.objet= cleanInput($objetInput.val());
		//console.log(message);
		// if there is a non-empty message and a socket connection
		if (message && connected) {
			$sujetInput.focus();
			$sujetInput.attr("placeholder", $sujetInput.val());
			$proprieteInput.attr("placeholder", $proprieteInput.val());
			$objetInput.attr("placeholder", $objetInput.val());
			$sujetInput.val('');
			$proprieteInput.val('');
			$objetInput.val('');
			addChatMessage({
				username: username,
				message: message
            });
			// tell server to execute 'new message' and send along one parameter
            if (typeof socket != "undefined"){
                socket.emit('new message', message);
            }
            else {
                //test sans socket
                //  var newStatement = new Statement(message.sujet, message.propriete, message.objet); 
                //	newStatement.add2Statements();
                
            }
            }else{
            // si message mais pas connecte
            $sujetInput.focus();
			$sujetInput.attr("placeholder", $sujetInput.val());
			$proprieteInput.attr("placeholder", $proprieteInput.val());
			$objetInput.attr("placeholder", $objetInput.val());
			$sujetInput.val('');
			$proprieteInput.val('');
			$objetInput.val('');
            var newStatement = new Statement(message.sujet, message.propriete, message.objet); 
            newStatement.add2Statements();
        }
    }
	
	// Log a message
	function log (message, options) {
		var $el = $('<li>').addClass('log').text(message);
		addMessageElement($el, options);
    }
	
	// Adds the visual chat message to the message list
	function addChatMessage (data, options) {
		// Don't fade the message in if there is an 'X was typing'
		var $typingMessages = getTypingMessages(data);
		options = options || {};
		if ($typingMessages.length !== 0) {
			options.fade = false;
			$typingMessages.remove();
        }
		
		//	console.log(data.message);
		var sujet=data.message.sujet;
		var propriete=data.message.propriete;
		var objet=data.message.objet;
		var triplet=sujet+" "+propriete+" "+objet;
		//console.log(triplet);
		if(sujet != 'is typing'){
			var newStatement = new Statement(sujet, propriete, objet);
			newStatement.add2Statements();
        } 
		
		var $usernameDiv = $('<span class="username"/>')
		.text(data.username)
		.css('color', getUsernameColor(data.username));
		var $messageBodyDiv = $('<span class="messageBody">')
		.text(triplet.toString());
		
		var typingClass = data.typing ? 'typing' : '';
		var $messageDiv = $('<li class="message"/>')
		.data('username', data.username)
		.addClass(typingClass)
		.append($usernameDiv, $messageBodyDiv);
		
		addMessageElement($messageDiv, options);
    }
	
	// Adds the visual chat typing message
	function addChatTyping (data) {
		data.typing = true;
		data.message={};
		data.message.sujet = 'is typing';
		data.message.propriete = '';
		data.message.objet = '';
		addChatMessage(data);
    }
	
	// Removes the visual chat typing message
	function removeChatTyping (data) {
		getTypingMessages(data).fadeOut(function () {
			$(this).remove();
        });
    }
	
	// Adds a message element to the messages and scrolls to the bottom
	// el - The element to add as a message
	// options.fade - If the element should fade-in (default = true)
	// options.prepend - If the element should prepend
	//   all other messages (default = false)
	function addMessageElement (el, options) {
		var $el = $(el);
		
		// Setup default options
		if (!options) {
			options = {};
        }
		if (typeof options.fade === 'undefined') {
			options.fade = true;
        }
		if (typeof options.prepend === 'undefined') {
			options.prepend = true;
        }
		
		// Apply options
		if (options.fade) {
			$el.hide().fadeIn(FADE_TIME);
        }
		if (options.prepend) {
			$messages.prepend($el);
			} else {
			$messages.append($el);
        }
		$messages[0].scrollTop = $messages[0].scrollHeight;
    }
	
	// Prevents input from having injected markup
	function cleanInput (input) {
		return $('<div/>').text(input).text();
    }
	
	// Updates the typing event
	function updateTyping () {
		if (connected) {
			if (!typing) {
				typing = true;
                if (typeof socket != "undefined"){
                    socket.emit('typing');
                }
            }
			lastTypingTime = (new Date()).getTime();
			
			setTimeout(function () {
				var typingTimer = (new Date()).getTime();
				var timeDiff = typingTimer - lastTypingTime;
				if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    if (typeof socket != "undefined"){
                        socket.emit('stop typing');
                    }
					typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }
	
	// Gets the 'X is typing' messages of a user
	function getTypingMessages (data) {
		return $('.typing.message').filter(function (i) {
			return $(this).data('username') === data.username;
        });
    }
	
	// Gets the color of a username through our hash function
	function getUsernameColor (username) {
		// Compute hash code
		var hash = 7;
		for (var i = 0; i < username.length; i++) {
			hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
		// Calculate color
		var index = Math.abs(hash % COLORS.length);
		return COLORS[index];
    }
    
   	// Keyboard events
	
	$window.keydown(function (event) {
		// Auto-focus the current input when a key is typed
		if (!(event.ctrlKey || event.metaKey || event.altKey)) {
			//$currentInput.focus();
        }
		// When the client hits ENTER on their keyboard
		if (event.which === 13) {
			if (username) {
				sendMessage();
                if (typeof socket != "undefined"){
                    socket.emit('stop typing');
                }
				typing = false;
				} else {
				setUsername();
            }
        }
    });
	
	$sujetInput.on('input', function() {
		updateTyping();
    });
	$proprieteInput.on('input', function() {
		updateTyping();
    });
	$objetInput.on('input', function() {
		updateTyping();
    });
	
	// Click events
	
	// Focus input when clicking anywhere on login page
	$loginPage.click(function () {
		$currentInput.focus();
    });
	
	// Focus input when clicking on the message input's border
	$sujetInput.click(function () {
		$sujetInput.focus();
    });
	
	// Focus input when clicking on the message input's border
	$proprieteInput.click(function () {
		$proprieteInput.focus();
    });
	
	// Focus input when clicking on the message input's border
	$objetInput.click(function () {
		$objetInput.focus();
    });
    
    
};


