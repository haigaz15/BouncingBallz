
import RenderCircle from "./canvas/RenderCircle"
import tennisBall from "./assets/—Pngtree—tennis ball_9017031.png"
import bounceSound from "./assets/zapsplat_sport_tennis_ball_single_bounce_001_99454.mp3"
const img = new Image();
const audio = new Audio();
img.src = tennisBall;
audio.src = bounceSound;
audio.volume = 0.3
const render = new RenderCircle(img,performance.now(),audio)

render.render(performance.now())
