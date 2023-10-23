const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

pen.shadowColor = "white";
pen.shadowBlur = 10;
pen.fillStyle = "white";

function drawStars() {

    function drawStar() {
        const star = {
            x: getRndInteger(0, canvas.width),
            y: getRndInteger(0, canvas.height),
            width: getRndInteger(1, 4)
        }
        pen.beginPath();
        pen.arc(star.x, star.y, star.width, 0, 2 * Math.PI);
        pen.fill();
        setTimeout(() => {
            pen.clearRect(star.x - (star.width * 6), star.y - (star.width * 6), star.width * 20, star.width * 20);
        }, getRndInteger(500, 1000));
    }

    setTimeout(() => {
        drawStar();
        drawStars();
    }, getRndInteger(10, 50));
}

drawStars();