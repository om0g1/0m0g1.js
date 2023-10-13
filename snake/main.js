let score = 0;
let food = {
    x: 0,
    y: 0
};
let isDead = false;
const gameModes = ["bounded", "unbounded"];
let gameMode = gameModes[0];
const cellSize = 32;
const newSnakeBody = [{x: 64, y: 96 + cellSize * 2}, {x: 64, y: 96 + cellSize}, {y: 64, y: 96 - cellSize}];
let snakeBody = newSnakeBody;
const canvasWrapper = document.querySelector("#canvas-wrapper");
const gameCanvas = document.querySelector("#game-canvas");
const gridCanvas = document.querySelector("#grid-canvas");
const pen = gameCanvas.getContext("2d");
const pen2 = gridCanvas.getContext("2d");
const canvases = [gameCanvas, gridCanvas];
let gameInterval = "";
const directions = ["w", "a", "s", "d"];
let prevDir = directions[2];
let dir = directions[0];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

canvases.forEach((canvas) => {
    canvas.width = Math.round(canvasWrapper.getBoundingClientRect().width / cellSize) * cellSize;
    canvas.height = (Math.round(canvasWrapper.getBoundingClientRect().height / cellSize) * cellSize) + cellSize;
});

const bounds = {
    x: gameCanvas.width - cellSize,
    y: gameCanvas.height - cellSize
}

function drawGrid() {
    pen2.beginPath();
    for (let x = 0; x < gridCanvas.width+1; x += cellSize) {
        pen2.moveTo(x, 0);
        pen2.lineTo(x, gridCanvas.height);
    }
    for (let y = 0; y < gridCanvas.height+1; y += cellSize) {
        pen2.moveTo(0, y);
        pen2.lineTo(gridCanvas.width, y);
    }
    pen2.stroke();
}

function drawSquare(x, y) {
    pen.fillRect(x, y, cellSize, cellSize);
}

function die() {
    if (!isDead) {
        isDead = true;
        clearInterval(gameInterval);
        alert(`Your score is ${score}`);
        startGame();
    }
}

function checkBounds(newHead) {
    if (gameMode == gameModes[0]) {
        if (newHead.x < 0) {newHead.x = 0; return false}
        else if (newHead.x > bounds.x) {newHead.x = bounds.x; return false}
        if (newHead.y < 0) {newHead.y = 0; return false}
        else if (newHead.y > bounds.y) {newHead.y = bounds.y; return false}
    } else if (gameMode == gameModes[1]) {
        if (newHead.x < 0) newHead.x = bounds.x;
        else if (newHead.x > bounds.x) newHead.x = 0;
        if (newHead.y < 0) newHead.y = bounds.y;
        else if (newHead.y > bounds.y) newHead.y = 0;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (newHead.x == snakeBody[i].x && newHead.y == snakeBody[i].y) {
            return false;
        }
    }
    return newHead;
}

let tempBody = [];

function updatesnakeBody(newHead) {
    tempBody = [];
    tempBody.push(newHead);
    for (let i = 0; i < snakeBody.length - 1; i++) {
        tempBody.push({
            x: snakeBody[i].x,
            y:snakeBody[i].y
        });
    }
    snakeBody = tempBody;
}

function drawFood() {
    food.x = Math.floor(getRndInteger(0, bounds.x) / 32) * 32
    food.y = Math.floor(getRndInteger(0, bounds.y / 32)) * 32
    drawSquare(food.x, food.y);
}

function growSnake() {
    snakeBody.push({
        x: snakeBody[snakeBody.length - 1].x,
        y: snakeBody[snakeBody.length - 1].y
    })
}

function checkEat() {
    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y ) {
        growSnake();
        score += 5;
        drawFood();
    }
}

function moveSnake(direction) {
    pen.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    
    let newHead = {
        x: snakeBody[0].x,
        y: snakeBody[0].y
    };

    switch(direction) {
        case "w":
            newHead.y -= cellSize;
            break;
        case "a":
            newHead.x -= cellSize;
            break;
        case "s":
            newHead.y += cellSize;
            break;
        case "d":
            newHead.x += cellSize;
            break;
        default:
            break;
    }

    newHead = checkBounds(newHead);
    if (newHead != false) {

        updatesnakeBody(newHead);
        checkEat();

        snakeBody.forEach((segment) => {
            drawSquare(segment.x, segment.y);
        })
    } else {
        die();
    }
}

document.onkeydown = (e) => {
    switch(e.key) {
        case "w":
            if (dir != directions[2]) dir = directions[0];
            break;
        case "a":
            if (dir != directions[3]) dir = directions[1];
            break;
        case "s":
            if (dir != directions[0]) dir = directions[2];
            break;
        case "d":
            if (dir != directions[1]) dir = directions[3];
            break;
        case "t":
            gameMode = (gameMode === gameModes[0]) ? gameModes[1] : gameModes[0];
        default:
            break;
    }
}

function startGame() {
    isDead = false;
    score = 0;
    snakeBody = [];
    for (let i = 0; i < newSnakeBody.length; i++) {
        snakeBody.push({
            x: newSnakeBody[i].x,
            y: newSnakeBody[i].y
        })
    }
    dir = directions[3];
    gameInterval = setInterval(() => {
        moveSnake(dir);
        drawSquare(food.x, food.y);
    }, 250);
}

window.onload = () => {
    alert("press T to toggle game mode so that you can be able to pass through walls or not");
    pen.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    pen2.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    drawGrid();
    drawFood();
    startGame();
}