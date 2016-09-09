function Statement(sujetTemp, propriete, objetTemp) {
    var sujet = this.checkExist(sujetTemp);
    var objet = this.checkExist(objetTemp);
    this.sujet = sujet;
    this.propriete = propriete;
    this.objet = objet;
    // console.log("PROPRIETE "+this.propriete);
    /* TODO : s'il n'existe pas de spring avec ces deux neuds et cette propriete, le créer */
    
    if (longueurRessortVariable){
       // this. spring = physics.makeSpring(sujet.particle, objet.particle, SPRING_STRENGTH+sliderSpringStrength.value()/10, 0.4, 200*(1+(min(sujet.particle.mass/20,20)+(min(objet.particle.mass/20,20)))*(1+sliderSpringLength.value())/10), this.propriete); 
    //OK   this.spring = physics.makeSpring(sujet.particle, objet.particle, 0.01/(sujet.particle.mass+objet.particle.mass), 0.3, 500+(sujet.particle.mass+objet.particle.mass)*10, this.propriete);
               this.spring = physics.makeSpring(sujet.particle, objet.particle, 0.001, 0.3, 200, this.propriete);
 
        
        sujet.particle.mass=min(100,sujet.particle.mass*1.2);
        objet.particle.mass=min(100,objet.particle.mass*1.2);
    }
    else{ 
        this.spring = physics.makeSpring(sujet.particle, objet.particle, 0.001, 0.3, 200, this.propriete); 
        sujet.particle.mass=min(20,sujet.particle.mass*1.2);
        objet.particle.mass=min(20,objet.particle.mass*1.2);
        
        
    }//+(sujet.particle.mass+objet.particle.mass)*5
    
    //   sujet.particle.mass=sujet.particle.mass*1.1;
    // objet.particle.mass=objet.particle.mass*1.1;
    // var spring = physics.makeSpring(sujet.particle, objet.particle,  forceRessort, souplesseRessort, longueurRessort, this.propriete);
    // console.log(spring);
    var prop = {
        'propriete': propriete,
        'objet': objet
    };
    this.sujet.proprietes.push(prop);
    
    this.texte=propriete;
    this.img = loadImage("");
    var imageConst;
	if(this.texte.length>20){
		var littleText=this.texte.slice(0,20).concat("...");
		imageConst = constructImage(littleText);
        }else{
        imageConst = constructImage(this.texte);
    }
    this.img = imageConst[0];
	this.IMGtaille = imageConst[1];
    
    var enregistrements = document.getElementById('enregistrements');
    var enregDivdocument = document.createElement("DIV");
    var s = document.createTextNode(this.sujet.texte);
    var p = document.createTextNode(this.propriete);
    var o = document.createTextNode(this.objet.texte); // Create a text node
    var sep1 = document.createTextNode(", ");
    var sep2 = document.createTextNode(", ");
    //  s.attribute('id', 'sujet');
    //  p.attribute('id', 'propriete');
    //  o.attribute('id', 'objet');
    enregDivdocument.appendChild(s);
    enregDivdocument.appendChild(sep1);
    enregDivdocument.appendChild(p);
    enregDivdocument.appendChild(sep2);
    enregDivdocument.appendChild(o);
    enregDivdocument.onclick = function(e) {
        console.log(e);
        modif(this);
    };
    var canvas = document.getElementById('canvas');
    canvas.parentNode.insertBefore(enregDivdocument, canvas.nextSibling);
    //updateLevel();
}

Statement.prototype.checkExist = function(texte) {
    var trouve = false;
  	if (texte.includes("#")) {
		var texteTemp = texte.split("#");
		texte = texteTemp[1];
		prefix = texteTemp[0];
    } 
    for (var indice in individuals) {
        var individual = individuals[indice];
        if (individual.texte == texte) {
            // console.log("trouve " + texte);
            trouve = individual;
            break;
        }
    }
    if (trouve === false) {
        trouve = new Noeud(texte);
        individuals.push(trouve);
        //console.log("pas trouve");
    }
    return trouve;
}
Statement.prototype.log = function() {
    // console.log(this.sujet);
}

Statement.prototype.draw=function(){
 //  this.spring.length= 200*(1+(min(this.sujet.particle.mass/20,20)+(min(this.objet.particle.mass/20,20)))*(1+sliderSpringLength.value())/10);
 //this.spring.length= 200*(1+sliderSpringLength.value())/10;
 //  this.spring.constant= SPRING_STRENGTH+sliderSpringStrength.value()/10;
//  console.log(this.spring);
    
    fill(modeleCouleurs.springColor);
	//		push();
	//translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
    //	console.log(this.sujet);
	line(this.sujet.particle.position.x, this.sujet.particle.position.y, this.sujet.particle.position.z, this.objet.particle.position.x, this.objet.particle.position.y, this.objet.particle.position.z);
    
    var milieuSens = createVector((this.sujet.particle.position.x * 3 + this.objet.particle.position.x) / 4, (this.sujet.particle.position.y * 3 + this.objet.particle.position.y) / 4, (this.sujet.particle.position.z * 3 + this.objet.particle.position.z) / 4);
    push();
    translate(milieuSens.x, milieuSens.y, milieuSens.z);
	//normalMaterial();
	//sphere(6);
	if (afficheTexte) {
		translate(10, 10, -10);
        
        
		texture(this.img);
		//	box(80, 80, 80);
        if (milieuSens.z>centroid.z()-20){
            plane(this.IMGtaille, 6);
        }
		//	plane(8, 4);
    }
	pop();
	
}


Statement.prototype.add2Statements=function(){
	addStatement(this);
}