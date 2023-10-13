let playerPos = {
    x: 0,
    y: 0
};
let body = []
const gameModes = ["bounded", "unbounded"];
let gameMode = gameModes[1];
const cellSize = 32;
const gameCanvas = document.querySelector("#game-canvas");
const gridCanvas = document.querySelector("#grid-canvas");
const pen = gameCanvas.getContext("2d");
const pen2 = gridCanvas.getContext("2d");
const canvases = [gameCanvas, gridCanvas];

canvases.forEach((canvas) => {
    canvas.width = Math.round(window.innerWidth / cellSize) * cellSize;
    canvas.height = (Math.round(window.innerHeight / cellSize) * cellSize) + cellSize;
});

const bounds = {
    x: gameCanvas.width - cellSize,
    y: gameCanvas.height - cellSize
}

function drawGrid() {
    pen2.beginPath();
    for (let x = 0; x < gridCanvas.width; x += cellSize) {
        pen2.moveTo(x, 0);
        pen2.lineTo(x, gridCanvas.height);
    }
    for (let y = 0; y < gridCanvas.height; y += cellSize) {
        pen2.moveTo(0, y);
        pen2.lineTo(gridCanvas.width, y);
    }
    pen2.stroke();
}

function drawSquare(x, y) {
    pen.fillRect(x, y, cellSize, cellSize);
}

function checkBounds() {
    if (gameMode == gameModes[0]) {
        if (playerPos.x < 0) playerPos.x = 0;
        else if (playerPos.x > bounds.x) playerPos.x = bounds.x;
        if (playerPos.y < 0) playerPos.y = 0;
        else if (playerPos.y > bounds.y) playerPos.y = bounds.y;
    } else if (gameMode == gameModes[1]) {
        if (playerPos.x < 0) playerPos.x = bounds.x;
        else if (playerPos.x > bounds.x) playerPos.x = 0;
        if (playerPos.y < 0) playerPos.y = bounds.y;
        else if (playerPos.y > bounds.y) playerPos.y = 0;
    }
}

function moveSnake(direction) {
    pen.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    switch(direction) {
        case "w":
            playerPos.y -= cellSize;
            break;
        case "a":
            playerPos.x -= cellSize;
            break;
        case "s":
            playerPos.y += cellSize;
            break;
        case "d":
            playerPos.x += cellSize;
            break;
        default:
            break;
    }
    checkBounds();
    drawSquare(playerPos.x, playerPos.y);
}

document.onkeydown = (e) => {
    switch(e.key) {
        case "w":
            moveSnake("w");
            break;
        case "a":
            moveSnake("a");
            break;
        case "s":
            moveSnake("s");
            break;
        case "d":
            moveSnake("d");
            break;
        case "t":
            gameMode = (gameMode === gameModes[0]) ? gameModes[1] : gameModes[0];
        default:
            break;
    }
}

window.onload = () => {
    alert("press T to toggle game mode so that you can be able to pass through walls or not");
    pen.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    pen2.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    drawGrid();
    drawSquare(0, 0);
}