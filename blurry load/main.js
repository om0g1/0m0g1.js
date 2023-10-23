let percentage = 0;
const bg = document.querySelector("#bg");
const counterWrapper = document.querySelector("#counter-wrapper");
const counter = document.querySelector("#counter");

setInterval(() => {
    if (percentage <= 100) {
        bg.style.filter = `blur(${30 * (100 - percentage) * 0.01}px)`;
        counterWrapper.style.opacity = `${(100 - percentage) * 0.01}`;
        counter.innerHTML = `${percentage}%`
        percentage += 1
    }
}, 30);