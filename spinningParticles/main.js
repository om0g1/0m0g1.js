const RADIUS = 70;
const canvas = document.querySelector("#particle-canvas");
const pen = canvas.getContext("2d");
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousePos = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function creatParticles() {
    for (let i = 0; i < 25; i++) {
        const particle = {
            size: 1,
            angle: getRndInteger(0, 360),
            position: {x: mousePos.x, y: mousePos.y},
            lag: {x: mousePos.x, y: mousePos.y},
            speed: getRndInteger(0, 5) * 0.01,
            color: `#${getRndInteger(11111111,16777215)}`,
            orbit: getRndInteger(RADIUS/2, RADIUS)
        }
        particles.push(particle);
    }
}

function loop() {
    pen.fillStyle = "rgba(0,0,0,0.05)";
    pen.fillRect(0, 0, canvas.width, canvas.height);
    
    pen.beginPath();
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];

        particle.angle += speed;

        particle.position.x = particle.lag.x + Math.cos(particle.angle) * particle.orbit;
        particle.position.y = particle.lag.y + Math.sin(particle.angle) * particle.orbitsv ;

        pen.fillStyle = particle.color;
        pen.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI, false);
        
    }
    pen.fill();
}

setInterval(() => {
    loop();
}, 250);

document.onmousemove = (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    
}