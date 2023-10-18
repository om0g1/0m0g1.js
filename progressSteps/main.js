const circles = document.querySelectorAll(".circle");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const progress = document.querySelector("#progress");

let steps = 1;

function updateProgres() {
    progress.style.right = `-${(100 / (circles.length - 1)) * (steps - 1)}%`;
    for (let i = 0; i < circles.length; i++) {
        if (i + 1 <= steps) {
            circles[i].classList.add("circle-active");
        } else {
            circles[i].classList.remove("circle-active");
        }
    }
}

prevBtn.onclick = () => {
    if (steps > 1) {
        steps--;
    }
    updateProgres()
}

nextBtn.onclick = () => {
    if (steps < circles.length) {
        steps++;
    }
    updateProgres()
}

updateProgres();