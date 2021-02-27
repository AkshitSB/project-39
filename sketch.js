var player , player_running;
var berry ,berryImage, obstacle, obstacleImage, ground, sun;
var berryGroup, obstacleGroup, sunImage, playerImage;
var score = 0;
var surivalTime = 0;
var gameState = "play";


function preload(){
	obstacleImage = loadImage("Cactus gif.gif");
  sunImage = loadImage("Sun Gif.gif");
	playerImage = loadImage("Running person Gif.gif");

}


function setup() {
  createCanvas(600,400);
  console.log(height);
  //creates mnkey sprite
  player = createSprite(80,height - 300,20,50);
  player.shapeColor = "red";
  player.addImage(playerImage);
  player.scale = 0.2;

  sun = createSprite(500,100,100,100);
  sun.shapeColor = "yellow";
  sun.addImage(sunImage);
  sun.scale = 0.4;

  //creates groudn sprite
  ground = createSprite(600,400,1000,100);
  ground.x = ground.width/2;
  ground.shapeColor="yellow";
  ground.velocityX=-4;

  //creates a group
  obstacleGroup = new Group();
  berryGroup = new Group();

}




function draw() {
  background("cyan");

  if(gameState === "play"){
  // assigns jump function for main sprite
    player.velocityY = player.velocityY + 0.4;
  
     if((touches.length > 0 || keyDown("space"))&& player.y >= height-90){ 
      player.velocityY = -12;
       touches = [];
    }
  //ground will reset
   if(ground.x<200) {
    ground.x=ground.width/2;
  }
  // assighn land for main sprite to move on
  player.collide(ground);
  //calling the function
  createObstacles();
  createberrys();

  if (player.isTouching(berryGroup)){
    berryGroup.destroyEach();
    score=score+2;
  }

  if(obstacleGroup.isTouching(player) || player.y > 600){
    player.destroy();
    score = 0;
    survivalTime = 0;   
    gameState = ("end");
  } 

  drawSprites();
  
}
//assign score and survival time to canvas
  stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 400, 50);

stroke("white");
textSize(20);
fill("white");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime, 100,50);

if (gameState === "end"){
  stroke("red");
  fill("red");
  textSize(20);
  text("RIP, don't do that again!(Refresh Page to retry)", 20,300)
 }
}


function createObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(500,350,40,40);
    obstacle.velocityX = -6;
	obstacle.addImage(obstacleImage);
    obstacle.scale = 0.07;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
function createberrys(){
  if(frameCount % 80 == 0){
    var berry = createSprite(500, Math.round(random(120 , 200), 1000, 5));
    berry.scale = 0.1;
	berry.shapeColor = "purple";
    berry.velocityX = -4;     
    berryGroup.add(berry);
  }
}