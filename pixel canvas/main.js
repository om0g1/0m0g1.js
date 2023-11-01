let magnification = 0.5;
let canvasRatio = {
    width: 16,
    height: 16
};
let cellSize = {
    width: 0,
    height: 0
}
let handlePan = {
    isDragging: false,
    startX: 0,
    startY: 0,
}
let penColor = "black";
const colorPicker = document.querySelector("#color-picker");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const canvasContainer = document.querySelector("#canvas-container");
const canvas = document.querySelector("#canvas");
const gridCanvas = document.querySelector("#grid-canvas");
const pen = canvas.getContext("2d");
const gridPen = gridCanvas.getContext("2d");

const canvases = [canvas, gridCanvas];

function magnifyCanvases() {
    const bounds = canvasWrapper.getBoundingClientRect();
    canvasContainer.width = (bounds.width - (bounds.width % canvasRatio.width)) * magnification;
    canvasContainer.height = (canvasContainer.width * (canvasRatio.height / canvasRatio.width));
    cellSize = {
        width: canvasContainer.width / canvasRatio.width,
        height: canvasContainer.height / canvasRatio.height
    };
    canvases.forEach((canvasItem) => {
        canvasItem.width = canvasContainer.width;
        canvasItem.height = canvasContainer.height;
    })
    drawGrid();
}

function drawGrid() {
    gridPen.clearRect(0, 0, canvas.width, canvas.height);
    gridPen.strokeStyle = "black";
    gridPen.beginPath();
    for (let x = 0; x <= canvas.width; x += cellSize.width) {
        gridPen.moveTo(x, 0);
        gridPen.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += cellSize.height) {
        gridPen.moveTo(0, y);
        gridPen.lineTo(canvas.width, y);
    }
    gridPen.stroke();
}

function drawPixel(x, y) {
    pen.beginPath();
    x -= canvas.getBoundingClientRect().left;
    y -= canvas.getBoundingClientRect().top;
    const xIndex = Math.floor(x - (x % cellSize.width));
    const yIndex = Math.floor(y - (y % cellSize.height));
    pen.fillRect(xIndex, yIndex, cellSize.width, cellSize.height);
}

colorPicker.onchange = () => {
    pen.fillStyle = colorPicker.value;
}

canvasWrapper.onwheel = (e) => {
    magnification += e.deltaY * -0.001;
    if (magnification < 0.05) magnification = 0.05;
    else if (magnification > 1.5) magnification = 1.5;
    magnifyCanvases();
}

canvasWrapper.onmousedown = (e) => {
    if (e.button == 0) {
        drawPixel(e.clientX, e.clientY);
    } else if (e.button == 1) {
        handlePan.isDragging = true;
        handlePan.startX = e.clientX;
        handlePan.startY = e.clientY;
    }
}

canvasWrapper.onmousemove = (e) => {
    if (e.buttons == 1) {
        drawPixel(e.clientX, e.clientY);
    } else if (handlePan.isDragging) {
        canvasWrapper.style.cursor = "grab";
        const deltaX = e.clientX - handlePan.startX;
        const deltaY = e.clientY - handlePan.startY;
        canvasContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }
}

canvasWrapper.onmouseup = (e) => {
    canvasWrapper.style.cursor = "auto";
    handlePan.isDragging = false;
}

window.onload = () => {
    pen.fillStyle = colorPicker.value;
    magnifyCanvases();
}