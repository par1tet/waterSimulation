class Circle {
    constructor(position, radius, index, color = 'cyan'){
        this.position = position
        this.radius = radius
        this.speed = [0,0]
        this.acceleration = [0,980]
        this.index = index
        this.color = color
        this.tempColor = this.color
    }

    drawFunc(ctx){
        drawCircle(ctx, this.position, this.radius, this.color)
    }

    update(dTime, others, sticks){
        this.stickCollision(dTime, sticks)

        this.speed[0] += this.acceleration[0] * dTime
        this.speed[1] += this.acceleration[1] * dTime

        this.position[0] += this.speed[0] * dTime
        this.position[1] += this.speed[1] * dTime

        this.collision(dTime, others)
        if(this.position[1] + this.radius > HEIGHT){
            this.speed[1] = -0.001 * (this.speed[1])
            this.position[1] = HEIGHT - this.radius
        }

        if(this.position[1] - this.radius < 0){
            this.speed[1] = -0.001 * (this.speed[1])
            this.position[1] = this.radius
        }

        if(this.position[0] - this.radius < 0){
            this.speed[0] = -0.001 * (this.speed[0])
            this.position[0] = this.radius
        }

        if(this.position[0] + this.radius > WIDTH){
            this.speed[0] = -0.001 * (this.speed[0])
            this.position[0] = WIDTH - this.radius
        }

        this.stickCollision(dTime, sticks)
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

                let viscosity = 0.5

                this.speed = [
                    this.speed[0] + -viscosity * (this.speed[0] -(2 * perpTangNormal[0])) * dTime,
                    this.speed[1] + -viscosity * (this.speed[1] -(2 * perpTangNormal[1])) * dTime,
                ]

                others[i].speed = [
                    others[i].speed[0] + -viscosity * (others[i].speed[0] -(-2 * perpTangNormal[0])) * dTime,
                    others[i].speed[1] + -viscosity * (others[i].speed[1] -(-2 * perpTangNormal[1])) * dTime,
                ]

                let resolveDist = dist - (this.radius + others[i].radius)
                let adv = 0

                this.position = [
                    this.position[0] - ((perpTangNormal[0] + adv) * (1/2) * resolveDist),
                    this.position[1] - ((perpTangNormal[1] + adv) * (1/2) * resolveDist)
                ]

                others[i].position = [
                    others[i].position[0] + ((perpTangNormal[0] + adv) * (1/2) * resolveDist),
                    others[i].position[1] + ((perpTangNormal[1] + adv) * (1/2) * resolveDist)
                ]
            }
        }
    }

    stickCollision(dTime, sticks){
        let f = -this.position[1]
        let g = -this.position[0]
        let b = 1
        let a = undefined
        let k = undefined
        let isCollision = false
        let r = this.radius

        for(let i = 0;i != sticks.length;i++){
            a = (sticks[i].position[1][1] - sticks[i].position[0][1]) / (sticks[i].position[1][0] - sticks[i].position[0][0])
            k = sticks[i].position[0][1] - a*sticks[i].position[0][0]
            
            let poly1 = (b**2)*(g**2) + (k + b*f)**2 - (b**2)*(r**2)
            let Discriminant = 4*((b**2)*g + a*k + a*b*f)**2 - (4*((a**2) + (b**2))) * poly1

            if(Discriminant >= 0){
                let polyX1 = -2*((b**2)*g + a*k + a*b*f)
                let polyX2 = 2*(a**2 + b**2)

                let x1 = (polyX1 + Math.sqrt(Discriminant)) / polyX2
                let x2 = (polyX1 - Math.sqrt(Discriminant)) / polyX2

                let y1 = (a*x1 + k)/b
                let y2 = (a*x2 + k)/b

                let minX = Math.min(sticks[i].position[0][0], sticks[i].position[1][0])
                let maxX = Math.max(sticks[i].position[0][0], sticks[i].position[1][0])

                let minY = sticks[i].position[1][1]
                let maxY = sticks[i].position[0][1]

                if(minX == sticks[i].position[0][0]){
                    minY = sticks[i].position[0][1]
                    maxY = sticks[i].position[1][1]
                }

                if (minX <= x1 && x1 <= maxX ||
                    minX <= x2 && x2 <= maxX){
                    isCollision = true

                    let stickForce = Math.sqrt((maxX - minX)**2 + (maxY - minY)**2)
                    let directionStick = [
                        (maxX - minX) / stickForce,
                        (maxY - minY) / stickForce,
                    ]

                    let normal = [
                        -(directionStick[1]),
                        (directionStick[0])
                    ]

                    let aAverage = [
                        (Math.abs(x1 + x2)) / 2,
                        (Math.abs(y1 + y2)) / 2,
                    ]

                    let d = [
                        this.position[0] - aAverage[0], 
                        this.position[1] - aAverage[1],
                    ]

                    let dLen = Math.sqrt(d[0] ** 2 + d[1] ** 2)
                    let dDir = [
                        d[0] / dLen,
                        d[1] / dLen,
                    ]

                    let moveVector = [
                        dDir[0] * (this.radius - dLen),
                        dDir[1] * (this.radius - dLen)
                    ]

                    console.log(moveVector)
                    console.log(d)

                    this.position = [
                        this.position[0] + moveVector[0],
                        this.position[1] + moveVector[1],
                    ]

                    this.speed = [
                        1 * (this.speed[0] - 2 * (scalarProduct(this.speed, normal)) * normal[0]),
                        1 * (this.speed[1] - 2 * (scalarProduct(this.speed, normal)) * normal[1]),
                    ]
                }
            }
        }

        if (isCollision){
            this.color = 'cyan'
        }else {
            this.color = this.tempColor
        }
    }
}