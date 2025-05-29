class Circle {
    constructor(position, radius){
        this.position = position
        this.radius = radius
        this.speed = [0,0]
        this.acceleration = [0,195]
    }

    drawFunc(ctx){
        drawCircle(ctx, this.position, this.radius)
    }

    update(dTime, others){
        this.speed[0] += this.acceleration[0] * dTime
        this.speed[1] += this.acceleration[1] * dTime

        this.position[0] += this.speed[0] * dTime
        this.position[1] += this.speed[1] * dTime

        console.log(this.position[1])

        if(this.position[1] + this.radius > HEIGHT){
            this.speed[1] = -0.1 * (this.speed[1])
            this.position[1] = HEIGHT - this.radius
        }

        this.collision(others)
    }

    collision(others){
        for(let i = 0;i != others.length;i++){
            if(others[i].position[0] == this.position[0] && others[i].position[1] == this.position[1]){
                continue
            }

            let dist = Math.sqrt((others[i].position[0] - this.position[0])**2 + (others[i].position[1] - this.position[1])**2)

            if(dist <= (this.radius + others[i].radius)){
                let perpTang = [
                    -others[i].position[0] + this.position[0],
                    -others[i].position[1] + this.position[1]
                ]

                let perpTangPower = Math.sqrt((perpTang[0])**2 + (perpTang[1])**2)

                let perpTangNormal = [
                    perpTang[0] / perpTangPower,
                    perpTang[1] / perpTangPower
                ]

                this.speed = [
                    -.2 * (this.speed[0] -(2 * perpTangNormal[0])),
                    -.2 * (this.speed[1] -(2 * perpTangNormal[1])),
                ]

                let resolveDist = dist - (this.radius + others[i].radius)

                this.position = [
                    this.position[0] - (perpTangNormal[0] * (1/2) * resolveDist),
                    this.position[1] - (perpTangNormal[1] * (1/2) * resolveDist)
                ]

                others[i].position = [
                    others[i].position[0] + (perpTangNormal[0] * (1/2) * resolveDist),
                    others[i].position[1] + (perpTangNormal[1] * (1/2) * resolveDist)
                ]
            }
        }
    }
}