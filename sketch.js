const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "START"
var waterScore = 0;

var water;
var dirt1;
var dirt2;
var dirt3;
var dirt4;
var dirt5;



function preload(){

	//COMMON
	playerAni = loadAnimation("assets/png/Idle (1).png", "assets/png/Idle (2).png", "assets/png/Idle (3).png", "assets/png/Idle (4).png","assets/png/Idle (5).png", "assets/png/Idle (6).png", "assets/png/Idle (7).png", "assets/png/Idle (8).png","assets/png/Idle (9).png", "assets/png/Idle (10).png")
	logo_img = loadImage("assets/LOGO.PNG");
	howToPlayBtn = loadImage("assets/howToPlay.png");

	//SPLASH SCREEN
	splashScreen_img = loadImage("assets/Splash_img.png");
	playBtn_img = loadImage("assets/playBtn.png");
	text_img = loadImage("assets/text.png")

	//LEVEL-1 SET UP SCREEN
	desert_img = loadImage("assets/desert.jpg");
	level1Instuction = loadImage("assets/level1.png")
	next_img = loadImage("assets/next.png")
	text1_img = loadImage("assets/text1.png")

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

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

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
	player.scale=0.6
	player.visible=false

	level1 = createSprite(width/2+100, 200, 10, 10);
	level1.addImage(level1Instuction)
	level1.visible=false
	
	next = createSprite(width/2+170, height/2-70, 10, 10);
	next.addImage(next_img)
	next.visible=false
	next.scale=0.25;

	text = createSprite(width/2, height/2-50, 10, 10)
	text.addImage(text_img)
	text.visible = false;
	text.scale=1.5;
	
	text1 = createSprite(150, 80, 10, 10)
	text1.addImage(text1_img)
	text1.visible = false;
	text1.scale=0.5;

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
	chatBubble1.scale = 0.3;

	okBtn = createSprite(490, height/2, 10, 10);
	okBtn.addImage(okBtnImg);
	okBtn.visible = false;
	okBtn.scale = 0.6;

	//GROUPS
	waterGrp = new Group();
	water2Grp = new Group();
	water3Grp = new Group();
	dirt1Grp = new Group();
	dirt2Grp = new Group();
	dirt3Grp = new Group();
	dirt4Grp = new Group();
	dirt5Grp = new Group();

	Engine.run(engine);
	
}


function draw() {

	gameStart();

	level1Setup();

	level1Instructions();

	gameLevel1();

	drawSprites();

	textSize(40);
   	fill("white");
	text(waterScore, width/2, height-100);
}




function gameStart(){
	if(gameState === "START"){
		background(splashScreen_img);	
		playBtn.visible=true
		logo.visible=false
		text.visible = true;
	
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
		text.visible = false;
		text1.visible = true;

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
   }
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
		waterScore = 0;
}

	if(dirt2Grp.isTouching(empty_coconut)){
		dirt2Grp.destroyEach();
		waterScore = 0;
	}

	if(dirt3Grp.isTouching(empty_coconut)){
		dirt3Grp.destroyEach();
		waterScore = 0;
	}

	if(dirt4Grp.isTouching(empty_coconut)){
		dirt4Grp.destroyEach();
		waterScore = 0;
	}

	if(dirt5Grp.isTouching(empty_coconut)){
		dirt5Grp.destroyEach();
		waterScore = 0;
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