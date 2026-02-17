// Laddar in bilder till spelet
const birdImg = new Image();
birdImg.src = "img/bird.png";

const catImg = new Image();
catImg.src = "img/cat.png";

// Vår fågel som vi styr laddas in i funktionen init()
let birdSprite;

// Våra katter som vi skall kollidera med laddas in i init()
let spriteArray;
const amountOfCats = 5;
let points = 0;

//Ljud för skott
const hitSound = new Audio('fire.mp3');

//Lagrar tangent händelser, för att ta hand om dessa när allt skall ritas om. 
//Annars blir det kaos!
const keysDown = {};

// Tidpunkt då senaste skärmuppdatering skedde
let then;

/** Körs då sidan är laddad */
function init() {
	addEventListener("keydown", keyDown, false);
	addEventListener("keyup", keyUp, false);

	birdSprite = new Sprite(220, 260, birdImg, 100);

	spriteArray = new Array();
	for (var x = 0; x < amountOfCats; x++)
		spriteArray[x] = new Sprite(20 + x * 95, 20, catImg, 50);

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

	const now = Date.now();
	const deltaTime = now - then;

	update(deltaTime / 1000);

	render();

	then = now;
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

	ctx.drawImage(birdSprite.img, birdSprite.x, birdSprite.y);

	for (var i = 0; i < 5; i++)
		if (spriteArray[i].alive)
			ctx.drawImage(spriteArray[i].img, spriteArray[i].x, spriteArray[i].y);

	ctx.fillStyle = "black";
	ctx.font = "14px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Poäng: " + points, 400, 400);

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

	for (let i = 0; i < 5; i++) { //NY
		if (spriteArray[i].alive) {
			if (checkHit(birdSprite, spriteArray[i])) {
				spriteArray[i].alive = false;
				points++;

				hitSound.load();
				hitSound.play();
			}
			spriteArray[i].y += spriteArray[i].speed * deltaTime;
		}
	}
}

/**
 * Kollitionsdetektion mellan två Sprite-objekt
 * 
 * @param spriteOne		Fiende som skall kollas
 * @param spriteTwo		spriteTwoekt som kollision skall kollas mot
 * @returns true 	vid krock
 */
function checkHit(spriteOne, spriteTwo) {
	if (spriteTwo.x <= (spriteOne.x + spriteOne.img.width) &&
		spriteOne.x <= (spriteTwo.x + spriteTwo.img.width)
		&& spriteTwo.y <= (spriteOne.y + spriteOne.img.height) &&
		spriteOne.y <= (spriteTwo.y + spriteTwo.img.height)) {
		return true;
	} else
		return false;
}

window.addEventListener("load", init, false);