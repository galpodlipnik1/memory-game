const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Tile {
  constructor(x, y, picture) {
    this.x = x;
    this.y = y;
    this.picture = picture;
    this.size = 140;
    this.revealed = false;
  }

  drawDown(ctx) {
    let img = new Image();
    img.src = './images/question-mark.png';
    ctx.fillStyle = "white";
    
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  drawUp(ctx) {
    let img = new Image();
    img.src = this.picture;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  is_selected(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.size &&
      y >= this.y &&
      y <= this.y + this.size
    );
  }
}

// helper functions
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

let tiles = [];
let pictures = [
  "./images/aljazek.png",
  "./images/koalica.png",
  "./images/konjicek.png",
  "./images/kravica.png",
  "./images/levcek.jpg",
  "./images/medvedek.png",
  "./images/ovcka.png",
  "./images/prasicek.png",
  "./images/zabica.png",
  "./images/zirafica.png",
  "./images/aljazek.png",
  "./images/koalica.png",
  "./images/konjicek.png",
  "./images/kravica.png",
  "./images/levcek.jpg",
  "./images/medvedek.png",
  "./images/ovcka.png",
  "./images/prasicek.png",
  "./images/zabica.png",
  "./images/zirafica.png",
];
let shuffledPictures = shuffle(pictures);
let flippedTiles = [];
let clickedTile = 0;

// create tiles
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 4; j++) {
    tiles.push(new Tile(i * 150, j * 150, shuffledPictures.pop()));
  }
}

function draw() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].revealed === false) {
      tiles[i].drawDown(ctx);
    } else {
      tiles[i].drawUp(ctx);
    }
  }
}

function update() {
  console.log(clickedTile);
  if (flippedTiles.length === 2) {
    let first = flippedTiles[0];
    let second = flippedTiles[1];

    if (tiles[first].color === tiles[second].color) {
      flippedTiles = [];
      clickedTile = 0;
    }

    if (tiles[first].color !== tiles[second].color) {
      setTimeout(function () {
        tiles[first].revealed = false;
        tiles[second].revealed = false;
        clickedTile = 0;
      }, 1500);
    }
    flippedTiles = [];
  }
}

function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  for (let i = 0; i < tiles.length; i++) {
    if (
      clickedTile <= 1 &&
      tiles[i].is_selected(mouseX, mouseY) &&
      tiles[i].revealed !== true
    ) {
      tiles[i].revealed = true;
      flippedTiles.push(i);
      clickedTile++;
    }
  }
});

gameLoop();
