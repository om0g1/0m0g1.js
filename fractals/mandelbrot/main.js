const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 800;
const height = canvas.height = 800;

const maxIterations = 1000;

function mandelbrot(x, y) {
    let xn = 0;
    let yn = 0;

    for (let i = 0; i < maxIterations; i++) {
        const xn1 = Math.sqrt(xn*xn - yn*yn + x);
        const yn1 = 2 * xn * yn + y;

        if (xn1 === xn && yn1 === yn) {
            return i; // Point is likely in the set
        }

        xn = xn1;
        yn = yn1;
    }

    return maxIterations; // Point is not in the set
}

function drawMandelbrot() {
    const minReal = -2.0;
    const maxReal = 1.0;
    const minImaginary = -1.5;
    const maxImaginary = 1.5;
    const realFactor = (maxReal - minReal) / width;
    const imaginaryFactor = (maxImaginary - minImaginary) / height;

    for (let xPixel = 0; xPixel < width; xPixel++) {
        for (let yPixel = 0; yPixel < height; yPixel++) {
            const x = minReal + xPixel * realFactor;
            const y = minImaginary + yPixel * imaginaryFactor;
            const iterations = mandelbrot(x, y);

            if (iterations === maxIterations) {
                ctx.fillStyle = '#000';
            } else {
                const color = Math.floor((iterations / maxIterations) * 255);
                ctx.fillStyle = `rgb(${color},${color},${color})`;
            }

            ctx.fillRect(xPixel, yPixel, 1, 1);
        }
    }
}

drawMandelbrot();
