const container = document.querySelector("#container");
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

function createSquares() {
    for (let i = 0; i < 504; i++) {
        const square = document.createElement("div");
        square.classList.add("tile");
        square.onmouseover = () => {
            const color = colors[Math.floor(Math.random() * 24)];
            square.style.backgroundColor = `${color}`;
            square.style.boxShadow = `0 0 2px ${color},
                                    0 0 10px ${color}`;
        }
        square.onmouseleave = () => {
            square.style.backgroundColor = `#1d1d1d`;
            square.style.boxShadow = `none`;
        }
        container.appendChild(square);
    }
}

createSquares();