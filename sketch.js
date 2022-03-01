const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "START"
var waterScore = 14;
var woodScore = 0;

var water;
var dirt1;
var dirt2;
var dirt3;
var dirt4;
var dirt5;



function preload(){

	//COMMON
	playerAni = loadAnimation("assets/png/Idle (1).png", "assets/png/Idle (2).png", "assets/png/Idle (3).png", "assets/png/Idle (4).png","assets/png/Idle (5).png", "assets/png/Idle (6).png", "assets/png/Idle (7).png", "assets/png/Idle (8).png","assets/png/Idle (9).png", "assets/png/Idle (10).png")
	playerRunRightAni = loadAnimation("assets/png/Run (1).png", "assets/png/Run (2).png", "assets/png/Run (3).png", "assets/png/Run (4).png", "assets/png/Run (5).png", "assets/png/Run (6).png", "assets/png/Run (7).png", "assets/png/Run (8).png");
	playerRunLeftAni = loadAnimation("assets/png/Run Opp (1).png", "assets/png/Run Opp (2).png", "assets/png/Run Opp (3).png", "assets/png/Run Opp (4).png", "assets/png/Run Opp (5).png", "assets/png/Run Opp (6).png", "assets/png/Run Opp (7).png", "assets/png/Run Opp (8).png")
	playerJumpAni = loadAnimation("assets/png/Jump (1).png", "assets/png/Jump (2).png", "assets/png/Jump (3).png", "assets/png/Jump (4).png", "assets/png/Jump (5).png", "assets/png/Jump (6).png", "assets/png/Jump (7).png", "assets/png/Jump (8).png", "assets/png/Jump (9).png", "assets/png/Jump (10).png");
	logo_img = loadImage("assets/LOGO.PNG");
	howToPlayBtn = loadImage("assets/howToPlay.png");

	//SPLASH SCREEN
	splashScreen_img = loadImage("assets/Splash_img.png");
	playBtn_img = loadImage("assets/playBtn.png");
	text1_img = loadImage("assets/text1.png")

	//LEVEL-1 SET UP SCREEN
	desert_img = loadImage("assets/desert.jpg");
	level1Instuction = loadImage("assets/level1.png")
	next_img = loadImage("assets/next.png")
	text2_img = loadImage("assets/text2.png")
	

	//LEVEL-1 SCREEN
	bamboo_img = loadImage("assets/bambooForest.png")
	empty_coconut_img = loadAnimation("assets/coconut.png")
	empty_coconut_img_1 = loadAnimation("assets/coconut1.png");
	empty_coconut_img_2 = loadAnimation("assets/coconut2.png");
	empty_coconut_img_3 = loadAnimation("assets/coconut3.png");
	waterImg = loadImage("assets/water.png");
	dirt1Img = loadImage("assets/dirt1.png");
	dirt2Img = loadImage("assets/dirt2.png");
	dirt3Img = loadImage("assets/dirt3.png");
	dirt4Img = loadImage("assets/dirt4.png");
	dirt5Img = loadImage("assets/dirt5.png");
	chatBubble1Img = loadImage("assets/chatBubble1.png");
	okBtnImg = loadImage("assets/ok.png");
	waterScoreBoard_img = loadImage("assets/waterScoreBoard.png")
	level1LostImg = loadImage("assets/level-1-lost.png")
	resetBtnImg = loadImage("assets/resetBtn.png")
	level1WinImg = loadImage("assets/level-1-win.png")

	//LEVEL-2 SET UP SCREEN
	text3_img = loadImage("assets/text3.png")
	woodScoreBoard_img = loadImage("assets/woodScoreBoard.png")

	//LEVEL-2 SCREEN
	woodsImg = loadImage("assets/woods.png");
	woods2Img = loadImage("assets/woods2.PNG");
	tree1 = loadAnimation("assets/tree-1.png");
	tree2 = loadAnimation("assets/tree-2.png");
	tree3 = loadAnimation("assets/tree-3.png");
	tree4 = loadAnimation("assets/tree-4.png");
	treeCut = loadAnimation("assets/treeCut.png")
	snakeImg = loadAnimation("assets/snake.gif");
	lizardImg = loadAnimation("assets/lizard.gif");
	scorpionImg = loadAnimation("assets/scorpion.gif")
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

	woods = createSprite(width/2, height/2, 10, 10);
	woods.addImage(woods2Img);
	woods.scale = 2.5;
	woods.visible = false;

	level1Lost = createSprite(width/2 , height/2- 60, 10, 10);
	level1Lost.addImage(level1LostImg)
	level1Lost.visible = false;

	level1Win = createSprite(width/2 , height/2- 60, 10, 10);
	level1Win.addImage(level1WinImg)
	level1Win.scale = 1.5;
	level1Win.visible = false;

	resetBtn = createSprite(width/2, height/2 + 160, 10, 10);
	resetBtn.addImage(resetBtnImg)
	resetBtn.visible = false;
	resetBtn.scale = 0.2;

	logo = createSprite(width-120,90,10,10);
	logo.addImage(logo_img);
	logo.scale=0.7
	
	playBtn = createSprite(width/2, height/2+70, 10, 10);
	playBtn.addImage(playBtn_img);
	playBtn.scale=0.4

	howToPlay = createSprite(width-70, height-50, 10, 10);
	howToPlay.addImage(howToPlayBtn);
	howToPlay.scale = 0.2

	player = createSprite(500, height-200, 10, 10);
	player.addAnimation("standing", playerAni);
	player.addAnimation("moveRight", playerRunRightAni);
	player.addAnimation("moveLeft", playerRunLeftAni);
	player.addAnimation("jump", playerJumpAni);
	player.changeAnimation("standing");
	player.scale=0.6
	player.visible=false
	//player.debug = true;
	player.setCollider("rectangle", -20, 0, 300, 495) 

	level1 = createSprite(width/2+100, 200, 10, 10);
	level1.addImage(level1Instuction)
	level1.visible=false
	
	next = createSprite(width/2+170, height/2-70, 10, 10);
	next.addImage(next_img)
	next.visible=false
	next.scale=0.25;

	text1 = createSprite(width/2, height/2-50, 10, 10)
	text1.addImage(text1_img)
	text1.visible = false;
	text1.scale=1.5;
	
	text2 = createSprite(150, 80, 10, 10)
	text2.addImage(text2_img)
	text2.visible = false;
	text2.scale=0.5;

	text3 = createSprite(150, 80, 10, 10)
	text3.addImage(text3_img)
	text3.visible = false;
	text3.scale=0.5;

	empty_coconut = createSprite(width/2, height-100, 10, 10);
	empty_coconut.addAnimation("coconut-empt",empty_coconut_img);
	empty_coconut.addAnimation("coconut-1",empty_coconut_img_1);
	empty_coconut.addAnimation("coconut-2",empty_coconut_img_2);
	empty_coconut.addAnimation("coconut-3",empty_coconut_img_3);
	empty_coconut.changeAnimation("coconut-empt");
	empty_coconut.visible = false;
	empty_coconut.scale = 0.4;
	//empty_coconut.debug=true;
	empty_coconut.setCollider("rectangle",0,0,150, 100);

	chatBubble1 = createSprite(400, height/2-60, 10, 10);
	chatBubble1.addImage(chatBubble1Img);
	chatBubble1.visible = false;
	chatBubble1.scale = 0.8;

	okBtn = createSprite(495, height/2+35, 10, 10);
	okBtn.addImage(okBtnImg);
	okBtn.visible = false;
	okBtn.scale = 0.6;
	
	waterScoreBoard = createSprite(width-300, 80, 10, 10);
	waterScoreBoard.addImage(waterScoreBoard_img);
	waterScoreBoard.visible = false;
	waterScoreBoard.scale = 0.5;

	woodScoreBoard = createSprite(width-315, 85, 10, 10);
	woodScoreBoard.addImage(woodScoreBoard_img);
	woodScoreBoard.visible = false;
	woodScoreBoard.scale = 0.7;

	ground = createSprite(width/2, height-100, width, 20);
	ground.visible = false;

	//GROUPS
	waterGrp = new Group();
	water2Grp = new Group();
	water3Grp = new Group();
	dirt1Grp = new Group();
	dirt2Grp = new Group();
	dirt3Grp = new Group();
	dirt4Grp = new Group();
	dirt5Grp = new Group();
	trees1Grp = new Group();
	trees2Grp = new Group();
	trees3Grp = new Group();
	trees4Grp = new Group();
	obstacle1Grp = new Group();
	obstacle2Grp = new Group();
	obstacle3Grp = new Group();

	Engine.run(engine);
	
}


function draw() {

	gameStart();

	level1Setup();

	level1Instructions();

	gameLevel1();

	gameLevel1WinLose();

	level2Setup();

	gameLevel2();

	drawSprites();

	if(gameState === "Level-1-Instructions" || gameState === "Level-1" || gameState === "Level-1-LOST" || gameState === "Level-1-WIN"){
	textSize(40);
   	fill("white");
	text(waterScore, width-310, 100);
	}

	if(gameState === "Level-2-Setup" || gameState === "Level-2"){
		textSize(40);
		fill("white");
		text(woodScore, width-310, 100);
		}
}




function gameStart(){
	if(gameState === "START"){
		background(splashScreen_img);	
		playBtn.visible=true
		logo.visible=false
		text1.visible = true;
	
		if(mousePressedOver(playBtn)){
			gameState="Level-1-Setup"
		}
		}
}

function level1Setup(){
	if(gameState==="Level-1-Setup"){
		playBtn.visible=false
		background(desert_img)
		player.visible=true;
		level1.visible=true;
		next.visible=true;
		logo.visible=true
		text1.visible = false;
		text2.visible = true;

		if(mousePressedOver(next)){
			gameState="Level-1-Instructions"
		}
	}
	}

function level1Instructions(){
	if(gameState==="Level-1-Instructions"){
		background(bamboo_img)
		next.visible=false;
		level1.visible=false;
		player.x = 160;
		player.y = height-180;
		player.scale = 0.65;
		empty_coconut.visible = true;
		chatBubble1.visible = true;
		okBtn.visible = true;
		waterScoreBoard.visible = true;

		if(mousePressedOver(okBtn)){
			gameState = "Level-1";
		}
	}

}

function gameLevel1(){
	if(gameState==="Level-1"){
		background(bamboo_img)
		okBtn.visible = false;
		chatBubble1.visible = false;
	   spawnWaterdroplets();
	   waterScoreSystem();
	   moveCoconut();

	   if(waterScore >= 15){
		   gameState = "Level-1-WIN"
	   }
   }
}

function gameLevel1WinLose(){
		if(gameState === "Level-1-LOST"){
			level1Lost.visible = true;
			resetBtn.visible = true;
			waterGrp.destroyEach();
			water2Grp.destroyEach();
			water3Grp.destroyEach();
			dirt1Grp.destroyEach();
			dirt2Grp.destroyEach();
			dirt3Grp.destroyEach();
			dirt4Grp.destroyEach();
			dirt5Grp.destroyEach();
			empty_coconut.visible = false

			if(mousePressedOver(resetBtn)){
				gameState = "Level-1"
				resetBtn.visible = false;
				level1Lost.visible = false;
				empty_coconut.visible = true;
				waterScore = 0
			}
		}

		if(gameState === "Level-1-WIN"){
			level1Win.visible = true;
			next.visible = true;
			next.y = height/2+150
			next.scale = 0.3;
			next.x = width/2+240
			empty_coconut.visible = false;
			waterGrp.destroyEach();
			water2Grp.destroyEach();
			water3Grp.destroyEach();
			dirt1Grp.destroyEach();
			dirt2Grp.destroyEach();
			dirt3Grp.destroyEach();
			dirt4Grp.destroyEach();
			dirt5Grp.destroyEach();

			if(mousePressedOver(next)){
				gameState = "Level-2-Setup"
			}
		}

}

function level2Setup(){
	if(gameState === "Level-2-Setup"){
		background(desert_img);
		next.visible = false;
		level1Win.visible = false;
		empty_coconut.visible = true;
		empty_coconut.changeAnimation("coconut-3")
		text2.visible = false;
		waterScoreBoard.visible = false;
		text3.visible = true;
		woodScoreBoard.visible = true;
		okBtn.visible = true;

		if(mousePressedOver(okBtn)){
			gameState = "Level-2";
		}	
	}
}

function gameLevel2(){
	if(gameState === "Level-2"){
		woods.visible = true;
		background(woodsImg)
		okBtn.visible = false;
		empty_coconut.visible = false;
		player.scale = 0.4;
		player.x = 200;
		woods.x = woods.x-8;

		spawnTrees();
		spawnObstacles();
		woodScoreSystem();

		if(woods.x < -10){
			woods.x = width/2;
		}

		if(woods.x > width){
			woods.x = width/2;
		}
		
		player.collide(ground);

		if(!keyDown("space")){
			player.changeAnimation("moveRight");
		}

		if(keyDown("space")){
			player.changeAnimation("jump");
			player.velocityY = -10;
			woods.x = woods.x - 5;
		}  
		player.velocityY = player.velocityY + 0.9;
	}

	if(player.y < height/2-100){
		player.y = height/2-100;
	}

}

function spawnTrees(){

	if(frameCount%500===0){
		var trees1 = createSprite(width+100,random(height-300, height - 100),10,40);
		trees1.addAnimation("tree1", tree1);
		trees1.addAnimation("tree1Cut", treeCut);
		trees1.changeAnimation("tree1")
		trees1.velocityX = -8;
		trees1.scale = 1.5;
		 trees1.lifetime = 300;
		 trees1Grp.add(trees1);
	}

	if(frameCount%824===0){
		var trees2 = createSprite(width+100,random(height-300, height - 100),10,40);
		trees2.addAnimation("tree2",tree2)
		trees2.addAnimation("tree2Cut", treeCut);
		trees2.changeAnimation("tree2")
		trees2.velocityX = -8;
		trees2.scale = 1.5;
		 trees2.lifetime = 300;
		 trees2Grp.add(trees2);
	}

	if(frameCount%140===0){
		var trees3 = createSprite(width+100,random(height-300, height - 100),10,40);
		trees3.addAnimation("tree3", tree3)
		trees3.addAnimation("tree3Cut", treeCut);
		trees3.changeAnimation("tree3")
		trees3.velocityX = -8;
		trees3.scale = 1.5;
		 trees3.lifetime = 300;
		 trees3Grp.add(trees3);
	}

	if(frameCount%340===0){
		var trees4 = createSprite(width+100,random(height-300, height - 100),10,40);
		trees4.addAnimation("tree4", tree4)
		trees4.addAnimation("tree4Cut", treeCut);
		trees4.changeAnimation("tree4")
		trees4.velocityX = -8;
		trees4.scale = 1.5;
		trees4.lifetime = 300;
		trees4Grp.add(trees4);
	}
	
}

function spawnObstacles(){
	if(frameCount%240===0){
		var obstacle1 = createSprite(width+100,random(height-200, height - 100),10,40);
		obstacle1.addImage(snakeImg)
		obstacle1.velocityX = -8;
		obstacle1.scale = 0.5;
		obstacle1.lifetime = 300;
		 obstacle1Grp.add(obstacle1);
	}

	if(frameCount%100===0){
		var obstacle2 = createSprite(width+100,random(height-200, height - 100),10,40);
		obstacle2.addImage(scorpionImg)
		obstacle2.velocityX = -8;
		obstacle2.scale = 0.5;
		obstacle2.lifetime = 300;
		obstacle2Grp.add(obstacle2);
	}

	if(frameCount%170===0){
		var obstacle3 = createSprite(width+100,random(height-200, height - 100),10,40);
		obstacle3.addImage(lizardImg)
		obstacle3.velocityX = -8;
		obstacle3.scale = 0.5;
		obstacle3.lifetime = 300;
		 obstacle3Grp.add(obstacle3);
	}
}

function woodScoreSystem(){
if(trees1Grp.isTouching(player)){
		trees1.changeAnimation("tree1Cut");
		woodScore = woodScore + 1;
}

if(trees2Grp.isTouching(player)){
	trees2.changeAnimation("tree2Cut");
	woodScore = woodScore + 1;
}

if(trees3Grp.isTouching(player)){
	trees3.changeAnimation("tree3Cut");
	woodScore = woodScore + 1;
}

if(trees4Grp.isTouching(player)){
	trees4.changeAnimation("tree4Cut");
	woodScore = woodScore + 1;
}

/*if(obstaclesGroup.isTouching(player)){
	obstaclesGroup.destroyEach();
	gameState = "Level-2-LOST"
}

if(dirt2Grp.isTouching(empty_coconut)){
	dirt2Grp.destroyEach();
	gameState = "Level-1-LOST"
}

if(dirt3Grp.isTouching(empty_coconut)){
	dirt3Grp.destroyEach();
	gameState = "Level-1-LOST"
}

if(dirt4Grp.isTouching(empty_coconut)){
	dirt4Grp.destroyEach();
	gameState = "Level-1-LOST"
}

if(dirt5Grp.isTouching(empty_coconut)){
	dirt5Grp.destroyEach();
	gameState = "Level-1-LOST"
}

if(waterScore === 0 || waterScore === 1 || waterScore === 2 || waterScore === 3 || waterScore === 4){
	empty_coconut.changeAnimation("coconut-empt")
	empty_coconut.scale = 0.4;
}

if(waterScore === 5 || waterScore === 6 || waterScore === 7 || waterScore === 8 || waterScore === 9){
	empty_coconut.changeAnimation("coconut-1")
	empty_coconut.scale = 0.55;
}

if(waterScore === 10 || waterScore === 11 || waterScore === 12 || waterScore === 13 || waterScore === 14){
	empty_coconut.changeAnimation("coconut-2")
	//empty_coconut.scale = 0.55;
}

if(waterScore === 15){
	empty_coconut.changeAnimation("coconut-3")
	empty_coconut.scale = 0.48;
}*/
}

function spawnWaterdroplets(){
	if(frameCount%100===0){
		var water = createSprite(random(200, width-150), -10,10,10);
		water.addImage(waterImg)
		water.scale = 0.2;
		water.velocityY = 8;
		water.lifetime = 300;
		waterGrp.add(water);
		//water.debug=true;
	    water.setCollider("rectangle",0,0,150, 100);
	}

	if(frameCount%100===0){
		var water2 = createSprite(random(200, width-150), -200,10,10);
		water2.addImage(waterImg)
		water2.scale = 0.2;
		water2.velocityY = 8;
		water2.lifetime = 300;
		water2Grp.add(water2);
		//water2.debug=true;
	    water2.setCollider("rectangle",0,0,150, 100);
	}

	if(frameCount%100===0){
		var water3 = createSprite(random(200, width-150), -50,10,10);
		water3.addImage(waterImg)
		water3.scale = 0.2;
		water3.velocityY = 8;
		water3.lifetime = 300;
		water3Grp.add(water3);
		//water3.debug=true;
	    water3.setCollider("rectangle",0,0,150, 100);
	}

	if(frameCount%100===0){
		var dirt1 = createSprite(random(200, width-150), -400,10,10);
		dirt1.addImage(dirt1Img)
		dirt1.scale = 0.7;
		dirt1.velocityY = 6
		dirt1.lifetime=300;
		dirt1Grp.add(dirt1)
		//dirt1.debug = true;
		dirt1.setCollider("rectangle",0,10,50, 50);
	}

	if(frameCount%100===0){
		var dirt2 = createSprite(random(200, width-150), -100,10,10);
		dirt2.addImage(dirt2Img)
		dirt2.scale = 0.7;
		dirt2.velocityY = 6
		dirt2.lifetime=300;
		dirt2Grp.add(dirt2)
		//dirt2.debug = true;
		dirt2.setCollider("rectangle",0,10,50, 50);
	}

	if(frameCount%100===0){
		var dirt3 = createSprite(random(200, width-150), -200,10,10);
		dirt3.addImage(dirt3Img)
		dirt3.scale = 0.7;
		dirt3.velocityY = 6
		dirt3.lifetime=300;
		dirt3Grp.add(dirt3)
		//dirt3.debug = true;
		dirt3.setCollider("rectangle",0,10,50, 50);
	}

	if(frameCount%100===0){
		var dirt4 = createSprite(random(200, width-150), -300,10,10);
		dirt4.addImage(dirt4Img)
		dirt4.scale = 0.7;
		dirt4.velocityY = 6
		dirt4.lifetime=300;
		dirt4Grp.add(dirt4)
		//dirt4.debug = true;
		dirt4.setCollider("rectangle",0,10,50, 50);
	}	

	if(frameCount%100===0){
		var dirt5 = createSprite(random(200, width-150), -500,10,10);
		dirt5.addImage(dirt5Img)
		dirt5.scale = 0.7;
		dirt5.velocityY = 6
		dirt5.lifetime=300;
		dirt5Grp.add(dirt5)
		//dirt5.debug = true;
		dirt5.setCollider("rectangle",0,10,50, 50);
	}

	
}
 
function waterScoreSystem(){
	if(waterGrp.isTouching(empty_coconut)){
			waterGrp.destroyEach();
			waterScore = waterScore + 1;
	}

	if(water2Grp.isTouching(empty_coconut)){
		water2Grp.destroyEach();
		waterScore = waterScore + 1;
}

if(water3Grp.isTouching(empty_coconut)){
	water3Grp.destroyEach();
	waterScore = waterScore + 1;
}

	if(dirt1Grp.isTouching(empty_coconut)){
		dirt1Grp.destroyEach();
		gameState = "Level-1-LOST"
}

	if(dirt2Grp.isTouching(empty_coconut)){
		dirt2Grp.destroyEach();
		gameState = "Level-1-LOST"
	}

	if(dirt3Grp.isTouching(empty_coconut)){
		dirt3Grp.destroyEach();
		gameState = "Level-1-LOST"
	}

	if(dirt4Grp.isTouching(empty_coconut)){
		dirt4Grp.destroyEach();
		gameState = "Level-1-LOST"
	}

	if(dirt5Grp.isTouching(empty_coconut)){
		dirt5Grp.destroyEach();
		gameState = "Level-1-LOST"
	}

	if(waterScore === 0 || waterScore === 1 || waterScore === 2 || waterScore === 3 || waterScore === 4){
		empty_coconut.changeAnimation("coconut-empt")
		empty_coconut.scale = 0.4;
	}

	if(waterScore === 5 || waterScore === 6 || waterScore === 7 || waterScore === 8 || waterScore === 9){
		empty_coconut.changeAnimation("coconut-1")
		empty_coconut.scale = 0.55;
	}

	if(waterScore === 10 || waterScore === 11 || waterScore === 12 || waterScore === 13 || waterScore === 14){
		empty_coconut.changeAnimation("coconut-2")
		//empty_coconut.scale = 0.55;
	}

	if(waterScore === 15){
		empty_coconut.changeAnimation("coconut-3")
		empty_coconut.scale = 0.48;
	}
}

function moveCoconut(){
	if(keyDown("right")){
		empty_coconut.x = empty_coconut.x + 10;
	}

	if(empty_coconut.x < 200){
		empty_coconut.x  = 200;
	}

	if(keyDown("left")){
		empty_coconut.x = empty_coconut.x - 10;
	}

	if(empty_coconut.x > width-150){
		empty_coconut.x  =width- 150;
	}
}