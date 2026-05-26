/**
 * Gemensam för  alla figurer som rör sig.
 *
 * @param x		Läge i x-led
 * @param y		Läge i x-led
 * @param img	Figur som representerar figuren
 * @param speed	Hastigheten i px/s
 */
class Sprite {

	constructor(x, y, img, speed) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.speed = speed; // Hastighet i px/s
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	}
}
