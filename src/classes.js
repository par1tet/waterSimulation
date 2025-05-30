class Circle {
    constructor(position, radius, index){
        this.position = position
        this.radius = radius
        this.speed = [0,0]
        this.acceleration = [0,895]
        this.index = index
    }

    drawFunc(ctx){
        drawCircle(ctx, this.position, this.radius)
    }

    update(dTime, others){

        this.collision(dTime, others)
        this.speed[0] += this.acceleration[0] * dTime
        this.speed[1] += this.acceleration[1] * dTime

        this.position[0] += this.speed[0] * dTime
        this.position[1] += this.speed[1] * dTime

        if(this.position[1] + this.radius > HEIGHT){
            this.speed[1] = -0.001 * (this.speed[1])
            this.position[1] = HEIGHT - this.radius
        }

    }

    collision(dTime, others){
        for(let i = 0;i != others.length;i++){
            if(i >= this.index){
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
                    this.speed[0] + -.001 * (this.speed[0] -(2 * perpTangNormal[0])) * dTime,
                    this.speed[1] + -.001 * (this.speed[1] -(2 * perpTangNormal[1])) * dTime,
                ]

                others[i].speed = [
                    others[i].speed[0] + -.001 * (others[i].speed[0] -(2 * perpTangNormal[0])) * dTime,
                    others[i].speed[1] + -.001 * (others[i].speed[1] -(2 * perpTangNormal[1])) * dTime,
                ]

                let resolveDist = dist - (this.radius + others[i].radius)

                this.position = [
                    this.position[0] - (perpTangNormal[0] * (1/2) * resolveDist)* 1,
                    this.position[1] - (perpTangNormal[1] * (1/2) * resolveDist)* 1
                ]

                others[i].position = [
                    others[i].position[0] + (perpTangNormal[0] * (1/2) * resolveDist) * 1,
                    others[i].position[1] + (perpTangNormal[1] * (1/2) * resolveDist)* 1
                ]
            }
        }
    }
}