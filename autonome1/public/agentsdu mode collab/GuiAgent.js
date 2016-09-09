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
};

GuiAgent.prototype.makeUi = function(){
	
	//////////////////////////////////////
	//MASTER CONTENT
	/////////////////////////////////////
	var masterContent = document.createElement("DIV");
	masterContent.setAttribute("id","masterContent");
	document.body.appendChild(masterContent);
	
	var pushobj=document.createElement("DIV");
	pushobj.setAttribute("id","pushobj");
	masterContent.appendChild(pushobj);
	
	var menu=document.createElement("DIV");
	menu.setAttribute("id","menu");
	masterContent.appendChild(menu);
	
	var saisieDiv=document.createElement("DIV");
	saisieDiv.setAttribute("id","saisieDiv");
	pushobj.appendChild(saisieDiv);
	
	var canvasDiv=document.createElement("DIV");
	canvasDiv.setAttribute("id","canvasDiv");
	pushobj.appendChild(canvasDiv);
	
	var saisieDiv2=document.createElement("DIV");
	saisieDiv2.setAttribute("id","saisieDiv2");
	pushobj.appendChild(saisieDiv2);
	
	
	
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
	title.innerHTML = "What's your nickname ?";
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
	saisieDiv.appendChild(sujetInput);
	
	var proprieteInput = document.createElement("INPUT");
	proprieteInput.className = "proprieteInput";
	proprieteInput.placeholder="propriete here...";
	saisieDiv.appendChild(proprieteInput);
	
	var objetInput = document.createElement("INPUT");
	objetInput.className = "objetInput";
	objetInput.placeholder="Sujet here...";
	saisieDiv.appendChild(objetInput);
	
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
	
	/*var defaultCanvas0 = document.createElement("CANVAS");
		defaultCanvas0.setAttribute("id","defaultCanvas0");
	document.body.appendChild(defaultCanvas0);*/
	
	var textCanvas = document.createElement("CANVAS");
	textCanvas.setAttribute("id","textCanvas");
	textCanvas.style.height=40;
	
	document.body.appendChild(textCanvas);
	
	////////////////////////////////////////////////
	//CHAT
	////////////////////////////////////////////////
	var testdiv = document.createElement("DIV");
	document.body.appendChild(testdiv);
	
	var roomsBlock = document.createElement("DIV");
	roomsBlock.style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;"
	// roomsBlock.className = "rooms";
	testdiv.appendChild(roomsBlock);
	
	var roomtitle=document.createElement("B");
	roomtitle.innerHTML="ROOMS";
	roomsBlock.appendChild(roomtitle);
	
	var roomsDiv=document.createElement("DIV");
	roomsDiv.setAttribute("id","rooms");
	roomsBlock.appendChild(roomsDiv);
	
	/*var convBlock = document.createElement("DIV");
		convBlock.style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;";
		// roomsBlock.className = "rooms";
		testdiv.appendChild(convBlock);
		
		var convDiv = document.createElement("DIV");
		convDiv.setAttribute("id","conversation");
		convBlock.appendChild(convDiv);
		
		var convInput = document.createElement("INPUT");
		convInput.setAttribute("id","data");
		convInput.style="width:200px;";
		convBlock.appendChild(convInput);
		
		var datasendBtn = document.createElement("INPUT");
		datasendBtn.setAttribute("id","datasend");
		datasendBtn.type="button";
		datasendBtn.value="send";
	convBlock.appendChild(datasendBtn);*/
	
};
