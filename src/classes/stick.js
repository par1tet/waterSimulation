class Stick{
    constructor(position, width, color){
        this.position = position
        this.width = width
        this.color = color
    }

    drawFunc(ctx){
        drawLine(ctx, this.position, this.width, this.color)
    }
}