var canvas1=document.getElementById("canvas");

var current=[];

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
            if((keyIsPressed === true)&&(keyCode== CONTROL)){
                rotationHorizontale-=(previous.x-current.x)/200;
                }else{
                sliderCamX.value(sliderCamX.value()+(previous.x-current.x));
            }
			previous.x=current.x;
        }
		
		if (current.y!=previous.y){
            if((keyIsPressed === true)&&(keyCode== CONTROL)){
                rotationVerticale-=(previous.y-current.y)/200; 
                }else{
                sliderCamY.value(sliderCamY.value()+(previous.y-current.y));
            }
        	previous.y=current.y;
        }
    }
}

function mouseReleased(){
	catchClick=true;
}


function mouseWheel(event) {
    zoom+=event.delta;
    //println(event.delta);
    //  sliderCamZ.value(sliderCamZ.value()+event.delta);
    // translate(0,0,event.delta);
    //uncomment to block page scrolling
    //camera(camSliderX, camSliderY, camSliderZ);
    //	translate(-width / 2, -height / 2, -camSliderZ);
    //rotateX(camSliderY/200);
    //rotateY(camSliderX/200);
    return false;
}


function keyPressed(evt) {
    
    // UP key
    if(keyCode == UP_ARROW)
    {
        evt.preventDefault();
        sliderCamY.value(sliderCamY.value()+10);
    }
    
    // DOWN key
    if(keyCode == DOWN_ARROW)
    { 
        evt.preventDefault();
        sliderCamY.value(sliderCamY.value()-10);
    }
    
    // RIGHT key
    if(keyCode == RIGHT_ARROW)
    {
        evt.preventDefault();
        sliderCamX.value(sliderCamX.value()-10);
    }
    
    // LEFT key
    if(keyCode == LEFT_ARROW)
    {
        evt.preventDefault();
        sliderCamX.value(sliderCamX.value()+10);
    }
}