let currentPlayer = "x";
let board = [["","",""],["","",""],["","",""]];
const canvas = document.querySelector("#game-board");
const pen = canvas.getContext("2d");

function drawBoard() {
    const cellSize = canvas.width / 3;
    
    pen.lineWidth = 2;
    pen.beginPath();
    for (let x = cellSize; x < canvas.width; x += cellSize) {
        pen.moveTo(x, 0);
        pen.lineTo(x, canvas.height);
    }
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        pen.moveTo(0, y);
        pen.lineTo(canvas.width, y);
    }
    pen.stroke();
}

function drawX(col, row) {
    pen.lineWidth = 4;

    pen.beginPath();
    pen.moveTo(col * 100 + 10, row * 100 + 10);
    pen.lineTo((col + 1) * 100 - 10, (row + 1) * 100 - 10);
    pen.moveTo((col + 1) * 100 - 10, row * 100 + 10);
    pen.lineTo(col * 100 + 10, (row + 1) * 100 - 10);
    pen.stroke();

}

function drawO(col, row) {
    pen.lineWidth = 4;
    pen.beginPath();
    pen.arc(col * 100 + 50, row * 100 + 50, 40, 0, 2 * Math.PI);
    pen.stroke();
}

function checkWin(col, row) {
    const player = board[row][col];
    
    //check row
    if (board[row].every((cell) => cell === player)) return true;
    //check column
    if (board.every((row) => row[col] === player)) return true;
    //check diagonal
    if (row === col && board.every((row, i) => row[i] === player)) return true;
    if (row + col === 2 && board.every((row, i) => row[2 - i] === player)) return true;

    return false;
}

function checkDraw() {
    return board.every((row) => row.every((cell) => cell !== ""));
}

function resetBoard() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    board = [["","",""],["","",""],["","",""]];
    drawBoard();
}

function makeMove(col, row) {
    if (board[row][col] == "") {
        board[row][col] = currentPlayer;
        
        if (currentPlayer == "x") {
            drawX(col, row);
        } else {
            drawO(col, row);
        }

        setTimeout(() => {if (checkWin(col, row)) {
            {alert(`Player ${currentPlayer} won`);
                resetBoard();}
            } else if (checkDraw()) {
                alert(`It's a draw`);
                resetBoard();
            } else {
                currentPlayer = (currentPlayer === "x") ? "o" : "x";
            }
        }, 20);
    }
}

canvas.onmousedown = (e) => {
    if (e.button == 0) {
        const rect = canvas.getBoundingClientRect();
        const col = Math.floor((e.clientX - rect.left) / 100);
        const row = Math.floor((e.clientY - rect.top) / 100);
        console.log(col, row);
        makeMove(col, row);
    }
}

drawBoard();