//TRAER
var physics;
var PHYS_GRAVITY = 0;
var PHYS_DRAG = 0.01;
var centroid = new Smoother3D(0.8);
var tCtx;
var taille;

//GUI
var sliderZ, sliderCamZ,sliderCamX,sliderCamY;

// graphe
var afficheTexte = false;
var afficheBigClasse=false;
var maxiMass=3;
var previous=[];
 var SPRING_STRENGTH = 0.1 ; //0.001; //
// var SPRING_DAMPING = 0.1;
var statements=[];
var z = 1;
var d = 1;
var moyenne=100;
//var pg;
var catchClick=true;
var zoom=0;
var rotationHorizontale = 0;
var rotationVerticale = 0;
var longueurRessortVariable=true; // true or false pour creation des springs dans Statement.js et StatementAgent.js en fonction de la mass (nombre de liens de chacun des deux noeuds. Permet de gérer l'eloignement pour les gros noeuds
var previousNodeX=0;
var previousNodeY=0;
var previousNodeZ=0;

var modColWhite={background : 255, backgroundTransparency: 50, springColor : 220};
var modColBlack={background : 0, backgroundTransparency: 255 , springColor : 30};
var modeleCouleurs=modColWhite;


function setup(){
    //  frameRate(10);
	canvas = createCanvas(displayWidth, displayHeight-200, WEBGL);
	//canvas = createCanvas(displayWidth-250, 400, WEBGL);
	perspective(60 / 180 * PI, width/height, 0.1, 100);
    //	pg=createGraphics(100,100,'WEBGL');
	
	canvas.attribute('id', 'canvas');
	//canvas.position("fixed");
	canvas.position(0,0);
	CANVAS_WIDTH = canvas.width;
	CANVAS_HEIGHT = canvas.height;
    previous.x=CANVAS_WIDTH/2;
	previous.y=CANVAS_HEIGHT/2;
	limiteDrag=displayHeight-200;
	centroid.setValue(0, 0, 0);
    
    init();
    
    sliderZ = createSlider(0, 255, 200);
	sliderZ.position(10, 500);
	sliderZ.style('width', '80px');
	
	
	sliderCamX = createSlider(-1000, 1000, 0);
	sliderCamX.position(10, 520);
	sliderCamX.style('width', '80px');
	sliderCamY = createSlider(-1000, 1000, 0);
	sliderCamY.position(10, 540);
	sliderCamY.style('width', '80px');
	sliderCamZ = createSlider(-1000, 1000, 0);
	sliderCamZ.position(10, 560);
	sliderCamZ.style('width', '80px');
	buttonResetCam = createButton("Reset Camera");
	buttonResetCam.position(10, 580);
	buttonResetCam.mousePressed(resetCam);
	
    buttontoogleTexte = createButton("Toogle Texte");
	buttontoogleTexte.position(10, 480);
	buttontoogleTexte.mousePressed(toogleTexte);
    
    buttontoogleBigClasse = createButton("Toogle BigClass");
	buttontoogleBigClasse.position(10, 460);
	buttontoogleBigClasse.mousePressed(toogleBigClasse);
    
    buttontoogleColor = createButton("Toogle Color");
	buttontoogleColor.position(10, 440);
	buttontoogleColor.mousePressed(toogleColor);
    
	sliderSpringLength = createSlider(-10, 10, 0);
	sliderSpringLength.position(10, 600);
	sliderSpringLength.style('width', '80px');
    
    	sliderSpringStrength = createSlider(-10, 10, 0);
	sliderSpringStrength.position(10, 620);
	sliderSpringStrength.style('width', '80px');
    
    //sliderDistMin ne semble avoir aucun effet ???
    sliderDistMin = createSlider(0, 300, 150);
	sliderDistMin.position(10, 640);
	sliderDistMin.style('width', '80px');
    
    tCtx = document.getElementById('textCanvas').getContext('2d');
}



function draw() {
	background(modeleCouleurs.background,modeleCouleurs.backgroundTransparency);    
    translate(0, 0, -zoom);
	var zSlider = (sliderZ.value() - 200) * 10;
	centroid.setZ(zSlider);
	var camSliderZ = sliderCamZ.value();
	var camSliderX = sliderCamX.value();
	var camSliderY = sliderCamY.value();
	camera(camSliderX, camSliderY, camSliderZ);
    rotateX(rotationVerticale);
    rotateY(rotationHorizontale);
    
    
	physics.tick(); //within physics library, creates a counter to continue to make more nodes
	var canvas1 = document.getElementById('canvas');
	centre.position.x = 0;
    centre.position.y = 0;
    /*  fill(25, 25, 25);
        line(0,centre.position.y,centre.position.z,0,centre.position.y,centre.position.z);
        line(centre.position.x ,0,centre.position.z,centre.position.x ,0,centre.position.z);
    line(centre.position.x ,centre.position.y,-100,centre.position.x ,centre.position.y,100);*/
    basicMaterial(0, 250, 0);
    sphere(5);
    
    
	if (physics.particles.length > 1) {
		updateCentroid();
		centroid.tick();
        //	centre.position.x = centroid.x();
        //	centre.position.y = centroid.y();
        //	centre.position.z = centroid.z();
		push();
		translate(centroid.x(), centroid.y(), centroid.z());
		basicMaterial(250, 0, 0);
		sphere(5);
		pop();
    }
    if(physics.attractions.length<1000){
        individuals.forEach(drawElement);
        statements.forEach(drawSpring);
    }
    /*z = z + d;
        if ((z > 100) || (z < 1)) {
        d = -d;
        
    }*/
    
    /*
        if (typeof leMot !== "undefined") {
        //	console.log(leMot);
        text(leMot, 200, 200);
    }*/
    
    
    /*
        if (physics.attractions.length>300){
        for (j=0;j<physics.attractions.length;j=j+2){
        physics.attractions.remove(j);
        }
        }
        if(physics.attractions.length>1000){
        
        physics.attractions=[];
    }*/
    // document.getElementById("nbAtt").innerHTML=physics.attractions.length;
    //console.log(physics.attractions.length);
    if(physics.attractions.length>0){
        checkMoyenne();
        console.log(moyenne+" "+physics.attractions.length);
    }
    
    
    //  console.log(camera);
}

function init() {
	physics = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);
	centre = physics.makeParticle(2.0, width / 2, height / 2, 0.0);
	centre.lock = true;
}

