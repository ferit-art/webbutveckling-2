// Laddar in bilder till spelet
let birdImg = new Image();
let catImg = new Image();
birdImg.src = "img/bird.png";
catImg.src = "img/cat.png";

// Position
let xPos = 275 - birdImg.width / 2, yPos = 225 - birdImg.height / 2;
//Lagrar tangent händelser, för att ta hand om dessa när allt skall ritas om. 
//Annars blir det kaos!
let keysDown = {};

// Tidpunkt då senaste skärmuppdatering skedde
let then;

/** Körs då sidan är laddad */
function init() {
	addEventListener("keydown", keyDown, false);
	addEventListener("keyup", keyUp, false);

	gameLoop();
}

/** Sparar undan en tangentryckning för bearbetning  */
function keyDown(e) {
	keysDown[e.keyCode] = true;
}

/**
 * Tar bort händelsen när knappen släpps. Detta så inte händelsen ligger kvar och 
 * återupprepas. Skeppet skulle då flytta sig hela tiden vid ett tryck.
 */
function keyUp(e) {
	delete keysDown[e.keyCode];
}

/** Spellopen */
function gameLoop() {
	update();
	render();

	// Bytt till requestAnimFrame istället för setInterval
	requestAnimationFrame(function () {
		gameLoop();
	});
}

/** Renderar canvasen */
function render() {
	let canvas = document.getElementById('gameCanvas');
	let ctx = canvas.getContext('2d');

	// Ser till att radera med vit bakgrund som det sedan skall ritas på
	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(catImg, xPos, yPos);
	ctx.drawImage(birdImg, 100, 100);

	ctx.restore();
}

/** Uppdaterar läget på fågeln */
function update(deltaTime) {
	let canvas = document.getElementById('gameCanvas');
	if (37 in keysDown && 1 < xPos) { // Vänster
		xPos -= 5;
	}
	if (39 in keysDown && canvas.width > xPos + catImg.width) { // Höger
		xPos += 5;
	}
	if (38 in keysDown && 1 < yPos) { // Upp
		yPos -= 5;
	}
	if (40 in keysDown && canvas.height > yPos + catImg.height) { // Ner
		yPos += 5;
	}

}

window.addEventListener("load", init, false);