const Radius = 70;
const timer = document.querySelector("#timer");
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
const colors = [
  "#eb003baa",
  "#e50043aa",
  "#db0051aa",
  "#d1005eaa",
  "#c7006caa",
  "#be007aaa",
  "#b40088aa",
  "#aa0096aa",
  "#a000a4aa",
  "#9600b2aa",
  "#8c00c0aa",
  "#8200ceaa",
  "#7800dbaa",
  "#6e00e9aa",
  "#6400f7aa",
  "#5a00ffaa",
  "#4f00f2aa",
  "#4500e6aa",
  "#3b00daaa",
  "#3100ceaa",
  "#2700c2aa",
  "#1d00b6aa",
  "#130aaaaa",
  "#09009eaa",
  "#000092aa"
];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bounds = {
  x: canvas.width - 5,
  y: canvas.height - 5
}

let particles = [];
let mousePos = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createParticles() {
  for (let i = 0; i < 20; i++) {
    let particle = {
      size: getRndInteger(2, 5),
      angle: getRndInteger(0, 360),
      position: {
        x: mousePos.x,
        y: mousePos.y
      },
      color: colors[i],
      orbit: getRndInteger(Radius * 0.75, Radius),
      speed: getRndInteger(10, 15) * 0.1,
      lag: getRndInteger(10, 25),
      trail: []
    };
    particles.push(particle);
  }
}

const PiBy180 = Math.PI / 180;

function moveParticles() {
  pen.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    const shrinkedOrbit = particle.orbit * 0.1;
    particle.position.x += ((mousePos.x - particle.position.x) / particle.lag) + shrinkedOrbit * Math.cos(particle.angle * PiBy180);
    particle.position.y += ((mousePos.y - particle.position.y) / particle.lag) + shrinkedOrbit * Math.sin(particle.angle * PiBy180);

    if (particle.position.x < 5) particle.position.x = 5;
    else if (particle.position.x > bounds.x) particle.position.x = bounds.x;
    if (particle.position.y < 5) particle.position.y = 5;
    else if (particle.position.y > bounds.y) particle.position.y = bounds.y;

    pen.beginPath();
    pen.fillStyle = particle.color;
    pen.lineWidth = particle.size;
    pen.arc(particle.position.x, particle.position.y, particle.size, 0, 2 * Math.PI);
    pen.fill();

    particle.angle += particle.speed;

    pen.strokeStyle = particle.color;
    if (particle.trail.length < 20) {
        {particle.trail.unshift({x: particle.position.x, y: particle.position.y})}
    } else {
      particle.trail.pop();
    }

    for (let i = 0; i < particle.trail.length; i++) {
      pen.lineTo(particle.trail[i].x, particle.trail[i].y);
    }
    pen.stroke();
  }

  requestAnimationFrame(moveParticles);
}

let percentage = 0;

function increasePercentage(){
    setTimeout(() => {
        if (percentage < 100) {
            percentage += 1;
            timer.innerHTML = `${percentage}%`;
            increasePercentage();
        }
        }, getRndInteger(20, 120));
}

window.onload = () => {
  createParticles();
  moveParticles();
  setTimeout(() => {
    increasePercentage();
  }, 500)
};
