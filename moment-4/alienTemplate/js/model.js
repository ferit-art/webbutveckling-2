class Sprite {
    constructor(x, y, img, speed) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
    }

    move(deltaTime) {
        this.x += this.dx * this.speed * deltaTime;
        this.y += this.dy * this.speed * deltaTime;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
}

class Ship extends Sprite {
    constructor(x, y, img, speed) {
        super(x, y, img, speed);
        this.shootEnabled = true;
    }
}

class Enemy extends Sprite {
    constructor(x, y, img, speed) {
        super(x, y, img, speed);
        this.alive = true;
        this.dy = 1;
    }
}

class Shot extends Sprite {
    constructor(x, y, img, speed) {
        super(x, y, img, speed);
        this.action = false;
    }
}