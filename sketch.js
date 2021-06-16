var helicopterIMG, helicopterSprite, packageSprite = [], packageIMG;
var packageBody, ground, ground2, groundSprite; 
var box1, box2, box3;
var rightPillar, leftPillar, bottomPillar;
var isBodyDropped;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var pkgCounter = 0;

function preload() {
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);

	packageSprite[pkgCounter] = createSprite(width/2, 80, 10, 10);
	packageSprite[pkgCounter].addImage(packageIMG);
	packageSprite[pkgCounter].scale = 0.2;

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	groundSprite=createSprite(width/2, height-15, width,10);
	groundSprite.shapeColor=color(255)

	isBodyDropped = false;

	var options = {
		isStatic : true
	}

	//left
	leftPillar = createSprite(width / 3, height - (height * .075), 20, 100); //, options);
	leftPillar.shapeColor = color("red");


	//right
	rightPillar = createSprite(leftPillar.x + windowWidth / 3, height - (height * .075), 20, 100); //, options);
	rightPillar.shapeColor = color("red");

	//bottom
	bottomPillar = createSprite(leftPillar.x * 1.5, leftPillar.y + (leftPillar.height / 2.25), rightPillar.x - leftPillar.x, 20); //, options);
	bottomPillar.shapeColor = color("red");

	leftPillar.collide(bottomPillar);
	rightPillar.collide(bottomPillar);


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 1, isStatic: true });
	World.add(world, packageBody);

	//Create a Ground
	ground = Bodies.rectangle(leftPillar.x * 1.5, leftPillar.y + (leftPillar.height / 2), rightPillar.x - leftPillar.x, 20, { isStatic: true });
	ground2 = Bodies.rectangle(width/2, height-15, width, 10, {isStatic:true} );
 	World.add(world, ground2);

	World.add(world, ground);
	Engine.run(engine);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	//drawSprites();
	redraw();
}

function draw() {
	rectMode(CENTER);
	background(0); 
	packageSprite[pkgCounter].x = packageBody.position.x
	packageSprite[pkgCounter].y = packageBody.position.y

	ground2.x = groundSprite.position.x
	ground2.y = groundSprite.position.y
	drawSprites();
	keyPressed();
}

function keyPressed() {

	if (keyIsDown(RIGHT_ARROW)) {
		helicopterSprite.x += 20;
		if (!isBodyDropped) {
			Matter.Body.translate(packageBody, { x: 20, y: 0 });
		}
	}
	
	if (keyIsDown(LEFT_ARROW)) {
		helicopterSprite.x -= 20;
		if (!isBodyDropped) {
			Matter.Body.translate(packageBody, { x: -20, y: 0 });
		}
	}

	if (keyIsDown(32)) {
		Matter.Body.setStatic(packageBody, false);
		isBodyDropped = true;
	}
}