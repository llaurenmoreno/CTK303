

let coins = [];
let score = 0;

let playerX = 50;
let playerY = 50;

let dogImg;
let boneImg;
let bgImg;

let minecraftFont;

let replayButton;

function preload() {
  dogImg = loadImage("untamed.png");

  boneImg = loadImage("bone.png");

  bgImg = loadImage("minecraftbckgrnd2.jpg");

}


function setup() {
  createCanvas(windowWidth,windowHeight);

  spawnBones();

  // replay button
  replayButton = createButton("Replay?");
  replayButton.position(width / 2 - 40, height / 2 + 60);
  replayButton.hide();

  replayButton.mousePressed(() => {
    score = 0;
    spawnBones();
    replayButton.hide();
    loop();
  });
}


function spawnBones() {
  coins = [];
  for (let i = 0; i < 10; i++) {
    coins.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 60
    });
  }
}

function draw() {
  image(bgImg,width / 2, height / 2, width, height);

  // smooth follow mouse
  playerX += (mouseX - playerX) * 0.1;
  playerY += (mouseY - playerY) * 0.1;

  // draw dog
  imageMode(CENTER);
  image(dogImg, playerX, playerY, 90, 90);

  // draw bones + collision
  for (let i = coins.length - 1; i >= 0; i--) {
    image(boneImg, coins[i].x, coins[i].y, coins[i].size, coins[i].size);

    let d = dist(playerX, playerY, coins[i].x, coins[i].y);

    if (d < 30) {
      coins.splice(i, 1);
      score++;
    }
  }

  // text
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);

  if (coins.length > 0) {
    text(score, width / 2, height / 2);
  } else {
    text("you win!", width / 2, height / 2);
    replayButton.show();
    noLoop();
  }
}
