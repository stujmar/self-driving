class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.15;
        this.maxSpeed = 4;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {
        this.#move();
    }

    #move() {
        if (this.controls.up) {
            this.speed += this.acceleration;
        }
        if (this.controls.down) {
            this.speed -= this.acceleration;
        }
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.04 * flip;
                // this.x -= 2;
            }
            if (this.controls.right) {
                this.angle -= 0.04 * flip;
                // this.x += 2;
            }
        }
            
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        } else if (this.speed < 0) {
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction) { // if speed is less than friction, set speed to 0
            this.speed = 0;
        }
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
           - this.width/2, // center rect on x
           - this.height/2, // center rect on y
            this.width,
            this.height
        );
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
    }
}