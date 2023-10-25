const hoverBoard = document.querySelector("#hover-board");

function createTiles() {
    for (let y = 0; y < hoverBoard.clientHeight; y += 30) {
        for (let x = 0; x < hoverBoard.clientWidth; x += 30) {
            const square = document.createElement("div");
            square.classList.add("tile");
            hoverBoard.appendChild(square);
        }
    }
}

createTiles();