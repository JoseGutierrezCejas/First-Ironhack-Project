// VARIABLES ************************************************************************************
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let score = 0;
let gravity;
let keys = {};
let gameSpeed = 3;
let isJumping = false;
let arrayManzanas = [];
let arrayTnt = [];


let player;

let loadedImages = {};
const drawScore = ()=>{
    ctx.drawImage(loadedImages.apple,35,0,20,20)
    ctx.font = "20px fantasy";
    ctx.fillStyle = "black";
    ctx.fillText(+score,65,20);
}

const imageLinks = [
  { link: "./images/background1.gif", name: "background" },
  { link: "./images/player.png", name: "player" },
  { link: "./images/apple.png", name: "apple" },
  { link: "./images/tnt.png", name: "tnt" },
  { link: "./images/score.png", name: "score" },
  { link: "./images/game over.png", name: "gameOver" },

];
let counterForLoadedImages = 0;
// MUSICA
let soundTrack = new Audio("./Crash Bandicoot Trilogy 8 Bit Medley.mp3");
soundTrack.volume = 0.3;
soundTrack.preload = "auto";
soundTrack.load();

// FUNCTIONS ************************************************************************************
const drawBackground = () => {
  ctx.drawImage(loadedImages.background, 0, 0);
};
// const drawPlayer = () =>{
//     ctx.drawImage(loadedImages.player,player.x,player.y,player.width,player.height)
// }
//const drawApple = () => {
  //ctx.drawImage(loadedImages.apple, 300, 230, 20, 20);
//};
//const drawTnt = () => {
  //ctx.drawImage(loadedImages.tnt, 500, 226, 30, 30);
//};
//const drawScore = () => {
  //ctx.drawImage(loadedImages.score, 0, 0, 30, 30);


const checkApplesCollision = ()=>{
    arrayManzanas.forEach((apple)=>{
        if (apple.x < player.x + player.width &&
            apple.x + apple.width > player.x &&
            apple.y < player.y + player.height &&
            apple.height + apple.y > player.y){
                apple.eaten = true;
                score++
                // document.getElementById('score-counter').innerText = score 
                //console.log (score)
            }
})
}

const checkTntCollision = ()=>{
    arrayTnt.forEach((tnt)=>{
        if (tnt.x <= player.x + player.width - 70 &&
            tnt.x + tnt.width >= player.x &&
            tnt.y < player.y + player.height &&
            tnt.height + tnt.y > player.y){
                endGame=true;
                 
            
            }
})
}

const loadFirstImage = ()=> {
const imagen1= new Image()
imagen1.src="./images/startbutton.png";
imagen1.onload= () =>{
    ctx.drawImage(imagen1, 0, 40);
}
}

const loadImages = () => {
  imageLinks.forEach((imagen) => {
    const img = new Image();
    img.src = imagen.link;
    img.onload = () => {
      counterForLoadedImages++;
      loadedImages[imagen.name] = img;

      //   if (imageLinks.length === counterForLoadedImages) {

      //   }
    };
  });
};

const startGame = () => {
  document.getElementById("start-button").style.display = "none";
soundTrack.play();
  player = new Player();
  loadImages();
  createApples();
  createTnt();
  updateCanvas();
};
let endGame=false;
const updateCanvas = () => {
  if (!endGame){
    if (imageLinks.length === counterForLoadedImages) {
        drawBackground();
        player.draw();
        player.update();
        checkIfInBounds ();
        updateApple(arrayManzanas);
        drawApple();
        checkApplesCollision();
        deleteApples();
        updateTnt(arrayTnt);
        drawTnt();
        checkTntCollision();
        drawScore();
      }   
  }else {
    gameOver()
 
  }


  requestAnimationFrame(updateCanvas);
};

const deleteApples =()=>{
    arrayManzanas = arrayManzanas.filter((apple)=>{
        return !apple.eaten
    })
}

const checkIfInBounds = ()=>{
    if (player.y >310){
        player.y =310
    }

    if(player.y < 0){
        player.y = 0
    }
    if (player.x >500){
        player.x =500
    }

    if(player.x < 15){
        player.x =15 
    }

}
// para que aparezcan las manzanas en movimiento
const createApples = () => {

    let createApplesIntervalID = setInterval(()=>{
        arrayManzanas.push (new Apple())
        // console.log (arrayManzanas)
    },1500)   
}
const updateApple = (arrManzanas)=>{


    arrManzanas.forEach((manzana) => {

        manzana.y += manzana.speed
    })

}

const drawApple = ()=>{
    arrayManzanas.forEach((apple)=>{
    ctx.drawImage(loadedImages.apple, apple.x, apple.y, apple.width,apple.height );

    })
}
// para que aparezcan los tnt en movimiento
const createTnt = () => {

    let createTntIntervalID = setInterval(()=>{
        arrayTnt.push(new Tnt())
        // console.log(arrayTnt)
    },2000)   
}
const updateTnt = (arrTnt)=>{


    arrTnt.forEach((tnt) => {
  
        tnt.x -= tnt.speed
    })

}

const drawTnt = ()=>{
    arrayTnt.forEach((tnt)=>{
    ctx.drawImage(loadedImages.tnt, tnt.x, tnt.y, tnt.width, tnt.height);

    })
}
const gameOver = ()=>{
    ctx.drawImage(loadedImages.gameOver,0,0,560,270)
    soundTrack.pause()

}

// CLASSES ********************************************************************************

class Player {
  constructor() {
    this.x = 0;
    this.y = 158;
    this.width = 100;
    this.height = 100;
    this.vy = 0;
    this.gravity = 15;
    this.weight = 0.17;
    this.speed = 0;
  }

  jump() {
    this.vy = -6.9;
  }

  draw() {
    ctx.drawImage(loadedImages.player, this.x, this.y, this.width, this.height);
  }

  update() {
    //actualizamos la posicion
    this.y += this.vy;
    player.x += player.speed;

    //Para cuando encuentra el suelo
    if (this.y + this.height >= canvas.height) {
      this.y = 170;
      this.vy = 0;
    }

    //Cuando la velocidad vertical es menor que la gravedad le sumamos el peso, para que baje
    if (this.vy < this.gravity) {
      this.vy += this.weight;
    }
  }
}

class Apple {
  constructor() {
    this.eaten= false;
    this.x = Math.floor(Math.random() * 560);
    this.y = 0;
    this.width = 20;
    this.height = 20;
    this.speed = 3;
  }
  draw() {}
  //update() {}
}

class Tnt {

  constructor() {
    this.x = 500;
    this.y = 226;
    this.width = 30;
    this.height = 30;
    this.touched = false;
    this.speed = 2
  }
  draw() {}
  //update() {}
}

class Score {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 30;
    this.height = 30;
  }
}

window.addEventListener("load", (event) => {
    loadFirstImage()
    // eventListeners
  document.addEventListener("keydown", function (evt) {
    if (evt.key === " ") {
      isJumping = true;
      player.jump();
    }
  });
  document.addEventListener("keyup", function (evt) {
    if (evt.key === " ") {
      isJumping = false;
    }
    
  });
  document.addEventListener('keydown',(event)=>{
    if (event.key === "ArrowRight"){
        player.speed = 8
    }else if (event.key === "ArrowLeft"){
        player.speed= -8
    }
})

document.addEventListener ('keyup',(event)=>{
    if (event.key === "ArrowRight" || event.key === "ArrowLeft"){
        player.speed = 0 
    }
})
  document.getElementById("start-button").addEventListener("click", startGame);
});
