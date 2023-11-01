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
let tool = "pen";
let imageMap = new Map();
const colorPicker = document.querySelector("#color-picker");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const canvasContainer = document.querySelector("#canvas-container");
const canvas = document.querySelector("#canvas");
const gridCanvas = document.querySelector("#grid-canvas");
const pen = canvas.getContext("2d");
const gridPen = gridCanvas.getContext("2d");

const canvases = [canvas, gridCanvas];

function switchTool(Tool) {
    tool = Tool;
    // if (tool == "pen") {canvas.style.cursor = "url('assets/img/tools/pen.png'), auto"}
    // else if (tool == "erasor") {canvas.style.cursor = "url('assets/img/tools/erasor.png'), auto"}
}

function initializeImageMap() {
    for (let y = 0; y < canvas.height; y += canvasRatio.width) {
        for (let x = 0; x < canvas.width; x += canvasRatio.height) {
            const pixelIndex = getIndexOnImage(x, y);
            imageMap.set(`${pixelIndex.x}, ${pixelIndex.y}`, {x: pixelIndex, y: pixelIndex.y, color: "#ffffff"});
            // console.log([pixelIndex.x, pixelIndex.y]);
        }
    }
}

function getIndexOnImage(x, y) {
    return {
        x: Math.floor((x / canvasRatio.width)),
        y: Math.floor((y / canvasRatio.height))
    }
}

function getIndexOnCanvas(x, y) {
    return {
        x: x * cellSize * canvasRatio.width,
        y: y * cellSize * canvasRatio.height
    }
}

function handleChangeImageMap(x, y, color) {
    const pixelIndex = getIndexOnImage(x, y);
    imageMap.set(`${pixelIndex.x}, ${pixelIndex.y}`, {x, y, color});
}

function redrawImage() {
    for (const [index, pixel] of imageMap) {
    // imageMap.forEach((index, pixel) => {
      const pixelPostion = getIndexOnImage(pixel.x, pixel.y);
      console.log([pixel.x, pixel.y, pixel.color]);
      pen.fillStyle = pixel.color;
      pen.fillRect(pixelPostion.x, pixelPostion.y, cellSize, cellSize);  

    }//)
    pen.fillStyle = penColor;
}

function magnifyCanvases() {
    const bounds = canvasWrapper.getBoundingClientRect();
    canvasContainer.width = (bounds.width - (bounds.width % canvasRatio.width)) * magnification;
    canvasContainer.height = (canvasContainer.width * (canvasRatio.height / canvasRatio.width));
    cellSize = canvasContainer.width / canvasRatio.width;
    canvases.forEach((canvasItem) => {
        canvasItem.width = canvasContainer.width;
        canvasItem.height = canvasContainer.height;
    })
    redrawImage();
    drawGrid();
}

function drawGrid() {
    gridPen.clearRect(0, 0, canvas.width, canvas.height);
    gridPen.strokeStyle = "black";
    gridPen.beginPath();
    for (let x = 0; x <= canvas.width; x += cellSize) {
        gridPen.moveTo(x, 0);
        gridPen.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += cellSize) {
        gridPen.moveTo(0, y);
        gridPen.lineTo(canvas.width, y);
    }
    gridPen.stroke();
}

function getIndexes(x, y) {
    x -= canvas.getBoundingClientRect().left;
    y -= canvas.getBoundingClientRect().top;
    return {
        x: Math.floor(x - (x % cellSize)),
        y: Math.floor(y - (y % cellSize))
    }
}

function handleDraw(x, y) {
    const position = getIndexes(x, y);
    if (tool == "pen") {
        drawPixel(position.x, position.y);
    } else if (tool == "erasor") {
        clearPixel(position.x, position.y);
    }
}

function clearPixel(x, y) {
    pen.clearRect(x, y, cellSize, cellSize);
    handleChangeImageMap(x, y, "#ffffff");
}

function drawPixel(x, y) {
    pen.beginPath();
    pen.fillRect(x, y, cellSize, cellSize);
    handleChangeImageMap(x, y, penColor);
}

colorPicker.onchange = () => {
    pen.fillStyle = colorPicker.value;
}

// canvasWrapper.onwheel = (e) => {
//     magnification += e.deltaY * -0.001;
//     if (magnification < 0.05) magnification = 0.05;
//     else if (magnification > 1.5) magnification = 1.5;
//     magnifyCanvases();
// }

canvasWrapper.onmousedown = (e) => {
    if (e.button == 0) {
        handleDraw(e.clientX, e.clientY);
    } else if (e.button == 1) {
        handlePan.isDragging = true;
        handlePan.startX = e.clientX;
        handlePan.startY = e.clientY;
    }
}

canvasWrapper.onmousemove = (e) => {
    if (e.buttons == 1) {
        handleDraw(e.clientX, e.clientY);
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
    initializeImageMap();
}