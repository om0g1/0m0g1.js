let particle = [];
let angle = 1;
let Radius = 70;
const fullCircle = 2 * Math.PI;
const PiBy180 = Math.Pi / 180;
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles() {
    for (let i = 0; i < 2; i++) {
        particles.push({
            x: mousePos.x,
            y: mousePos.y,
            trail: []
        })
    }
}

pen.fillStyle = "white";

function moveParticles() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        pen.beginPath();
        let currentAngle = angle;
        if (index == 1) currentAngle *= -1;
        particle.x = (mousePos.x - particle.x) * Math.cos(currentAngle * PiBy180);// * Radius;
        particle.y = mousePos.y ; // + Math.sin(currentAngle * PiBy180) * Radius;
        pen.arc(particle.x, particle.y, 5, 0, fullCircle);
        pen.fill();
    })
    // angle += 1.0;
    requestAnimationFrame(moveParticles);
}


let mousePos = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

document.onmousemove = (e) => {
    mousePos = {
        x: e.clientX,
        y: e.clientY
    }
}

window.onload = () => {
    createParticles();
    moveParticles();
}