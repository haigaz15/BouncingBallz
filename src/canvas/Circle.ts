
export default class Circle {

    id:number;
    x:number;
    y:number;
    speed:number;
    acceleration:number;
    initialHeight:number;
    groundPosition:number;
    slidePosition:number;
    startSlide:boolean;
    tennisBall:any
    angle:number;
    angulareSpeed:number;
    dampingFactor:number;
    audio:HTMLAudioElement;

    constructor(id:number,x:number, y:number,groundPosition:number,slidePosition:number,tennisBall:any,angle:number,audio:HTMLAudioElement){
        this.id = id;
        this.x = x,
        this.y = y
        this.speed = 0
        this.initialHeight = this.y;
        this.groundPosition = groundPosition;
        this.slidePosition = slidePosition;
        this.startSlide = false
        this.tennisBall = tennisBall;
        this.audio = audio;
        this.angle= angle
        this.angulareSpeed = this.slidePosition < 0 ? -(Math.PI/10 * 100) : Math.PI/10 * 100
        this.acceleration = 980
        this.dampingFactor = 0.99
    }

    create(ctx:CanvasRenderingContext2D | null){
        if(ctx){ 
            ctx?.save()
            ctx?.translate(this.x+30,this.y+30)
            ctx?.rotate(this.angle)        
            ctx?.drawImage(this.tennisBall, -30,-30,60,60);
            ctx?.restore()
        }
        
    }

    update(canvas:HTMLCanvasElement,deltaTime:number){

        this.speed += this.acceleration*deltaTime
        this.speed *= this.dampingFactor
        this.y += this.speed*deltaTime
        
        if (this.startSlide){
            this.x+= this.slidePosition * deltaTime
            this.slidePosition*= this.dampingFactor 
            this.angulareSpeed*= this.dampingFactor - 0.01
            this.angle+=this.angulareSpeed *deltaTime
        }
        if(this.initialHeight > this.groundPosition){
            this.y = this.groundPosition
            this.speed = 0
        }
        if(this.x > canvas.width - 60){
            if(this.startSlide) {
                this.slidePosition = -this.slidePosition
                this.angulareSpeed = -this.angulareSpeed
            }
            this.x = canvas.width - 60
        }
        if(this.x < 0){
            if(this.startSlide) {
                this.slidePosition = -this.slidePosition
                this.angulareSpeed = -this.angulareSpeed
            }
            this.x = 0
        }
        if(this.y + this.speed *deltaTime  > this.groundPosition){
            this.startSlide = true
            this.speed = -1*this.speed
            this.initialHeight = this.initialHeight + 2000*deltaTime
            this.audio.play()
            if (this.audio.currentTime > 0) {
                this.audio.currentTime = 0; 
                this.audio.play(); 
            }
        }

    }

}
