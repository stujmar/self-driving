class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.3;
        this.maxSpeed = 4;
        this.friction = 0.05;
        this.angle = 0;
        this.polygon = this.#createPolygon();
        this.damaged = false;

        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }

    update(roadBoarders) {
        this.#move();
        this.polygon = this.#createPolygon();
        this.damaged = this.#assessDamage(roadBoarders);
        this.sensor.update(roadBoarders);
    }

    #assessDamage(roadBoarders) {
        for (let i = 0; i < roadBoarders.length; i++) {
            if (polysIntersect(this.polygon, roadBoarders[i])) {
                return true;
            }
        }
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        return points;
    }

    #move() {
        if (this.controls.up) { // if up is pressed
            this.speed += this.acceleration; // increase speed
        }
        if (this.controls.down) { // if down is pressed
            this.speed -= this.acceleration; // decrease speed
        }

        if (this.speed != 0) { // Flip angle if car is going backwards
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        if (this.speed > this.maxSpeed) { // Speed limit
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) { // Friction
            this.speed -= this.friction;
        } else if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) { // if speed is less than friction, set speed to 0
            this.speed = 0;
        }
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {

        ctx.fillStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        this.sensor.draw(ctx);
    }
}
