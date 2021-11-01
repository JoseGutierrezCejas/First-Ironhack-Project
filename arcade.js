const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score;
let gravity;
let gameSpeed;
let keys = {};

// eventListeners
document.addEventListener("keydown", function (evt){
    keys[evt.code] = true;
});
document.addEventListener("keyup", function(evt){
    keys[evt.code] = false;
})


loadedImages = {}


//FUNCTIONS
const drawBackground = () =>{
    ctx.drawImage(loadedImages.background,0.5,0)
}
const drawPlayer = () =>{
    ctx.drawImage(loadedImages.player,player.x,player.y,player.width,player.height)
}
const drawApple = () =>{
    ctx.drawImage(loadedImages.apple,300,230,20,20)
}
const drawTnt = () =>{
    ctx.drawImage(loadedImages.tnt,500,226,30,30)
}
const drawScore = () =>{
    ctx.drawImage(loadedImages.score,0,0,30,30)
}

function Animate () {
    //jump
    if (keys["space"]) {
        player.jump();
    } else  {
        player.jumpTimer = 0;
    }
        player.y += player.dy;
    // gravity
    if (player.y + player.height < canvas.height) {
        player.dy += gravity;
        player.grounded = false;
    } else {
        player.dy = 0;
        player.grounded = true;
        player.y = cavnas.height - player.height;
         }
         player.y += player.dy;
         player.draw();
}

function jump () {
    if (player.grounded && player.jumpTimer==0) { 
    player.jumpTimer = 1;
    player.dy = -player.jumpForce;
    } else if (player.jumpTimer > 0 && player.jumpTimer<15) {
        player.jumpTimer++;
        player.dy = -player.jumpForce -(player.jumpTimer/50);
    }
}

//CLASSES
class Player {
    constructor () {
        this.x = 0;
        this.y =158;
        this.width = 100;
        this.height = 100;
        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = this.height;
        this.grounded = false;
        this.jumpTimer = 0;
    }
}
const player = new Player ()
class Apple {
    constructor () {
        this.x = 300;
        this.y =230;
        this.width = 20;
        this.height = 20;
    }
}
class tnt {
    constructor () {
        this.x = 500;
        this.y =226;
        this.width = 30;
        this.height = 30;
    }
}
class Score {
    constructor () {
        this.x = 0;
        this.y =0;
        this.width = 30;
        this.height = 30;
    }
}
 




const imageLinks = [ 
    {link: "./images/background1.gif", name: 'background'},
    {link: "./images/player.png", name: 'player'},
    {link: "./images/apple.png", name: 'apple'},
    {link: "./images/tnt.png", name: 'tnt'},
    {link: "./images/score.png", name: 'score'},


  ]
  
  let counterForLoadedImages = 0;
  
  imageLinks.forEach((imagen)=>{ 
    const img = new Image() 
    img.src = imagen.link 
    img.onload = ()=>{ 
      counterForLoadedImages++ 
      loadedImages[imagen.name] = img
      if(imageLinks.length === counterForLoadedImages){ 
       
      }
    }
  })
  const updateCanvas = ()=>{
      ctx.font = "20px PressStart2P-Regular";
      gameSpeed = 3;
      gravity = 1;
      score = 0;
    if(imageLinks.length === counterForLoadedImages){
        drawBackground()
        drawPlayer()
        
    }


    requestAnimationFrame(updateCanvas)
}
updateCanvas()