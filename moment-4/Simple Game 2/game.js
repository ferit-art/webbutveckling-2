// Laddar in bilder till spelet
const birdImg = new Image();
birdImg.src = "img/bird.png";

const catImg = new Image();
catImg.src = "img/cat.png";

// Position
const xPos = 260, yPos = 220;
//Lagrar tangent händelser, för att ta hand om dessa när allt skall ritas om. 
//Annars blir det kaos!
const keysDown = {};

// Tidpunkt då senaste skärmuppdatering skedde
let then;

/** Körs då sidan är laddad */
function init() {
	addEventListener("keydown", keyDown, false);
	addEventListener("keyup", keyUp, false);

	birdSprite = new Sprite(220, 260, birdImg,100);
	catSprite = new Sprite(120, 160, catImg, 20);

	then = Date.now();

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
	const now = Date.now(); // borde väl inte funka som en konstant då den ändras hela tiden??
	const deltaTime = now - then; // samma här??

	update(deltaTime / 1000);
	render();

	then = Date.now();

	// Bytt till requestAnimFrame istället för setInterval
	requestAnimationFrame(function () {
		gameLoop();
	});
}

/** Renderar canvasen */
function render() {
	const canvas = document.getElementById('gameCanvas');
	const ctx = canvas.getContext('2d');

	// Ser till att radera med vit bakgrund som det sedan skall ritas på
	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if (!collisionCheck(catSprite)) {
		ctx.drawImage(birdSprite.img, birdSprite.x, birdSprite.y);
		ctx.drawImage(catSprite.img, catSprite.x, catSprite.y);
	}

	ctx.restore();
}

/** Uppdaterar läget på fågeln */
function update(deltaTime) {
	if (37 in keysDown) { // Vänster
		birdSprite.x -= birdSprite.speed * deltaTime;
	}
	if (39 in keysDown) { // Höger
		birdSprite.x += birdSprite.speed * deltaTime;
	}
	if (38 in keysDown) { // Upp
		birdSprite.y -= birdSprite.speed * deltaTime;
	}
	if (40 in keysDown) { // Ner
		birdSprite.y += birdSprite.speed * deltaTime;
	}
}

function collisionCheck(entity) {
	return (birdSprite.x < entity.x + entity.img.width &&
		birdSprite.x + birdImg.width > entity.x &&
		birdSprite.y < entity.y + entity.img.height &&
		birdSprite.y + birdImg.height > entity.y)
}

window.addEventListener("load", init);