import { h, render } from "preact";
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.css'

render(<App />, document.getElementById("root")!);

// const Denque = require("denque");
// let isClickingGame = false;

// document.onreadystatechange = function () {
//   if (document.readyState == "complete") {
//     initApplication();
//   }
// };

// let vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty("--vh", `${vh}px`);

// window.addEventListener("resize", function (event) {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });

// const mensajes = [
//   [
//     'Holi soy Crepi <i class="fas fa-heart"></i> <br /> una ilustradora y streamer',
//   ],
//   // [
//   //   'Vení a verme a <br/><a href="https://www.facebook.com/OopsSummerFest/" target="_blank"> la Oops <i class="fas fa-user-astronaut"></i></i></a> <br/> el 28 de Mayo',
//   // ],
//   [
//     'Checa mis ilustraciones  <br/> en instagram <i class="fab fa-instagram"></i>',
//     "instagram",
//   ],
//   [
//     'Platica conmigo mientras juego o dibujo <br/> en twitch<i class="fab fa-twitch"></i>',
//     "twitch",
//   ],
//   [
//     'Conviértete en una frutita en <br/> mi discord  <i class="fab fa-discord"></i>',
//     "discord",
//   ],
//   [
//     'No bailo pero hago dibujitos, todos pequeños todos bonitos <br/> en tiktok <i class="fab fa-tiktok"></i>',
//     "tiktok",
//   ],
//   [
//     'Léeme un rato en twitter <i class="fab fa-twitter"></i> <br/> #noMeFunen',
//     "twitter",
//   ],
//   ['<i class="fas fa-kiss-wink-heart"></i> Beso con moquitos UwU'],
// ];
// let mensajeIdx = 0;

// function changeNormalMessage(message?: string) {
//   const bubble = document.querySelector(".bubble");
//   document.querySelectorAll(".social-media-icon").forEach((element) => {
//     element.classList.remove("animate__heartBeat");
//   });

//     if (message !== undefined) {
//       let messagesDom = bubble?.querySelector(".messages");
//       if(messagesDom){
//         messagesDom.innerHTML = message;
//       }
//       return;
//     }

//   let mensajeInfo = mensajes[mensajeIdx];
//   if (mensajeInfo.length >= 1) {
//     let messagesDom = bubble?.querySelector(".messages");
//     if(messagesDom){
//       messagesDom.innerHTML = mensajeInfo[0];
//     }
//   }
//   if (mensajeInfo.length >= 2) {
//     const icon = document.querySelector(`.social-media-icon.${mensajeInfo[1]}`);
//     if (icon) {
//       icon.classList.add("animate__heartBeat");
//     }
//   }
//   mensajeIdx = (mensajeIdx + 1) % mensajes.length;
// }

// function secondsBetween(t1: number, t2: number) {
//   var dif = t1 - t2;
//   var Seconds_from_T1_to_T2 = dif / 1000;
//   var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
//   return Seconds_Between_Dates;
// }

// function initApplication() {
//   const body = document.querySelector("body");
//   const wrapper = document.querySelector(".wrapper");
//   const crepiWrapper = document.querySelector(".crepi-wrapper");
//   const bubble = crepiWrapper?.querySelector(".bubble");
//   const crepiImg = crepiWrapper?.querySelector("img.crepi");
//   const clickingGame = bubble?.querySelector(".clicking-game");

//   prepareSnow();

//   let clicksList = new Denque();
//   let clickScore = 0;
//   let clickMaxScore = 0;
//   const clickSecondsToKeep = 3;
//   if (localStorage.clickMaxScore) {
//     clickMaxScore = Number(localStorage.clickMaxScore);
//   }

//   // handler on click add class
//   if (crepiImg) {
//     crepiImg.addEventListener("mousedown", function (event) {
//       crepiImg.classList.add("pressed");
//     });
//     crepiImg.addEventListener("touchstart", function (event) {
//       crepiImg.classList.add("pressed");
//     });
//     crepiImg.addEventListener("click", function (event) {
//       crepiWrapper?.classList.remove("hidden");
//       crepiImg.classList.remove("pressed");
//       (document.activeElement as HTMLElement).blur();
  
//       handleGameClicks();
//       changeNormalMessage( isClickingGame ? "": undefined);
//     });
//     crepiImg.addEventListener("mouseout", function (event) {
//       crepiImg.classList.remove("pressed");
//     });
//     crepiImg.addEventListener("mouseleave", function (event) {
//       crepiImg.classList.remove("pressed");
//     });
//     crepiImg.addEventListener("touchcancel", function (event) {
//       crepiImg.classList.remove("pressed");
//     });
//     crepiImg.addEventListener("touchend", function (event) {
//       crepiImg.classList.remove("pressed");
//     });
//     clickingGame?.querySelector(".close-btn")?.addEventListener("click", function (event) {
//       closeClickGame();
//     })
//   }

//   function updateGameClicks(){
//     const now = Date.now();
//     while (
//       clicksList.length > 0 &&
//       secondsBetween(now, clicksList.peekFront()) > clickSecondsToKeep
//     ) {
//       clicksList.shift();
//     }
//     let clicksPerSecond = clicksList.length / clickSecondsToKeep;
//     clickScore = clicksPerSecond;
//     if (clickScore > clickMaxScore) {
//       clickMaxScore = Math.max(clickScore, clickMaxScore);
//       localStorage.setItem("clickMaxScore", clickMaxScore.toString());
//     }
//     if (clickScore >= 5.5) {
//       isClickingGame = true;
//       bubble?.querySelector(".messages")?.classList.add("hidden");
//       clickingGame?.classList.remove("hidden");
//     }
//     if (isClickingGame) {
//       let record = clickingGame?.querySelector(".record");
//       let score = clickingGame?.querySelector(".score");
//       if (record && score) {
//         record.innerHTML = `Tu record: ${Number(clickMaxScore).toFixed(1)}/s`;
//         score.innerHTML = `Actual: ${Number(clickScore).toFixed(1)}/s`;
//       }
//     }
//     if(clickScore < 5){
//       body?.classList.remove("shake-little", "shake", "shake-hard");
//     } else if(clickScore < 6){
//       body?.classList.remove("shake", "shake-hard");
//       body?.classList.add("shake-little");
//     } else if(clickScore < 7){
//       body?.classList.remove("shake-little", "shake-hard");
//       body?.classList.add("shake");
//     } else {
//       body?.classList.remove("shake-little", "shake");
//       body?.classList.add("shake-hard");
//     }
//   }

//   function handleGameClicks() {
//     const now = Date.now();
//     clicksList.push(now);
//     updateGameClicks();
//   }
//   var intervalGameClicks = function(){
//     updateGameClicks();
//     setTimeout(intervalGameClicks, isClickingGame ? 500 : 1000);
//   }
//   setTimeout(intervalGameClicks, 1000);
// }

// function closeClickGame() {
//   isClickingGame = false;
//   const bubble = document.querySelector(".bubble");
//   bubble?.querySelector(".messages")?.classList.remove("hidden");
//   bubble?.querySelector(".clicking-game")?.classList.add("hidden");
//   changeNormalMessage();
// }


// function prepareSnow() {
//   const snowWrapper = document.querySelector(".snow-wrapper");
//   const numSnow = 75;
//   for (let i = 0; i < numSnow; i++) {
//     const snow = document.createElement("div");
//     snow.classList.add("snow");
//     snowWrapper?.appendChild(snow);
//   }
// }

// // planck.testbed(function(testbed) {
// //     // Your testbed code
// //   });

// // // PIXI
// // const renderer = new PIXI.Renderer({width: 1280, height: 720, backgroundColor: 0x000000 });
// // document.body.appendChild(renderer.view);
// // const loader = PIXI.Loader.shared; 				// for v5+.  In v4 Loader should be lowercased?
// // // Layer our scene with containers
// // const stage = new PIXI.Container();				// Everything ends up here.
// // const spriteLayer = new PIXI.Container();		// Sprites in here.
// // 	stage.addChild(spriteLayer);
// // const debugLayer = new PIXI.Container();		// Outlines/planck shapes.
// // 	stage.addChild(debugLayer);
// // const uiLayer = new PIXI.Container();			// Text UI on top
// // 	stage.addChild(uiLayer);
// // const boundaryGraphics = new PIXI.Graphics();	// our stage boundaries are on their own graphics object we handle
// // 	debugLayer.addChild(boundaryGraphics);			// in the way planck.js provides us (this is a demo afterall)
// // var infoText = new PIXI.Text('', new PIXI.TextStyle({fill:'#ffffff'}));
// // 	infoText.x = 30;
// // 	infoText.y = 25;
// // 	uiLayer.addChild(infoText);
// // var topText = new PIXI.Text("", new PIXI.TextStyle({fontSize: '11pt',fill:'#ffffff'}));
// // 	topText.x = 20;
// // 	topText.y = 0;
// // 	uiLayer.addChild(topText);
// // var bottomText = new PIXI.Text("", new PIXI.TextStyle({fontSize: '11pt',fill:'#ffffff'}));
// // 	bottomText.x = 20;
// // 	bottomText.y = renderer.screen.height - 40;
// // 	uiLayer.addChild(bottomText);
// // /*
// // 	Planck
// // 	Goes without saying, please read the Box2D Manual: https://box2d.org/manual.pdf
// // 	We will be simulating Box2d on a small scale, as far as game resolutions are concerned.
// // 	We then draw our game world over that at a much larger scale.
// // 	I opted for two globals for clarity, PixelsPerMeter (b2d-to-PIXI) and MetersPerPixel (PIXI-to-b2d).
// // 	You could just divide PixelsPerMeter when going into Box2d, but an operator is an easy oversight
// // 	for an annoying bug, especially in a tutorial meant for new users.
// // 	Further reading on the concept of scaling box2d: https://box2d.org/2011/12/pixels/
// // */
// // var PixelsPerMeter = 50;					// How many pixels represent 1 meter.
// // var MetersPerPixel = 1/PixelsPerMeter;		// And the reverse.
// // var drawLines = false;						// Draw Debug lines
// // // Timing
// // var gameTime = 0;							// Elapsed time since updating began.
// // var lastTime = 0;
// // var frameTime = 0;
// // var accumulator = 0;
// // var physicsSteps = 60;						// How many physics steps per second.
// // var timestep = 1000/physicsSteps;			//
// // var deltaTime = timestep/1000;				// Since we're fixed, we don't need to divide constantly during simulation.
// // // Settings
// // var interpolation = true;					// Draw PIXI objects between physics states for smoother animation.
// // var forceStrength = 50;						// How much power our bunnies posses.
// // var deleteQueued = false;					// Destroying stuff during a physics step would be crashy.
// // var deleteAll = false;						// Flag to remove all objects next cycle (again, input polling it outside main loop, so we have to handle this cleanly)
// // var bulletMode = false;						// Flag new objects as bullets (prevents tunneling, but is harsh on performance)

// // // Our main Box2D world.
// // var world = planck.World({
// // 	gravity: planck.Vec2(0,0)				// approximate normal earth gravity
// // });

// // var gameObjects = [];						// Our list of GameObject instances.

// // var ground = world.createBody({				// The confinement area for our sandbox
// // 		userData: {
// // 			myType: "boundary",
// // 			label:"ground"
// // 		}
// // 	});
// // // Shortcuts because lazy
// // const topLeft = planck.Vec2(20*MetersPerPixel,20*MetersPerPixel);
// // const topRight = planck.Vec2((renderer.screen.width-20)*MetersPerPixel,20*MetersPerPixel);
// // const bottomLeft = planck.Vec2(20*MetersPerPixel,(renderer.screen.height-40)*MetersPerPixel);
// // const bottomRight = planck.Vec2((renderer.screen.width-20)*MetersPerPixel,(renderer.screen.height-40)*MetersPerPixel);
// // // generate the fixtures on our ground body, one for each side of the room.
// // ground.createFixture(planck.Edge(topLeft,topRight));
// // ground.createFixture(planck.Edge(topRight,bottomRight));
// // ground.createFixture(planck.Edge(bottomRight,bottomLeft));
// // ground.createFixture(planck.Edge(bottomLeft,topLeft));

// // // The bread and butter.  This is (hopefully) a proper game loop, if I learned anything from the gaffer.
// // function step(t) {
// // 	requestAnimationFrame(step);
// // 	if(deleteQueued) {
// // 		if(gameObjects.length) {
// // 			gameObjects[0].destroy();
// // 			gameObjects.splice(0,1);
// // 		}
// // 		deleteQueued = false; // dequeue if nothing is available
// // 	}
// // 	if(deleteAll) {
// // 		for(let o = 0; o < gameObjects.length; o++) {
// // 			gameObjects[o].destroy();
// // 		}
// // 		gameObjects = [];
// // 		deleteAll = false;
// // 	}
// // 	if(lastTime) {
// // 		frameTime = t - lastTime;
// // 		if(frameTime > 100) { // Panic! In this state, we need to start removing objects!
// // 			frameTime = 100;
// // 			if(gameObjects.length) {
// // 				gameObjects[0].destroy();
// // 				gameObjects.splice(0,1);
// // 				if(gameObjects.length > 10) {		// Be more aggressive.
// // 					for(let d = 0; d < 10; d++) {
// // 						gameObjects[0].destroy();
// // 						gameObjects.splice(0,1);
// // 					}
// // 				}
// // 			}
// // 		}
// // 		accumulator += frameTime;
// // 		while(accumulator >= timestep) {
// // 			// walk in reverse since we could be splicing.
// // 			for(let o = gameObjects.length - 1; o >= 0; o--) {
// // 				// delete objects flagged out of bounds
// // 				if(gameObjects[o].dirty) {
// // 					gameObjects[o].destroy();
// // 					gameObjects.splice(o,1);
// // 					continue;
// // 				}
// // 				if(!gameObjects[o].body.isStatic())
// // 					gameObjects[o].update(deltaTime);
// // 			}
// // 			world.step(deltaTime);				// step box2d
// // 			gameTime += timestep;
// // 			accumulator -= timestep;
// // 		}
// // 		render(accumulator / timestep);			// PIXI time.
// // 	}
// // 	lastTime = t;
// // }

// // function render(alpha) {
// // 	for(let o = 0; o < gameObjects.length; o++) {
// // 		gameObjects[o].integrate(alpha);
// // 	}
// // 	// Planck.js maintained box2d quite enthusiastically, including not-very-js ways of doing things.
// // 	// Being a C++ library written in ~2007, it iterates strangely for javascript programmers =)
// // 	// Also note, that most getters in planck.js are by reference, so that's fun!
// // 	// I did the level boundaries in a more vanilla way here, so we could see an example of that in action.
// // 	boundaryGraphics.clear();
// // 	for (var body = world.getBodyList(); body; body = body.getNext()) {
// // 		var userData = body.getUserData();
// // 		if("gameObject" in userData) continue;	// we skip to the next object if this is a gameObject (handled these above already)
// // 		for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
// // 			var shape = fixture.getShape();
// // 			if(shape.getType() == 'edge' && userData.myType == 'boundary') {
// // 				boundaryGraphics.lineStyle(3,0xFEEB77,1);
// // 				boundaryGraphics.moveTo(shape.m_vertex1.x*PixelsPerMeter,shape.m_vertex1.y*PixelsPerMeter);
// // 				boundaryGraphics.lineTo(shape.m_vertex2.x*PixelsPerMeter,shape.m_vertex2.y*PixelsPerMeter);
// // 			}
// // 		}
// // 	}
// // 	boundaryGraphics.endFill();
// // 	// Set our text for rendering.
// // 	infoText.text = "Steps: " + world.m_stepCount + " ("+ physicsSteps + "/sec @ " + frameTime.toFixed(2) + "ms)";
// // 	infoText.text += "\n#: " + gameObjects.length;
// // 	topText.text = 'SPACE: bunnies!    ENTER: random geometry    DEL: remove object    NumPad +/-: gravity (' + world.getGravity().y.toFixed(2) + ")";
// // 	topText.text += "    up / down : impulse (" + forceStrength.toFixed(2) + ")    " + "[ ] = timestep ("+timestep.toFixed(2)+")";
// // 	bottomText.text = "(L)ines: are "+(drawLines ? "On" : "Off")+"  (I)nterpolation: is "+(interpolation ? "On" : "Off")+"  (B)ulletMode: is "+(bulletMode ? "On" : "Off")+"";
// // 	bottomText.text += "        (C)ircle  (S)quare  (T)riangle         (R)eset Scene      Click an object to apply random force";
// // 	// And finally...
// // 	renderer.render(stage);
// // }
// // // When files are loaded and ready, we may begin.
// // loader.add('bunny','bunny.png')
// // 	.load( (loader,resources) => {
// // 		requestAnimationFrame(step);
// // 	});
// // // Input
// // document.addEventListener('keyup', (ev) => {

// // });
// // document.addEventListener('keydown',(ev) => {
// // 	if(ev.code == "BracketLeft") {
// // 		physicsSteps -= 5;
// // 		if(physicsSteps < 5) physicsSteps = 5;
// // 		timestep = 1000/physicsSteps;
// // 		deltaTime = timestep/1000;
// // 	}
// // 	if(ev.code == "BracketRight") {
// // 		physicsSteps += 5;
// // 		if(physicsSteps > 200) physicsSteps = 200;
// // 		timestep = 1000/physicsSteps;
// // 		deltaTime = timestep/1000;
// // 	}
// // 	if(ev.code == "Delete") {
// // 		deleteQueued = true;
// // 	}
// // 	if(ev.code == "ArrowDown") {
// // 		forceStrength -= 5;
// // 		if(forceStrength < 0) forceStrength = 0;
// // 	}
// // 	if(ev.code == "ArrowUp") {
// // 		forceStrength += 5;
// // 		if(forceStrength > 200) forceStrength = 200;
// // 	}
// // 	if(ev.code == "KeyR") deleteAll = true;
// // 	if(ev.code == "KeyB") bulletMode = bulletMode ? false : true;
// // 	if(ev.code == "KeyL") drawLines = drawLines ? false : true;
// // 	if(ev.code == "KeyI") interpolation = interpolation ? false : true;
// // 	if(ev.code == "NumpadAdd") {
// // 		var g = world.getGravity().clone();
// // 			g.y += 1;
// // 		if(g.y > 99) g.y = 99;
// // 		world.setGravity(g);
// // 	}
// // 	if(ev.code == "NumpadSubtract") {
// // 		var g = world.getGravity().clone();
// // 			g.y -= 1;
// // 		if(g.y < -99) g.y = -99;
// // 		world.setGravity(g);
// // 	}
// // 	if(ev.code == 'Space') {
// // 		var r = randrange(10,30)
// // 		var o = new GameObject({
// // 			world: world,
// // 			position: {x:200,y:200},
// // 			angle: Math.random(),
// // 			angularVelocity: randrange(1,5),
// // 			radius: r,
// // 			type: 'dynamic',
// // 			shape: 'circle',
// // 			color: randcolor(),
// // 			restitution: randrange(1,50) / 100,
// // 			friction: randrange(1,50) / 100,
// // 			density: randrange(r,r*2),
// // 			texture: 'bunny'
// // 		});
// // 		var force = planck.Vec2(forceStrength,forceStrength).mul(deltaTime*PixelsPerMeter*o.body.m_mass);
// // 		o.body.applyLinearImpulse(force,o.body.getWorldCenter());
// // 	}
// // 	if(ev.code == 'Enter') {
// // 		var shape;
// // 		var r = randrange(1,100)
// // 		if(r < 33) shape = 'triangle';
// // 		if(r >= 33 && r < 66) shape = 'box';
// // 		if(r >= 66) shape = 'circle';
// // 		var size = randrange(25,60);
// // 		var o = new GameObject({
// // 			world: world,
// // 			position: {x:200,y:200},
// // 			angle: Math.random(),
// // 			angularVelocity: 0,//randrange(1,5),
// // 			radius: size,
// // 			type: 'dynamic',
// // 			shape: shape,
// // 			color: randcolor(),
// // 			restitution: (100-size) / 100,
// // 			friction: size / 100,
// // 			density: (size * 2) / 100,
// // 			texture: null
// // 		});
// // 		var force = planck.Vec2(forceStrength,forceStrength).mul(deltaTime*PixelsPerMeter);
// // 		o.body.applyLinearImpulse(force,o.body.getWorldCenter());
// // 	}
// // 	if(ev.code == 'KeyT') {
// // 		var size = randrange(25,60);
// // 		var o = new GameObject({
// // 			world: world,
// // 			position: {x:200,y:200},
// // 			angle: Math.random(),
// // 			angularVelocity: 0,//randrange(1,5),
// // 			radius: size,
// // 			type: 'dynamic',
// // 			shape: 'triangle',
// // 			color: randcolor(),
// // 			restitution: (100-size) / 100,
// // 			friction: size / 100,
// // 			density: (size * 2) / 100,
// // 			texture: null
// // 		});
// // 		var force = planck.Vec2(forceStrength,forceStrength).mul(deltaTime*PixelsPerMeter);
// // 		o.body.applyLinearImpulse(force,o.body.getWorldCenter());
// // 	}
// // 	if(ev.code == 'KeyS') {
// // 		var size = randrange(25,70);
// // 		var o = new GameObject({
// // 			world: world,
// // 			position: {x:200,y:200},
// // 			angle: Math.random(),
// // 			angularVelocity: 0,//randrange(1,5),
// // 			radius: size,
// // 			type: 'dynamic',
// // 			shape: 'box',
// // 			color: randcolor(),
// // 			restitution: (100-size) / 100,
// // 			friction: size / 100,
// // 			density: (size * 2) / 100,
// // 			texture: null
// // 		});
// // 		var force = planck.Vec2(forceStrength,forceStrength).mul(deltaTime*PixelsPerMeter);
// // 		o.body.applyLinearImpulse(force,o.body.getWorldCenter());
// // 	}
// // 	if(ev.code == 'KeyC') {
// // 		var size = randrange(15,50);
// // 		var o = new GameObject({
// // 			world: world,
// // 			position: {x:200,y:200},
// // 			angle: Math.random(),
// // 			angularVelocity: 0,//randrange(1,5),
// // 			radius: size,
// // 			type: 'dynamic',
// // 			shape: 'circle',
// // 			color: randcolor(),
// // 			restitution: (100-size) / 100,
// // 			friction: size / 100,
// // 			density: (size * 2) / 100,
// // 			texture: null
// // 		});
// // 		var force = planck.Vec2(forceStrength,forceStrength).mul(deltaTime*PixelsPerMeter);
// // 		o.body.applyLinearImpulse(force,o.body.getWorldCenter());
// // 	}
// // });
// // /*
// // 	Box2d is a verbose library.  In addition, it has definitions each for Body, Fixture, and Shape; which can be overwhelming.
// // 	This is a basic class that blends some of the common ones and saves a bit of typing.
// // */
// // class GameObject {
// // 	constructor(opts) {
// // 		// If no texture is supplied we become a solid shape.
// // 		this.sprite = typeof opts.texture == 'string' ? new PIXI.Sprite.from(opts.texture) : new PIXI.Graphics();
// // 		this.debug = new PIXI.Graphics();
// // 		this.container = new PIXI.Container();
// // 		this.shapeType = opts.shape;
// // 		this.bulletCounter = 0;			// Expire our bullet flag after a short time; it's only needed for launching really.
// // 		this.world = opts.world;
// // 		this.dirty = false;				// Outside the game area, I should get removed.
// // 		this.body = this.world.createBody({
// // 			type: opts.type,
// // 			bullet: bulletMode,
// // 			angularVelocity: opts.angularVelocity,
// // 			position: { x: opts.position.x * MetersPerPixel, y: opts.position.y * MetersPerPixel },
// // 			userData: {	// We assign some userData for this body for future handling
// // 				gameObject:true
// // 			}
// // 		});
// // 		if(this.shapeType == 'box') {
// // 			this.body.createFixture(planck.Box((opts.radius/2)*MetersPerPixel,(opts.radius/2)*MetersPerPixel),{
// // 				friction: opts.friction,
// // 				restitution: opts.restitution,
// // 				density: opts.density
// // 			});
// // 			if(this.sprite instanceof PIXI.Sprite == false) {
// // 				this.sprite.beginFill(opts.color,1);
// // 				this.sprite.drawRect(0,0, opts.radius, opts.radius);
// // 				this.sprite.endFill();
// // 				// Boxes need their origin centralized, because box2d uses center of mass (this keeps our "sprite" within our body.
// // 				// Circles do this naturally
// // 				this.sprite.pivot.x = this.sprite.width / 2;
// // 				this.sprite.pivot.y = this.sprite.height / 2;
// // 			}
// // 		}
// // 		else if(this.shapeType == 'triangle') {
// // 			this.body.createFixture(planck.Polygon([
// // 				planck.Vec2(-opts.radius*MetersPerPixel, opts.radius*MetersPerPixel),
// // 				planck.Vec2(0, opts.radius*2*MetersPerPixel),
// // 				planck.Vec2(opts.radius*MetersPerPixel, opts.radius*MetersPerPixel)]), {
// // 				friction: opts.friction,
// // 				restitution: opts.restitution,
// // 				density: opts.density
// // 			});
// // 			if(this.sprite instanceof PIXI.Sprite == false) {
// // 				this.sprite.beginFill(opts.color,1);
// // 				this.sprite.drawPolygon([
// // 					new PIXI.Point(-opts.radius, opts.radius),
// // 					new PIXI.Point(0, opts.radius*2),
// // 					new PIXI.Point(opts.radius, opts.radius)
// // 				]);
// // 				this.sprite.endFill();
// // 			}
// // 		}
// // 		else if(this.shapeType == 'circle') {
// // 			this.body.createFixture(planck.Circle(opts.radius*MetersPerPixel), {
// // 				friction: opts.friction,
// // 				restitution: opts.restitution,
// // 				density: opts.density
// // 			});
// // 			if(this.sprite instanceof PIXI.Sprite == false) {
// // 				this.sprite.beginFill(opts.color,1);
// // 				this.sprite.drawCircle(0,0,opts.radius);
// // 				this.sprite.endFill();
// // 			}
// // 		} else throw("Unsupported physics shape!");
// // 		// For interpolation, we need to know our Body's previous physics state.
// // 		this.previousState = new PhysicsState();
// // 		this.previousState.assign(this.body.getPosition(),this.body.getAngle());
// // 		// If a texture is present, we need to center our origin
// // 		if(this.sprite instanceof PIXI.Sprite) {
// // 			this.sprite.pivot.x = this.sprite.width / 2;
// // 			this.sprite.pivot.y = this.sprite.height / 2;
// // 			this.sprite.scale.set(opts.radius*MetersPerPixel*(PixelsPerMeter/12),opts.radius*MetersPerPixel*(PixelsPerMeter/12));
// // 		}
// // 		// Container is our main interface to PIXI.
// // 		this.container.pivot.x = this.container.width / 2;
// // 		this.container.pivot.y = this.container.height / 2;
// // 		this.container.x = opts.position.x * PixelsPerMeter;
// // 		this.container.y = opts.position.y * PixelsPerMeter;
// // 		this.container.addChild(this.sprite);	// Add the sprite after you setup the container, lest it gets goofy.
// // 		spriteLayer.addChild(this.container);

// // 		this.container.interactive = true;
// // 		this.container.buttonMode = true;
// // 		this.container.on('pointerdown', this.click.bind(this));
// // 		// Debug lines
// // 		this.debug.x = this.container.x = opts.position.x;
// // 		this.debug.y = this.container.y = opts.position.y;
// // 		debugLayer.addChild(this.debug);
// // 		// Finally, we add ourselves to the list of game objects for future iteration.
// // 		gameObjects.push(this);
// // 	}
// // 	click() {
// // 		var fx = randrange(1,100) > 50 ? -randrange(1,100) / 100 : randrange(1,100) / 100;
// // 		var fy = randrange(1,100) > 50 ? -randrange(1,100) / 100 : randrange(1,100) / 100;
// // 		var force = planck.Vec2(fx,fy).mul(100*forceStrength*deltaTime*PixelsPerMeter);
// // 		// Force wake event
// // 		if(bulletMode) this.body.setBullet(true);
// // 		this.body.applyLinearImpulse(force,this.body.getWorldCenter(),true);
// // 	}
// // 	integrate(alpha) {
// // 		// Interpolate or snap?
// // 		this.container.x = interpolation ? (this.body.getPosition().x * alpha) * PixelsPerMeter + (this.previousState.position.x * (1-alpha)) * PixelsPerMeter : this.body.getPosition().x * PixelsPerMeter;
// // 		this.container.y = interpolation ? (this.body.getPosition().y * alpha) * PixelsPerMeter + (this.previousState.position.y * (1-alpha)) * PixelsPerMeter : this.body.getPosition().y * PixelsPerMeter;
// // 		this.container.rotation = interpolation ? this.body.getAngle() * alpha + this.previousState.angle * (1-alpha) : this.body.getAngle();	// we don't convert rotations

// // 		// If something is off the screen, we should get rid of it.
// // 		var p = this.body.getWorldCenter();
// // 		if( (p.x > renderer.screen.width*MetersPerPixel || p.x < 0) || (p.y > renderer.screen.height*MetersPerPixel || p.y < 0) )
// // 			this.dirty = true;
// // 		else this.dirty = false;

// // 		// Debug lines -- Yeah, these are not very fast, but useful for a testbed.
// // 		this.debug.clear();
// // 		if(drawLines) {
// // 			this.debug.x = this.container.x;
// // 			this.debug.y = this.container.y;
// // 			this.debug.rotation = interpolation ? this.body.getAngle() * alpha + this.previousState.angle * (1-alpha) : this.body.getAngle();
// // 			this.debug.lineStyle(1,0x00ff2a,1);
// // 			if(this.shapeType != 'circle') { // width and height don't seem to be a concept to boxes in box2d, so we go by their vertices.
// // 				for(var fixture = this.body.getFixtureList(); fixture; fixture = fixture.getNext()) {
// // 					var shape = fixture.getShape(); // we do make an assumption that there's just one fixture; keep this in mind if you add more.
// // 					this.debug.moveTo(shape.getVertex(0).x * PixelsPerMeter, shape.getVertex(0).y * PixelsPerMeter);
// // 					for(var v = 1; v < shape.m_count; v++) {
// // 						this.debug.lineTo(shape.getVertex(v).x * PixelsPerMeter, shape.getVertex(v).y * PixelsPerMeter);
// // 					}
// // 					this.debug.lineTo(shape.getVertex(0).x * PixelsPerMeter, shape.getVertex(0).y * PixelsPerMeter);
// // 				}
// // 			}
// // 			else if(this.shapeType == 'circle') {
// // 				var r = this.body.getFixtureList().getShape().m_radius;
// // 				this.debug.drawCircle(0,0,r * PixelsPerMeter);
// // 			}
// // 			this.debug.endFill();
// // 		}
// // 	}
// // 	update(dt) {
// // 		// turn off bullet mode after launch
// // 		if(this.body.isBullet()) this.bulletCounter += dt;
// // 		if(this.bulletCounter > 1) {
// // 			this.bulletCounter = 0;
// // 			this.body.setBullet(false);
// // 		}
// // 		// Store previous state
// // 		this.previousState.assign(this.body.getPosition(),this.body.getAngle());
// // 	}
// // 	destroy() {
// // 		// box2d cleanup
// // 		this.world.destroyBody(this.body);
// // 		// pixi cleanup
// // 		this.container.destroy({children: true});
// // 		this.debug.destroy();
// // 	}
// // }
// // class PhysicsState {
// // 	constructor() {
// // 		this.position = planck.Vec2(0,0);
// // 		this.angle = 0;
// // 	}
// // 	assign(position,a) {
// // 		this.position = planck.Vec2.clone(position);	// avoid the reference boogie-man
// // 		this.angle = a;
// // 	}
// // }
// // // Some helpers, just for fun.
// // function randrange(min,max) { return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); }
// // function randcolor() { return '0x'+Math.floor(Math.random()*16777215).toString(16) }
