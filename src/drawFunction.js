function drawCircle(ctx, position, radius, color="white"){
    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(position[0], position[1], radius, 0, Math.PI * 2)

    ctx.fill()
}