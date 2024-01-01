console.log('... game loading ...'); // eslint-disable-line no-console

const canvas = document.querySelector('#myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

// define Car class


const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    requestAnimationFrame(animate);
    canvas.height = window.innerHeight;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.update();
    car.draw(ctx);
}
