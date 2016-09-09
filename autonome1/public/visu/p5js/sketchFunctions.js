function init() {
	physics = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);
	centre = physics.makeParticle(2.0, width / 2, height / 2, 0.0);
	centre.lock = true;
}

function resetCam() {	
    catchClick=false;
    sliderZ.value(200);
	sliderCamX.value(0);
	sliderCamY.value(0);
	sliderCamZ.value(0);
    // zoom=0;
    rotationHorizontale = 0;
    rotationVerticale = 0;
    sliderSpringLength.value(0);
    sliderSpringStrength.value(0);
    sliderDistMin.value(150);
}

function toogleTexte() {
	afficheTexte = !afficheTexte;
}

function toogleBigClasse(){
    afficheBigClasse = !afficheBigClasse;
}

function toogleColor(){
    if ( modeleCouleurs==modColWhite){
        modeleCouleurs=modColBlack;
        }else{
        modeleCouleurs=modColWhite;
    }
}


function constructImage(texte) {
	tCtx.canvas.width = tCtx.measureText(texte).width;
    tCtx.canvas.height = 20; //hauteur de l'écriture
    
	//	tCtx.canvas.style('display','none');
	IMGtaille = tCtx.canvas.width / 2;
    //   console.log(tCtx.canvas.height);
	tCtx.font = "20px verdana"; // verdana, serif, Arial
	//voir http://jsfiddle.net/AbdiasSoftware/2JGHs/
	tCtx.fillText(texte, 0, tCtx.canvas.height * 4 / 5);
    
    //	console.log(tCtx.canvas.toDataURL());
	img = loadImage(tCtx.canvas.toDataURL());
	//console.log(texte);
	var imgConst=[img,IMGtaille];
	return imgConst;
    
}

function drawTextBG(ctx, txt, font, x, y,z) {
    
    ctx.save();
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f50';
    
    var width = ctx.measureText(txt).width;
    ctx.fillRect(x, y, width, parseInt(font, 10));
    
    ctx.fillStyle = '#000';
    ctx.fillText(txt, x, y);
    
    ctx.restore();
}

function addStatement(statement){
	statements.push(statement);
}   


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
	moyenne=somme/physics.attractions.length;
	//if(moyenne>200){
	for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];		
		var a=attraction.a;
		var b=attraction.b;
		var v1 = createVector(a.position.x, a.position.y, a.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);	
		var d = v1.dist(v2);
        
        fill(255, 165,0);
        line(a.position.x, a.position.y, a.position.z, b.position.x, b.position.y, b.position.z);
        
        
        
        if ((d==0)||(d>(moyenne+5))||(d>(90+physics.attractions.length))){
            //
            ////avec dans Noeuds if (((d<150-physics.attractions.length)) ||((moyenne>5)&&(d<(moyenne-5)))){
            //
            //
            //ici, on enleve à       if ((d==0)||(d>(moyenne+5))||(d>90)){
            
            
            
            
            physics.attractions.remove(j);
            //  console.log("rem0");
        }
        //	if (((d<500)&&(d>(moyenne+100)))||(d>500)){//||
		//	physics.attractions.remove(j);
        
    //}
    //  } 
}
}

function drawElement(element, index, array) {
	fill(255);
	element.update();
    if (element.particle.mass<maxiMass){
    	element.draw();
        
        } else if (afficheBigClasse ){
        element.draw();
    }
}

function drawSpring(element,index,array){
	fill(255);
	element.draw();
}

function afficheImage() {
	ambientLight(300);
	pointLight(250, 250, 250, 100, 100, 0);
	translate(-220, 0, 0);
	push();
	rotateZ(theta * mouseX * 0.001);
	rotateX(theta * mouseX * 0.001);
	rotateY(theta * mouseX * 0.001);
	//pass image as texture
	texture(img);
	sphere(150);
	pop();
	translate(440, 0, z);
	push();
	rotateZ(theta * 0.1);
	rotateX(theta * 0.1);
	rotateY(theta * 0.1);
	basicMaterial(100, 100, 200, 20)
	texture(img);
	box(taille, 80, 80);
	pop();
	translate(-220, -50, z);
	push();
	plane(taille * 2, 40);
	pop();
	theta += 0.05;
	z = z + d;
	if ((z > 100) || (z < 1)) {
		d = -d;
    }
}



function updateCentroid() // whenever system is reorganized or scaled, node positions have to be updated
{
	var xMin = 999999.9, //Float.POSITIVE_INFINITY,
    xMax = -999999.9, //Float.NEGATIVE_INFINITY,
    yMin = 999999.9, //Float.POSITIVE_INFINITY,
    yMax = -999999.9; //Float.NEGATIVE_INFINITY;
    
	for (i = 0; i < physics.particles.length; ++i) {
		var p = physics.particles[i];
		xMax = max(xMax, p.position.x);
		xMin = min(xMin, p.position.x);
		yMin = min(yMin, p.position.y);
		yMax = max(yMax, p.position.y);
        
    }
    
	var deltaX = xMax - xMin;
	var deltaY = yMax - yMin;
	if (deltaY > deltaX) {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, height / (deltaY + 50));
        } else {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, width / (deltaX + 50));
    }
	// console.log(xMax + " " + xMin + " " + yMin + " " + yMax);
	// console.log(centroid.x(), centroid.y(), centroid.z());
};


/*
    
    function ajouteTriplet() {
	// TODO : verifier si les valeurs sont vides
	var statement = new Statement(inpSujet.value(), inpProp.value(), inpObjet.value());
    statements.add(statement);
	var testjson = {
    type: "nouvelleInfo",
    sujet: inpSujet.value(),
    propriete: inpProp.value(),
    objet: inpObjet.value()
	};
	var dataToSend = JSON.stringify(testjson);
	websocketDreamCatcher.send(dataToSend);
    }
    
*/
/*function chargeDemo() {
	afficheTexte = false;
	chargeData("dc");
}*/    

function exportGraphe(){
    agentExport.exportGraphe();
    
}

function saveTextAsFile(){
    var nomFichier="";
    if (document.getElementById("inputFileNameToSaveAs").value == ""){
        console.log("vide");
        nomFichier = prompt('Quel sera le nom du fichier exporté ?','fichier');
        document.getElementById("inputFileNameToSaveAs").value = nomFichier;
    }    
    else{
        console.log(document.getElementById("inputFileNameToSaveAs").value);
        nomFichier = document.getElementById("inputFileNameToSaveAs").value;
    }
    var data = document.getElementById("inputTextToSave").value;
    
    var extension= "ttl";
    agentExport.saveTextAsFile(data, nomFichier, extension);    
}

