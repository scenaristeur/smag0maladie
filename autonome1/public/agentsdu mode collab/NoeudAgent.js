/**
	* Custom agent prototype
	* @param {String} id
	* @constructor
	* @extend eve.Agent
*/
function NoeudAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);
	
    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
	
	//texte
	this.texte=id;
	this.prefix="";
	this.formateTexte();
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
	
	//Particule
	this.particle = physics.makeParticle(5.0, 0, 0, 0);
	this.particle.position = new Vector(random(-1000,1000), random(-1000,1000) , random(-1000,1000));
	//physics.makeAttraction(centre, this.particle, -20, 1000);
	//physics.makeAttraction(centre, this.particle, 100, 0);
	this.attractions=[];
	this.proprietes = [];
	
	//images
	
	
	
	//utiles ?
	this.proprietes = [];
	//this.nbAtt=0
	
}

// extend the eve.Agent prototype
NoeudAgent.prototype = Object.create(eve.Agent.prototype);
NoeudAgent.prototype.constructor = NoeudAgent;

/**
	* Send a greeting to an agent
	* @param {String} to
*/
NoeudAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
};

/**
	* Handle incoming greetings. This overloads the default receive,
	* so we can't use NoeudAgent.on(pattern, listener) anymore
	* @param {String} from     Id of the sender
	* @param {*} message       Received message, a JSON object (often a string)
*/
NoeudAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');
	
    if (message.indexOf('Hello') === 0) {
		// reply to the greeting
		this.send(from, 'Hi ' + from + ', nice to meet you!');
	}
    
	
};


////////////////////////////////////////////
NoeudAgent.prototype.formateTexte = function() {
	// console.log("update");
	if (this.texte.includes("#")) {
		var texteTemp = this.texte.split("#");
		this.texte = texteTemp[1];
		this.prefix = texteTemp[0];
	} 
};

NoeudAgent.prototype.update = function() {
	// console.log("update");
	//this.attractions=[];
	for (var i = 0; i < individuals.length; i++) {
		//if(physics.particles.length<1000){
		var b = individuals[i];
		if (b.particle!=this.particle){
			var v1 = createVector(this.particle.position.x, this.particle.position.y, this.particle.position.z);
			var v2 = createVector(b.particle.position.x, b.particle.position.y, b.particle.position.z);
			
			var d = v1.dist(v2);
			
			
			
			// var found = false;
			// for(var j = 0; j < this.attractions.length; j++) {
			// if (this.attractions[j] == b) {
			// found = true;
			// break;
			// }
			// }
			//&&(!found)
					if ((d<200)||(d<moyenne)){
				var attraction=physics.makeAttraction(b.particle, this.particle, -(10+b.particle.mass+this.particle.mass), 400+b.particle.mass+this.particle.mass+d);
				fill(255,0,0);

				line(this.particle.position.x, this.particle.position.y, this.particle.position.z, b.particle.position.x, b.particle.position.y, b.particle.position.z);
	
				//this.attractions.push(attraction);
				//console.log(this.attractions.length);
				// for (var o=10;o<physics.attractions.length;o++){
					// var attTemp=physics.attractions[o];
					// if((attTemp!=attraction)&&((attTemp.a == this.particle)&& (attTemp.b== b.particle)) || (attTemp.b == this.particle)&& (attTemp.a== b.particle)){
						// physics.attractions.remove(o);
						// console.log("rem");
					// }
									// var attraction=physics.makeAttraction(b.particle, this.particle, -1, 200);
					
				// }
				// if (this.attractions.length>5){
				// console.log(this.attractions);
				// this.attractions.pop(0);
				// }
				// }else if ((d>200)||(d==0)){
				// this.attractions.pop(b.texte);
				// console.log(this.attractions);
			}
		//	console.log(this.attractions.length);
			
		}
	}
	
	// for (var a=0;a<this.attractions.length;a++){
	// var attraction=this.attractions[a];
	// console.log(attraction);
	
	// }
	
	//this.attractions.pop(0);
	
};

NoeudAgent.prototype.draw = function() {
	// console.log("draw");
	
	push();
	translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
	var taille=this.particle.mass;
	//console.log(taille);
	normalMaterial();
	sphere(taille);
	//console.log(this.img);
	if (afficheTexte) {
		translate(taille+2, taille+2, taille+2);
		texture(this.img);
		//	box(80, 80, 80);
		plane(this.IMGtaille, 10);
		//	plane(8, 4);
	}
	//sphere(16);
	pop();	
};
