circles = []

let isMouseDown = false;

canvas.addEventListener('mousedown', e => {
    isMouseDown = true;
});

canvas.addEventListener('mousemove', e => {
    if (isMouseDown) {
        let sizeCircle = 5
        circles.push(new Circle([e.clientX - 1, e.clientY - 1], sizeCircle))
        circles.push(new Circle([e.clientX, e.clientY - 1], sizeCircle))
        circles.push(new Circle([e.clientX - 1, e.clientY], sizeCircle))
        circles.push(new Circle([e.clientX + 1, e.clientY + 1], sizeCircle))
        circles.push(new Circle([e.clientX, e.clientY + 1], sizeCircle))
        circles.push(new Circle([e.clientX + 1, e.clientY], sizeCircle))
        circles.push(new Circle([e.clientX, e.clientY], sizeCircle))
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