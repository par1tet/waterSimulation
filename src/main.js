circles = []

canvas.onclick = e => {
    circles.push(new Circle([e.clientX, e.clientY], 4))
}

dTime = 0.01

setInterval(() => {
    ctx.clearRect(0,0,WIDTH, HEIGHT)

    for(let i = 0;i != circles.length;i++){
        circles[i].update(dTime, circles)
        circles[i].drawFunc(ctx)
    }
    
}, dTime * 1000)