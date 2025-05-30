function drawCircle(ctx, position, radius, color="white"){
    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(position[0], position[1], radius, 0, Math.PI * 2)

    ctx.fill()
}

function drawLine(ctx, position, width = 4, color = 'white'){
    ctx.strokeStyle = color
    ctx.lineWidth = width
    //console.log(position)

    ctx.beginPath();

    ctx.moveTo(position[0][0], position[0][1])
    ctx.lineTo(position[1][0], position[1][1])

    ctx.stroke()
}