let R = 200;
let a = 300; //30
let b = 100;
let points = [];
let colors = [];
const steps = 1500;
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

pen.lineWidth = 0.5;
pen.strokeStyle = "#00a4eb";
pen.lineJoin = "round";

function generateGradientColors(startColor, endColor, n) {
    // Convert hexadecimal colors to RGB format for easier interpolation
    function hexToRgb(hex) {
        return [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)
        ];
    }

    // Interpolate between two colors
    function interpolateColor(color1, color2, factor) {
        return color1.map((channel, i) =>
            Math.round(channel + (color2[i] - channel) * factor)
        );
    }

    // Convert RGB back to hexadecimal format
    function rgbToHex(rgb) {
        return '#' + rgb.map(channel =>
            channel.toString(16).padStart(2, '0')
        ).join('');
    }

    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);

    const gcolors = [startColor];

    for (let i = 1; i <= n; i++) {
        const factor = i / n;
        const interpolatedColor = rgbToHex(interpolateColor(startRgb, endRgb, factor));
        gcolors.push(interpolatedColor);
    }

    return gcolors;
}


function createPoints() {
    for (let t = 0; t < steps; t++) {
        const point = {
            x: (Math.floor(R + a)*Math.cos(t) - b*Math.cos(((R+a)/R)*t)) / 4 + center.x,
            y: (Math.floor(R + a)*Math.sin(t) - b*Math.sin(((R+a)/R)*t)) / 4 + center.y,
        }
        points.push(point);
    }
}

function drawSpirograph() {

    function drawFrame(i, j) {
        if (i < points.length) {
            pen.beginPath();
            pen.strokeStyle = colors[i];
            pen.moveTo(points[i - 1].x, points[i - 1].y);
            pen.lineTo(points[i].x, points[i].y);
            pen.stroke();
            i++;
            // if (i > 16) j = 30;
            // else j = 150;
            // setTimeout(() => {drawFrame(i)}, j);
            setTimeout(() => {drawFrame(i)}, 1); //30
        }
    }

    drawFrame(1, 1000);
}

colors = generateGradientColors("#00a4eb", "#eb00a4", steps);
createPoints();
// drawSpirograph();
setTimeout(() => {drawSpirograph()}, 1000)