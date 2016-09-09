function Noeud(texte) {
	if (texte.includes("#")) {
		var texteTemp = texte.split("#");
		this.texte = texteTemp[1];
		this.prefix = texteTemp[0];
		} else {
		this.texte = texte;
    }
	this.img = loadImage("");
	
	this.proprietes = [];
	this.nbAtt=0
	
	this.particle = physics.makeParticle(1, 0, 0, 0);
    
	this.particle.position = new Vector(previousNodeX+random(-200,200), previousNodeY+random(-200,200) , previousNodeZ+random(-200,200));
    previousNodeX=this.particle.position.x;
    previousNodeY=this.particle.position.y;
    previousNodeZ=this.particle.position.z;
	var imageConst;
	if(this.texte.length>20){
		var littleText=this.texte.slice(0,20).concat("...");
		imageConst = constructImage(littleText);
		}else{
		imageConst = constructImage(this.texte);
    }
	
	this.img = imageConst[0];
	this.IMGtaille = imageConst[1];
    //  console.log(imageConst);
	physics.makeAttraction(centre, this.particle, 0, 1);   //-distance souhaite, force  plus force est elevee moins les noeuds se deplace
	
    /*	for (i = 0; i < physics.particles.length; i++) {
		var b = physics.particles[i];
        physics.makeAttraction(this.particle, b, -10, 100);
        physics.makeAttraction(b, this.particle, -10, 100);
    }*/
}

Noeud.prototype.update = function() {
	//console.log(physics.attractions[0].a);
	/*for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];
		var attA=attraction.a;
		var attB=attraction.b;
		if((attA==this.particle)||(attB==this.particle)){
		
		physics.attractions.remove(j);
		console.log(physics.attractions.length);
		}
		
    }*/
	//var attParNoeud=0;
	
	if(physics.attractions.length<300){
        for (i = 0; i < physics.particles.length; i++) {
            var b = physics.particles[i];
            var v1 = createVector(this.particle.position.x, this.particle.position.y, this.particle.position.z);
            var v2 = createVector(b.position.x, b.position.y, b.position.z);
            
            var d = v1.dist(v2);
            //	if(attParNoeud<10){
            if ((b != this.particle) && (b != centre)) {
                
                if (physics.attractions.length<300){
                    if ((d<(90-physics.attractions.length+this.particle.mass+b.mass)) ||((moyenne>5)&&(d<(moyenne-(physics.attractions.length/10))))){
                		fill(0, 255,0);
                
                        line(this.particle.position.x, this.particle.position.y, this.particle.position.z, b.position.x, b.position.y, b.position.z);
                        physics.makeAttraction(b, this.particle, -100*(this.particle.mass+b.mass)/2, 0.01+(this.particle.mass+b.mass)/2); 
                       
            //physics.makeAttraction(b, this.particle, -100, d+longueurRessort+this.mass0*5); 
                    }
                }
                
                
            }
            
        }		
             //   physics.attractions.remove(0);
        }else{
        for (r = 0; r < 10; r++) {
            //enlever les anciennes attractions
            physics.attractions.remove(r);
            
        }
        
        
    }
    /*
    this.particle.position.x=min(this.particle.position.x,1000);
    this.particle.position.y=min(this.particle.position.y,1000);
    this.particle.position.z=min(this.particle.position.z,1000);
    this.particle.position.x=max(this.particle.position.x,-1000);
    this.particle.position.y=max(this.particle.position.y,-1000);
    this.particle.position.z=max(this.particle.position.z,-1000);
    */
    
}

Noeud.prototype.draw = function() {
	//fill(255, 0, 255);
	
	
	
	
	push();
	translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
	normalMaterial();
    // console.log(this.particle.mass);
	sphere(3+this.particle.mass);
    
    //test de pour cacher les noeuds du fond
    
    
    
	if (afficheTexte) {
		translate(10, 10, 10);
		
		
		texture(this.img);
        //	box(80, 80, 80);
        if (this.particle.position.z>centroid.z()-20){
            plane(this.IMGtaille,5); // hauteur du panneau
            //	plane(8, 4);
        }
    }
	//sphere(16);
    //  drawTextBG(tCtx, this.texte, '32px arial', 100, 100);
	pop();
	// drawTextBG(tCtx, this.texte, '32px arial', this.particle.position.x, this.particle.position.y,this.particle.position.z);
	
}			    