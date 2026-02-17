/**
 * Initierar spelet, anropas vid onload
 */

// New Shot måste skapas varje gång space trycks ned, shot och aliens ska försvinna utanför canvasen => shot.action = false och Ship.shootEnabled = true
const shipImg = new Image();
shipImg.src = "img/ship.gif";

const alienImg = new Image();
alienImg.src = "img/alien.gif";

const shotImg = new Image();
shotImg.src = "img/shot.gif";

let alienArray;
const amountOfAliens = 5;

const shotSound = new Audio("sound/fire.mp3");

const keysDown = {};

let then;
let points = 0;

function init() {
	const canvas = document.getElementById("spaceCanvas");
	canvas.width = 610;
	canvas.height = 810;

	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);

	const newGameButton = document.getElementById("reloadButton");
	newGameButton.addEventListener("click", newGame);

	// ---- ÖVRIG KOD HÄR ----

	// -----------------------

	Ship = new Ship(220, 260, shipImg, 200);
	Shot = new Shot(Ship.x, Ship.y, shotImg, 700);

	alienArray = new Array();
	for (let x = 0; x < amountOfAliens; x++)
		alienArray[x] = new Enemy(20 + x * 95, 20, alienImg, 100);

	then = Date.now();

	gameLoop();
}

/**
 * Spelloopen
 * Bytt till requestAnimationFrame som förbättring.
 */
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

/**  Ritar om canvas   */
function render() {
	// ---- ÖVRIG KOD HÄR ----
	const canvas = document.getElementById("spaceCanvas");
	const ctx = canvas.getContext('2d');

	// Ser till att radera med vit bakgrund som det sedan skall ritas på
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	Ship.draw(ctx);

	if (Shot.action) {
		Shot.draw(ctx);
	}

	for (let i = 0; i < amountOfAliens; i++)
		if (alienArray[i].alive)
			alienArray[i].draw(ctx);

	ctx.fillStyle = "white";
	ctx.font = "14px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Poäng: " + points, 10, 10);

	ctx.restore();
}


/**
 * Uppdaterar läget på figurernat
 * och kontrollerar krockar
 */
function update(deltaTime) {
	// ---- ÖVRIG KOD HÄR ----
	const canvas = document.getElementById("spaceCanvas");
	if (37 in keysDown && Ship.x > 0) { // Vänster
		Ship.dx = -1;
	} else if (39 in keysDown && Ship.x + Ship.img.width < canvas.width) { // Höger
		Ship.dx = 1;
	} else if (38 in keysDown && Ship.y > 0) { // Upp
		Ship.dy = -1;
	} else if (40 in keysDown && Ship.y + Ship.img.height < canvas.height) { // Ner
		Ship.dy = 1;
	} else if (32 in keysDown && Ship.shootEnabled) { // Mellanslag
		fire();
	} else {
		Ship.dy = 0;
		Ship.dx = 0;
	}

	Ship.move(deltaTime);

	if (Shot.action) {

		Shot.dy = -1;
		Shot.move(deltaTime);

		if (Shot.y < 0) {
			Shot.action = false;
			Ship.shootEnabled = true;
		}
	}

	for (let i = 0; i < amountOfAliens; i++) {
		if (alienArray[i].alive) {
			alienArray[i].move(deltaTime);

			if (alienArray[i].y + alienArray[i].img.height >= canvas.height) {
				alienArray[i].dy = -1;
			} else if (alienArray[i].y <= 0) {
				alienArray[i].dy = 1;
			}

			if (checkHit(alienArray[i], Ship)) {
				alienArray[i].alive = false;
				points--;
			}
			if (checkHit(alienArray[i], Shot)) {
				alienArray[i].alive = false;
				Shot.action = false;
				Ship.shootEnabled = true;
				points++;
			}
		}
	}
}

/**  Avlosssar en missil om möjligt  */
function fire() {
	// ---- ÖVRIG KOD HÄR ----
	if (Ship.shootEnabled) {
		Shot.x = Ship.x + (Ship.img.width / 2 - Shot.img.width / 2);
		Shot.y = Ship.y;
		Ship.shootEnabled = false;
		Shot.action = true;
		shotSound.load();
		shotSound.play();
	}
}

/**
 * Kollitionsdetektion mellan fiende och missil
 * 
 * @param enemy		Fiende som skall kollas
 * @param obj		Objekt som kollision skall kollas mot
 * @returns true 	vid krock
 */
function checkHit(enemy, obj) {
	// ---- ÖVRIG KOD HÄR ----
	return (enemy.x < obj.x + obj.img.width &&
		enemy.x + enemy.img.width > obj.x &&
		enemy.y < obj.y + obj.img.height &&
		enemy.y + enemy.img.height > obj.y);
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

function newGame() {
	window.location.reload();
}

window.addEventListener("load", init);