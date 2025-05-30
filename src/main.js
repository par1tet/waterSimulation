circles = []

let isMouseDown = false;

function updateCircles(position, size){
    circles.push(new Circle(position, size, circles.length))
}

canvas.addEventListener('mousedown', e => {
    isMouseDown = true;
});

canvas.addEventListener('mousemove', e => {
    if (isMouseDown) {
        let sizeCircle = 15
        updateCircles([e.clientX, e.clientY], sizeCircle)
        updateCircles([e.clientX - 1, e.clientY], sizeCircle)
        updateCircles([e.clientX - 1, e.clientY - 1], sizeCircle)
        updateCircles([e.clientX, e.clientY - 1], sizeCircle)
        updateCircles([e.clientX + 1, e.clientY], sizeCircle)
        updateCircles([e.clientX + 1, e.clientY + 1], sizeCircle)
        updateCircles([e.clientX, e.clientY + 1], sizeCircle)
        updateCircles([e.clientX - 1, e.clientY + 1], sizeCircle)
        updateCircles([e.clientX + 1, e.clientY - 1], sizeCircle)
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false
});

dTime = 0.01

setInterval(() => {
    ctx.clearRect(0,0,WIDTH, HEIGHT)

    for(let i = 0;i != circles.length;i++){
        circles[i].update(dTime, circles)
        circles[i].drawFunc(ctx)
    }
    
}, dTime * 1000)