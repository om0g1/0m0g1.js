let mousePos = {
    x: 0,
    y: 0
}
let trail = [];
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

pen.fillStyle = "white";
pen.shadowColor = "white";
pen.shadowBlur = 5;

const FullCircle = 2 * Math.PI;

function loopTrail() {
    pen.clearRect(0, 0, canvas.width, canvas.height);

    function drawStars(x, y) {
        const starNo = getRndInteger(1, 3);

        for (let i = 0; i < starNo; i++) {
            const star = {
                x: getRndInteger(x - 20, x + 20),
                y: getRndInteger(y - 20, y + 20),
                width: getRndInteger(1, 2)
            }
            pen.beginPath();
            pen.arc(star.x, star.y, star.width, 0, FullCircle);
            pen.fill();
        }

    }

    for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        drawStars(point.x, point.y);
    }
}

document.onmousemove = (e) => {
    if (trail.length < 50) {
        trail.unshift ({
            x: e.clientX,
            y: e.clientY
        });
    }
}

window.onload = () => {
    setInterval(() => {     
        loopTrail();
    }, 20);
    setInterval(() => {
        trail.pop();
    }, 40);
}