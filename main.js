console.log('... game loading ...'); // eslint-disable-line no-console
const canvas = document.querySelector('#myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

// const laneCount = document.getElementById('laneCount').value;
// const carPosition = document.getElementById('carPosition')?.value || 1;
const laneCount = 3;
const carPosition = 1;

const road = new Road(canvas.width / 2, canvas.width * 0.9, laneCount);
const car = new Car(road.getLaneCenter(carPosition), (window.innerHeight / 2), 30, 50);

car.draw(ctx);

animate();

function animate() {
    canvas.height = window.innerHeight;

    car.update(road.borders);
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}
