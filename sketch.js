
var bananaImage,obstacleImage,obstacleGroup,backImage
var ground;
var monkeyimage,monkey;
var bg
var player, banana, obstacle
var score=0
var survivalTime = 0
var foodGroup

function preload(){
  backImage=loadImage("jungle.jpg")  
  player_running =
    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  bananaImage=loadImage("banana.png")
  obstacleImage=loadImage("stone.png")
  
}

function setup() {
  createCanvas(600, 600);
 bg=createSprite(0,0,800,400);
bg.velocityX=-4;
//ground.x=ground.width/2;
  bg.addImage(backImage)
bg.scale=1.6
  
player = createSprite(100,290,20,50); 
player.addAnimation("running",player_running);
player.scale=0.1;


obstaclesGroup=new Group();
  foodGroup=new Group()
  
  ground = createSprite(300,580,1200,20);
  //ground.addImage("jungle.jpg",backImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
 ground.visible=false  
 
  
  
}






function draw() {
  background(224);
 

spawnObstacles()
food()

if (ground.x<0){
  ground.x=ground.width/2;  
}
  if (bg.x<0){
    bg.x=bg.width/2
  }
  
  if(obstaclesGroup.isTouching(player)){
    player.scale=0.08
  }
   if(foodGroup.isTouching(player)){
    score=score+2
     foodGroup.destroyEach()
  }
player.collide(ground)


 if(keyDown("space")){
      player.velocityY = -12 ;
    }

//add gravity
    player.velocityY = player.velocityY + 0.8;
player.collide(ground);

  switch (score){
      case 10 :player.scale=0.12;
                break;
      case 20 :player.scale=0.14;
                break;
      case 30 :player.scale=0.16;
                break;
      case 40 :player.scale=0.18;
                break;
                default:break;
      
    }

  drawSprites();
  
textSize(20);
fill("black");
text("Score: "+ score, 250, 100);
}

function food(){
  
  if (frameCount%80===0){
 banana= createSprite(600,100,10,10);
  banana.addImage(bananaImage);
  banana.scale=0.05;
  banana.velocityX=-4;
  banana.y=random(50,300);
  banana.lifetime=150;
  foodGroup.add(banana);
  
}
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
  obstacle = createSprite(600,550,10,40);
    obstacle.velocityX = - (6 + 3*survivalTime/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    
  }
}
