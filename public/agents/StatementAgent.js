/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/
function StatementAgent(statement) {
    // execute super constructor
    eve.Agent.call(this);
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	
	//INITIALISATION
	console.log(statement);
	this.sujet=this.checkExist(statement.sujet);
	this.propriete = statement.propriete;
	this.objet=this.checkExist(statement.objet);
	this.spring =  physics.makeSpring(this.sujet.particle, this.objet.particle, /*forceRessort*random(.5, 1)*/ SPRING_STRENGTH/10,1.1, 400, this.propriete);
	this.sujet.particle.mass=this.sujet.particle.mass+2;
	this.objet.particle.mass=this.objet.particle.mass+2;
	this.prop = {
		'propriete': this.propriete,
		'objet': this.objet
	};
    this.sujet.proprietes.push(this.prop);
	this.texte=this.propriete;
	this.img = loadImage("");
	this.imageConst;
	if(this.texte.length>20){
		var littleText=this.texte.slice(0,20).concat("...");
		this.imageConst = constructImage(littleText);
		}else{
		this.imageConst = constructImage(this.texte);
	}
	this.img = this.imageConst[0];
	this.IMGtaille = this.imageConst[1];
	addStatement(this);
}

// extend the eve.Agent prototype
StatementAgent.prototype = Object.create(eve.Agent.prototype);
StatementAgent.prototype.constructor = StatementAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
StatementAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use StatementAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
StatementAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
	
    if (message.indexOf('Hello') === 0) {
		// reply to the greeting
		this.send(from, 'Hi ' + from + ', nice to meet you!');
	}
};

StatementAgent.prototype.checkExist = function(texte) {
	/*var texte=noeud.texte;
		if (typeof texte == "undefined"){
		texte=noeud.id;
	}*/
	
	var trouve = false;
  	if (texte.includes("#")) {
		var texteTemp = texte.split("#");
		texte = texteTemp[1];
		prefix = texteTemp[0];
	} 
	for (var indice in individuals) {
		var individual = individuals[indice];
		if (individual.id == texte) {
			//  console.log("trouve " + texte);
			trouve = individual;
			break;
		}
	}
	if (trouve === false) {
		trouve = new NoeudAgent(texte);
		individuals.push(trouve);
		// console.log("pas trouve");
	}
	return trouve;
};

StatementAgent.prototype.draw = function(){
	fill(125, 125, 125);
	//		push();
	//translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
	//	console.log(this.sujet);
	line(this.sujet.particle.position.x, this.sujet.particle.position.y, this.sujet.particle.position.z, this.objet.particle.position.x, this.objet.particle.position.y, this.objet.particle.position.z);
	
	var milieuSens = createVector((this.sujet.particle.position.x * 3 + this.objet.particle.position.x) / 4, (this.sujet.particle.position.y * 3 + this.objet.particle.position.y) / 4, (this.sujet.particle.position.z * 3 + this.objet.particle.position.z) / 4);
	push();
	translate(milieuSens.x, milieuSens.y, milieuSens.z);
	//normalMaterial();
	//sphere(6);
	//if ((this.sujet.particle.position.z>0 && (this.objet.particle.position.z>0))){
	if (afficheTexte) {
		translate(10, 10, -10);
		
		
		texture(this.img);
		//	box(80, 80, 80);
		plane(this.IMGtaille, 6);
		//	plane(8, 4);
	}
//}
pop();

};
