circles = []
sticks = []

let isMouseDown = false;
let startPos = [0,0]

function updateCircles(position, size){
    circles.push(new Circle(position, size, circles.length))
}

canvas.addEventListener('mousedown', e => {
    if (e.button === 2 || e.which === 3) {
        startPos = [e.clientX, e.clientY]
    }else{
        isMouseDown = true;
    }
});

canvas.addEventListener('mousemove', e => {
    if (isMouseDown) {
        let sizeCircle = 15
        let d = 40;
        updateCircles([e.clientX, e.clientY], sizeCircle)
        updateCircles([e.clientX - d, e.clientY], sizeCircle)
        updateCircles([e.clientX - d, e.clientY - d], sizeCircle)
        updateCircles([e.clientX, e.clientY - d], sizeCircle)
        updateCircles([e.clientX + d, e.clientY], sizeCircle)
        updateCircles([e.clientX + d, e.clientY + d], sizeCircle)
        updateCircles([e.clientX, e.clientY + d], sizeCircle)
        updateCircles([e.clientX - d, e.clientY + d], sizeCircle)
        updateCircles([e.clientX + d, e.clientY - d], sizeCircle)
    }
});

canvas.addEventListener('mouseup', e => {
    if (e.button === 2 || e.which === 3) {
        sticks.push(new Stick([startPos, [e.clientX, e.clientY]], 4, 'white'))
    }else{
        isMouseDown = false
    }
});

canvas.addEventListener("contextmenu", e => {
    e.preventDefault()
})

dTime = 0.01

setInterval(() => {
    ctx.clearRect(0,0,WIDTH, HEIGHT)

    for(let i = 0;i != circles.length;i++){
        circles[i].update(dTime, circles)
        circles[i].drawFunc(ctx)
    }
    
    for(let i = 0;i != sticks.length;i++){
        sticks[i].drawFunc(ctx)
    }
}, dTime * 1000)