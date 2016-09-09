
var canvas;
var previous=[]; // precedente position pour Drag
var current=[]; // position courante pour le drag
var catchClick=true;

//PHYSICS
var physics;
var PHYS_GRAVITY = 0;
var PHYS_DRAG = 0.1;
var SPRING_STRENGTH = 0.1;
var centroid = new Smoother3D(0.9);

//GRAPHE
var afficheTexte = true;
var afficheNoeuds = true; 
var afficheLiens = true;
var individuals = [];
var statements = [];
var tCtx;

//GUI
var infoDiv;

function setup() {
	//CANVAS
	canvas = createCanvas(windowWidth-100, windowHeight-150, WEBGL);
	// pour caher le graphe au debut 	canvas.size(100,100);
	canvas.attribute('id', 'canvas');
	//canvas.position(300,500);
		//var cnv=document.getElementById("canvas");
	canvas.hide();
	//var content=document.getElementById("pushobj");
	
	//content.appendChild(cnv);
	//console.log(content);
	perspective(60 / 180 * PI, width/height, 0.1, 100);
	frameRate(10);
//	console.log(canvas);
	
	//PHYSICS
	physics = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);
	centre = physics.makeParticle(2.0, width / 2, height / 2, 0.0);
	centre.lock = true;
	centroid.setValue(0, 0, 0);
	
	//DRAG DU GRAPHE
	previous.x=canvas.width/2;
	previous.y=canvas.height/2;
	limiteDrag=displayHeight-200;
	
	sliderZ = createSlider(0, 255, 200);
	sliderZ.position(10, 500);
	sliderZ.style('width', '80px');
	
	
	sliderCamX = createSlider(-10000, 10000, 0);
	sliderCamX.position(10, 520);
	sliderCamX.style('width', '80px');
	sliderCamY = createSlider(-10000, 10000, 0);
	sliderCamY.position(10, 540);
	sliderCamY.style('width', '80px');
	sliderCamZ = createSlider(-10000, 10000, 0);
	sliderCamZ.position(10, 560);
	sliderCamZ.style('width', '80px');
/*	buttonResetCam = createButton("Reset Camera");
	buttonResetCam.position(10, 580);
	buttonResetCam.mousePressed(resetCam);
	
	buttontoogleTexte = createButton("Toogle Texte");
	buttontoogleTexte.position(10, 480);
	buttontoogleTexte.mousePressed(toogleTexte);
	
	buttontoogleNoeuds = createButton("Toogle Noeuds");
	buttontoogleNoeuds.position(10, 460);
	buttontoogleNoeuds.mousePressed(toogleNoeuds);
	
	buttontoogleLiens = createButton("Toogle Liens");
	buttontoogleLiens.position(10, 440);
	buttontoogleLiens.mousePressed(toogleLiens);
	
	infoDiv = createDiv("INFO");
	infoDiv.position(displayWidth/2, 10);*/
	
}


function draw(){
	background(0,125,0,50);
	fill(255, 255,255);
	translate(-width / 2, -height / 2);
	
	//Move Camera et centroids d'apres sliders
	var zSlider = (sliderZ.value() - 200) * 10;
	centroid.setZ(zSlider);
	var camSliderZ = sliderCamZ.value();
	var camSliderX = sliderCamX.value();
	var camSliderY = sliderCamY.value();
	camera(camSliderX, camSliderY, camSliderZ);
	
	
	//	PHYSICS
	physics.tick(); //within physics library, creates a counter to continue to make more nodes
	
	//update centroid
	translate(centre.position.x, centre.position.y, centre.position.z);
	basicMaterial(0, 250, 0);
	sphere(5);
	if (physics.particles.length > 1) {
		updateCentroid();
		centroid.tick();
		//centre.position.x = centroid.x();
		//centre.position.y = centroid.y();
		//centre.position.z = centroid.z();
		push();
		translate(centroid.x(), centroid.y(), centroid.z());
		basicMaterial(250, 0, 0);
		sphere(5);
		pop();
	}
	
	for (k=0 ;k<individuals.length;k++) {
		var noeud= individuals[k];
		//if (noeud instanceof Noeud){
		if(physics.attractions.length<10000){
			noeud.update();
		}else{
		physics.attractions.remove(0);
		}
		noeud.draw();
		
	//}
}
statements.forEach(drawSpring);

/*for (l=0;l<statements.length;l++){
	var statement=statements[l];
	statement.update();
	statement.draw();
}*/
checkMoyenne();

//AFFICHE INFOS
//infoDiv.elt.innerHTML=individuals.length+" "+physics.particles.length+" "+physics.attractions.length+" "+moyenne;

}	