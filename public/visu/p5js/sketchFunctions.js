

//PHYSICS
function updateCentroid() // whenever system is reorganized or scaled, node positions have to be updated
{
	var xMin = 999999.9, //Float.POSITIVE_INFINITY,
	xMax = -999999.9, //Float.NEGATIVE_INFINITY,
	yMin = 999999.9, //Float.POSITIVE_INFINITY,
	yMax = -999999.9; //Float.NEGATIVE_INFINITY;
	zMin = 999999.9, //Float.POSITIVE_INFINITY,
	zMax = -999999.9; //Float.NEGATIVE_INFINITY;
	
	for (i = 0; i < physics.particles.length; ++i) {
		var p = physics.particles[i];
		xMax = max(xMax, p.position.x);
		xMin = min(xMin, p.position.x);
		yMin = min(yMin, p.position.y);
		yMax = max(yMax, p.position.y);
		zMin = min(zMin, p.position.y);
		zMax = max(zMax, p.position.y);
		
	}
	
	var deltaX = xMax - xMin;
	var deltaY = yMax - yMin;
	var deltaZ = zMax - zMin;
	if (deltaY > deltaX) {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, height / (deltaY + 50),1000 / (deltaZ + 50));
		} else {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, width / (deltaX + 50),1000 / (deltaZ + 50));
	}
	// console.log(xMax + " " + xMin + " " + yMin + " " + yMax);
	
	centroid.setTarget(centroid.x(),centroid.y(),centroid.z());
	//console.log(centroid.x(), centroid.y(), centroid.z());
};












//GUI

function resetCam() {	
	catchClick=false;
	sliderZ.value(200);
	sliderCamX.value(0);
	sliderCamY.value(0);
	sliderCamZ.value(0);
	console.log("resetSlider");
}

function toogleTexte() {
	afficheTexte = !afficheTexte;
}

function toogleNoeuds() {
	afficheNoeuds = !afficheNoeuds;
}

function toogleLiens() {
	afficheLiens = !afficheLiens;
}

function addStatement(statement){
	statements.push(statement);
}






//KEYBOARD MOUSE
function mousePressed(){
	previous.x=mouseX;
	previous.y=mouseY;
}

function mouseDragged() {
	
	current.x = mouseX;
	current.y = mouseY;
	
	if((mouseX)>115 && (mouseY<limiteDrag-200)){
		//desactiver drag si changement par slider
		catchClick=true;
	}
	
	if (catchClick){
		if (current.x!=previous.x){
			sliderCamX.value(sliderCamX.value()+(previous.x-current.x));
			//sliderCamX.value(sliderCamX.value()+(previous.x-current.x)*(-sliderCamZ.value()/100)-1);
			previous.x=current.x;
		}
		
		if (current.y!=previous.y){
			sliderCamY.value(sliderCamY.value()+(previous.y-current.y));
			//sliderCamY.value(sliderCamY.value()+(previous.y-current.y)*(-sliderCamZ.value()/100)+1);
			previous.y=current.y;
		}
	}
}

function mouseReleased(){
	catchClick=true;
}


function mouseWheel(event) {
	//println(event.delta);
	sliderCamZ.value(sliderCamZ.value()+event.delta);
	//uncomment to block page scrolling
	
	return false;
}



//DESSIN

function drawSpring(element,index,array){
	fill(255);
	//console.log(element);
	element.draw();
}

function constructImage(texte) {
	tCtx = document.getElementById('textCanvas').getContext('2d');
	//console.log(tCtx);
	tCtx.canvas.width = tCtx.measureText(texte).width;
	tCtx.canvas.height = 40;
	//	tCtx.canvas.style('display','none');
	IMGtaille = tCtx.canvas.width / 2;
	//	console.log(taille);
	tCtx.font = "40px verdana"; // verdana, serif, Arial
	//voir http://jsfiddle.net/AbdiasSoftware/2JGHs/
	tCtx.fillText(texte, 0, tCtx.canvas.height*4/5);
	//	imageElem.src = tCtx.canvas.toDataURL();
	//	console.log(imageElem.src);
	//	image1.src = tCtx.canvas.toDataURL();
	img = loadImage(tCtx.canvas.toDataURL());
	//console.log(texte);
	var imgConst=[img,IMGtaille];
	return imgConst;
	
}


//REGLAGES
function checkMoyenne(){
	var maxi=0;
	var somme=0;
	var length=0;
	for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];
		var a=attraction.a;
		var b=attraction.b;
		var v1 = createVector(a.position.x, a.position.y, a.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);
		var d = v1.dist(v2);
		somme=somme+d;	
	}
	moyenne=somme/(physics.attractions.length+1);
	//if(moyenne>200){
	for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];		
		var a=attraction.a;
		var b=attraction.b;
		
		var v1 = createVector(a.position.x, a.position.y, a.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);	
		var d = v1.dist(v2);
	//	console.log(d);
		//	if (((d<500)&&(d>(moyenne)))||(d>500)|| (d==0)){//||
		if ((d>400)|| (d==0)|| ((d<400)&&(d>moyenne+10))){
			physics.attractions.remove(j);
							fill(0,255,0);

				line(a.position.x, a.position.y, a.position.z, b.position.x, b.position.y, b.position.z);
	
			//console.log(a);

		}
	//}
}
}