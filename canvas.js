var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//CODE VOOR LATER VOOR HET MOGELIJK SCHALEN VAN HET VENSTER
var wPercentage = 1;
var hPercentage = 1;
var scale = 1;

//HET AANMAKEN VAN DE VARIABELE VOOR DE SPRITE-SHEET
var vos_Right = new Image();
vos_Right.src = "images/Fox_Walking.png";
vos_Right.addEventListener("load", loadImage, false);

var vos_Left = new Image();
vos_Left.src = "images/Fox_Walking_L.png";
vos_Left.addEventListener("load", loadImage, false);

var vos_Idle_Left = new Image();
vos_Idle_Left.src = "images/Fox_Idle_Left.png";
vos_Idle_Left.addEventListener("load", loadImage, false);

var vos_Idle_Right = new Image();
vos_Idle_Right.src = "images/Fox_Idle_Right.png";
vos_Idle_Right.addEventListener("load", loadImage, false);

function loadImage(e) {
  animate();
}



//DE VARIABELEN VAN DE ANIMATIE
var shift = 0;
var frameWidth = 260;
var frameHeight = 134;
var totalFrames = 24;
var currentFrame = 0;

var vosX = window.innerWidth / 2;
var x = 0;
var y = 0;
var foxLeft = false;
var foxRight = false;

var mouse = {
	x: undefined,
	y: undefined
}

canvas.addEventListener('mousemove',
					   function(event){
	x = event.x;
	y = event.y;
})

canvas.addEventListener('ontouchmove',
					   function(event){
	window.addEventListener('touchmove',
        function (event) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        })

})

window.addEventListener('resize',
						function(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	wPercentage = window.innerWidth / window.screen.availWidth;
	hPercentage = window.innerHeight / window.screen.availHeight;
	
	if(wPercentage > hPercentage){
		scale = hPercentage;
	}
	else{
		scale = wPercentage;
	}

	
	init();
})


function init(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	
}

function animate(){
	 context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	
	if(vosX - x < -5){
		vosX+= 2;
		
		 context.drawImage(vos_Right, shift, 0, frameWidth, frameHeight,
                    vosX - frameWidth/2, window.innerHeight - 35 - frameHeight, 
					frameWidth, frameHeight);
		
		foxRight = true;
		foxLeft = false;
	}
	if(vosX - x > 5){
		vosX-= 2;
		
		 context.drawImage(vos_Left, shift, 0, frameWidth, frameHeight,
                    vosX - frameWidth/2, window.innerHeight - 35 - frameHeight, 
					frameWidth, frameHeight);
		
		foxRight = false;
		foxLeft = true;
		
	}if (vosX - x >= -5 && vosX - x <= 5){
		if(foxLeft){
			context.drawImage(vos_Idle_Left,vosX - frameWidth/2, window.innerHeight - 32 - frameHeight);
		}
		if(foxRight){
			context.drawImage(vos_Idle_Right,vosX - frameWidth/2, window.innerHeight - 32 - frameHeight);
		}
	}
	
context.fillRect(0,innerHeight-40,innerWidth,40);
 
  shift += frameWidth + 0;
 
  if (currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;
  }
 
  currentFrame++;
 
  requestAnimationFrame(animate);
	
	
}

init();
