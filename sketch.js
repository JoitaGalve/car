var PLAY = 1;
var END = 0;
var gameState = 3;

var bg, bgI;
var player, playerI;
var surf1, surf2;
var car1, car1I, car1G;
var car2, car2I, car2G;
var car3, car3I, car3G;
var c, cI, cG;
var score = 0
var bg1, bg1I;
var bg2, bg2I;
var play, playI;
var r, rI;
var yw, ywI;
var r1, r1I;
var death = 3
var carS;
function preload(){
  bgI = loadImage("track.jpg")
  playerI = loadImage("car5.png")
  car1I = loadImage("car1.png")
  car2I = loadImage("car3.png")
  car3I = loadImage("car4.png")
  bg1I = loadImage("car.jpg")
  playI = loadImage("play.png")
  cI = loadImage("coin.gif")
  bg2I = loadImage("bg5.png")
  rI = loadImage("restart.png")
  ywI = loadImage("win.jpg")
  r1I = loadImage("replay.png")
  carS = loadSound("car.mp3")
  chS = loadSound("checkPoint.mp3")
  ccS = loadSound("punch.mp3")
  bs = loadSound("click.mp3")
    }

function setup() {
    createCanvas(800, 600)
    bg = createSprite(400, -1000)
    bg.addImage(bgI)
    bg.scale = 1.4
    bg.velocityY = 0

    player = createSprite(400, 530)
    player.addImage(playerI)
    player.scale = 0.2

    surf1 = createSprite(40, 300, 5, 600)
    surf1.visible = false

    surf2 = createSprite(770, 300, 5, 600)
    surf2.visible = false

    bg1 = createSprite(300, 300)
    bg1.addImage(bg1I)
    bg1.scale = 0.9

    play = createSprite(500, 320)
    play.addImage(playI)
    play.scale = 0.5

    bg2 = createSprite(400, 300)
    bg2.addImage(bg2I)
    bg2.scale = 1.3
    bg2.visible = false

    r = createSprite(400, 380)
    r.addImage(rI)
    r.scale = 0.5
    r.visible = false

    yw = createSprite(400, 295)
    yw.addImage(ywI)
    yw.scale = 1.7
    yw.visible = false

    r1 = createSprite(400, 550)
    r1.addImage(r1I)
    r1.scale = 0.1
    r1.visible = false

    car1G = createGroup()
    car2G = createGroup()
    car3G = createGroup()
    cG = createGroup()
}

function draw() {
  background(0);
  player.velocityX = 0

  if(gameState===PLAY) {
  player.collide(surf1)
  player.collide(surf2)
  

  if(keyDown("RIGHT_ARROW")) {
    player.velocityX = 6
  }

  if(keyDown("LEFT_ARROW")) {
    player.velocityX = -6
  }
  if(bg.y>1100) {
    bg.y = height/2
  }
  bg.velocityY = (3 + 2* score/20)

  if(cG.isTouching(player)) {
    score+=10
    cG.destroyEach()
    chS.play()
  }

  if(player.isTouching(car1G)) {
    car1G.destroyEach()
    death-=1
    ccS.play()
  }

  if(player.isTouching(car2G)) {
    car2G.destroyEach()
    death-=1
    ccS.play()
  }

  if(player.isTouching(car3G)) {
    car3G.destroyEach()
    death-=1
    ccS.play()
  }

  if(score===100) {
  car1G.destroyEach()
  car2G.destroyEach()
  car3G.destroyEach()
  cG.destroyEach()
  bg.velocityY = 0
  player.velocityX = 0
  player.visible = false
  yw.visible = true
  r1.visible = true
  carS.stop()
  }

  if(death===0) {
    gameState = END
  }
}

if(gameState===END) {
  bg2.visible = true
  r.visible = true
  car1G.destroyEach()
  car2G.destroyEach()
  car3G.destroyEach()
  cG.destroyEach()
  bg.velocityY = 0
  player.velocityX = 0
  player.visible = false
  carS.stop()
}
 if(mousePressedOver(play) && play.visible===true) {
   Play()
   bs.play()
 }

 if(mousePressedOver(r) && r.visible===true) {
  Restart()
  bs.play()
}

if(mousePressedOver(r1) && r1.visible===true) {
  Replay()
  bs.play()
}
  Car1()
  Car2()
  Car3()
  Coin()
  drawSprites()
  fill("yellow")
  textSize(25)
  text("SCORE: "+score, 10, 30)
  fill("orange")
  textSize(25)
  text("DEATHS: "+death, 650, 30)
    
}

function Restart() {
  gameState = PLAY
  r.visible = false
  bg2.visible = false
  player.visible = true
  bg.velocityY = 3
  car1G.destroyEach()
  car2G.destroyEach()
  car3G.destroyEach()
  cG.destroyEach()
  score = 0
  death = 3
  carS.loop()
}

function Replay(){
  gameState = PLAY
  r1.visible = false
  yw.visible = false
  player.visible = true
  bg.velocityY = 3
  car1G.destroyEach()
  car2G.destroyEach()
  car3G.destroyEach()
  cG.destroyEach()
  score = 0
  death = 3
  carS.loop()
}

function Play() {
gameState = PLAY
play.visible = false
bg1.visible = false
bg.velocityY = 3
carS.loop()
bg.velocityY = (3 + 2* score/20)


}
function Car1() {
  if (frameCount % 200 === 0 && gameState===PLAY) {
    car1 = createSprite(Math.round(random(50, 1150 ),10, 10))
    car1.addImage(car1I);
    car1.scale = 1;
    car1.velocityY = (3 + 3* score/20)
    car1.lifetime = 400
    car1.depth = player.depth;
    player.depth = player.depth + 1;
    car1G.add(car1);
  }
}

function Car2() {
  if (frameCount % 400 === 0 && gameState===PLAY) {
    car2 = createSprite(Math.round(random(200, 500 ),10, 10))
    car2.addImage(car2I);
    car2.scale = 1;
    car2.velocityY = (3 + 3* score/20)
    car2.lifetime = 400
    car2.depth = player.depth;
    player.depth = player.depth + 1;
    car2G.add(car2);
  }
}

function Car3() {
  if (frameCount % 500 === 0 && gameState===PLAY) {
    car3 = createSprite(Math.round(random(200, 500 ),10, 10))
    car3.addImage(car3I);
    car3.scale = 1;
    car3.velocityY = (3 + 3* score/20)
    car3.lifetime = 400
    car3.depth = player.depth;
    player.depth = player.depth + 1;
    car3G.add(car3);
  }
}

function Coin() {
  if (frameCount % 100 === 0 && gameState===PLAY) {
    c = createSprite(Math.round(random(100, 600 ),10, 10))
    c.addImage(cI);
    c.scale = 0.4;
    c.velocityY = (3 + 2* score/20)
    c.lifetime = 400
    c.depth = player.depth;
    player.depth = player.depth + 1;
    cG.add(c);
  }
}