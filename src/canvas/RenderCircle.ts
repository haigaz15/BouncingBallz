import Circle from "./Circle"

export default class RenderCircle{

    x!:number;
    y!:number;
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D | null
    count:number = 0;
    ballz:Circle[] = [];
    tennisBall:any;
    lastTime:number;
    audio:HTMLAudioElement;

    constructor(tennisBall:any,lastTime:number,audio:HTMLAudioElement){
      this.canvas = document.getElementById("canvas") as HTMLCanvasElement
      this.ctx = this.canvas.getContext("2d")
      this.canvas.width = window.innerWidth
      this.canvas.height =window.innerHeight
      this.tennisBall = tennisBall
      this.audio = audio
      this.canvas.addEventListener('click',(event:MouseEvent)=>{
         const rect = this.canvas.getBoundingClientRect();
         this.x = event.clientX - rect.left;
         this.y = event.clientY - rect.top;
         const ballInitialPosition = this.canvas.height - 60
         const ballEndPostion = this.canvas.height - (this.canvas.height < 600 ? 70 : 100)  
         const directionOfSlide = [100,-100,200,-200,300,-300]
         const angle = 0
         const circle  = new Circle(
            this.count+=1,
            this.x,
            this.y,
            Math.floor(Math.random() * (ballEndPostion - ballInitialPosition) + ballInitialPosition),
            directionOfSlide[Math.floor(Math.random()*directionOfSlide.length)],
            this.tennisBall,
            angle,
            audio,
         );
         this.ballz.push(circle);
      })
      this.lastTime = lastTime
      this.render = this.render.bind(this)
    }

     render(currentTime:number){
      const deltaTime = (currentTime - this.lastTime)/1000 ;
      //console.log(deltaTime)
      // if (deltaTime > 1000/100) {
         this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)
         this.ballz.forEach((ball) =>{
            ball.create(this.ctx)
            ball.update(this.canvas,deltaTime)
         })
         
      // }
         this.lastTime = currentTime
         requestAnimationFrame(this.render)
     }

}