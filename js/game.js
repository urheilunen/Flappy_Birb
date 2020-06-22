var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp  = new Image();
var pipeBottom = new Image();

bird.src = "img/birdie.png";
bg.src = "img/background.png";
fg.src = "img/foreground.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"

// gap between pipes
var gap = 110;


// on button pressing
document.addEventListener("keydown", moveUp);
function moveUp() {
	if(ySpeed < 0) {
		ySpeed -= 5
	} else {
		ySpeed = -5;
	}
}
// creating blocks
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

var ySpeed = 0;
var gravity = 0.25;
// birb position
var xPos = 10;
var yPos = 150;

var score = 0;

function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if(pipe[i].x == 125) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}
		if(xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
					|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
				|| yPos + bird.height >= cvs.height - fg.height) {
					location.reload();
				}
		if(pipe[i].x == 10) {
			score++;
		}
	}
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	ySpeed += gravity;
	yPos += ySpeed;

	ctx.fillStyle = "#000";
	ctx.font = "24px Arial";
	ctx.fillText("Score: " + score, 10, cvs.height - 20)
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
