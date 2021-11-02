// VARIABLES ************************************************************************************
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
let gravity;
let keys = {};
let gameSpeed = 3;
let isJumping = false;

let player;

let loadedImages = {};

const imageLinks = [
  { link: "./images/background1.gif", name: "background" },
  { link: "./images/player.png", name: "player" },
  { link: "./images/apple.png", name: "apple" },
  { link: "./images/tnt.png", name: "tnt" },
  { link: "./images/score.png", name: "score" },
];
let counterForLoadedImages = 0;
// MUSICA
let soundTrack = new Audio("");
soundTrack.volume = 0.3;
soundTrack.preload = "auto";
soundTrack.load();

// FUNCTIONS ************************************************************************************
const drawBackground = () => {
  ctx.drawImage(loadedImages.background, 0.5, 0);
};
// const drawPlayer = () =>{
//     ctx.drawImage(loadedImages.player,player.x,player.y,player.width,player.height)
// }
const drawApple = () => {
  ctx.drawImage(loadedImages.apple, 300, 230, 20, 20);
};
const drawTnt = () => {
  ctx.drawImage(loadedImages.tnt, 500, 226, 30, 30);
};
const drawScore = () => {
  ctx.drawImage(loadedImages.score, 0, 0, 30, 30);
};

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

  player = new Player();
  loadImages();

  //crear player
  //llamar a funcion de crear array obstaculos
  //...
  //llamar al loop del juego updateCanvas()
  updateCanvas();
};

const updateCanvas = () => {
  //   ctx.font = "20px PressStart2P-Regular";

  if (imageLinks.length === counterForLoadedImages) {
    drawBackground();
    player.draw();
    player.update();
    checkIfInBounds ();
    


    // arrayManzanas.forEach((manzana) => {
    //   manzana.draw();
    //   manzana.update();
    // });
  }

  requestAnimationFrame(updateCanvas);
};

const checkIfInBounds = ()=>{
    if (player.y >300){
        player.y =300
    }

    if(player.y < 5){
        player.y = 5
    }

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
    this.x = 300;
    this.y = 230;
    this.width = 20;
    this.height = 20;
  }
  draw() {}
  update() {}
}

class tnt {
  constructor() {
    this.x = 500;
    this.y = 226;
    this.width = 30;
    this.height = 30;
  }
  draw() {}
  update() {}
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

  document.getElementById("start-button").addEventListener("click", startGame);
});
