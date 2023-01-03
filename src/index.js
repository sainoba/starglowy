const badgesUrls = [
  "./images/badges/acnh.png",
  "./images/badges/apollo.png",
  "./images/badges/applejac.png",
  "./images/badges/baji.png",
  "./images/badges/crepi1.png",
  "./images/badges/crepi2.png",
  "./images/badges/haru.png",
  "./images/badges/itto.png",
  "./images/badges/kabuki.png",
  "./images/badges/kamilo.png",
  "./images/badges/kirby1.png",
  "./images/badges/kirby2.png",
  "./images/badges/klee.png",
  "./images/badges/molly1.png",
  "./images/badges/molly2.png",
  "./images/badges/Neeko.png",
  "./images/badges/qiqi.png",
  "./images/badges/usagi.png",
  "./images/badges/xayah.png",
]

function getMeta(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  // Matter.js module aliases
  var Bodies = Matter.Bodies,
  Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Engine = Matter.Engine,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Render = Matter.Render,
    Svg = Matter.Svg,
    World = Matter.World
    ;

  // PIXI Globals
  var renderer, stage;

  
  // Scene Container
  const sceneContainer = document.querySelector(".scene");
  const canvasWidth = sceneContainer.offsetWidth;
  const canvasHeight = sceneContainer.offsetHeight;
  let canvasPrevWidth = canvasWidth;
  let canvasPrevHeight = canvasHeight;

  /*--------------------------
  Engine
  ---
  Setup the Matter engine. This is what the Matter bodies will run in.
  --------------------------*/

  const engine = Engine.create();

  /*--------------------------
  Pixi Data
  --------------------------*/

  const images = [
    {
      src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 500,
        y: 180,
      },
      width: 200,
      height: 100,
    },
  ];


  /*--------------------------
  Scene Objects
  --------------------------*/

  // Array of objects we want to track in the scene. This will be populated as we create our bodies and sprites from the images.
  const sceneObjects = [];
  const sceneBadgeObjects = [];

  /*--------------------------
  Setup Walls
  ---
  Walls will keep our bodies and sprites within a confined area.
  --------------------------*/

  const wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 10, {
    isStatic: true,
  });
  const wallBottom = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight,
    canvasWidth,
    10,
    {
      isStatic: true,
    }
  );
  const wallRight = Bodies.rectangle(
    canvasWidth,
    canvasHeight / 2,
    10,
    canvasHeight,
    {
      isStatic: true,
    }
  );
  const wallLeft = Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
    isStatic: true,
  });


  // Add Matter walls to the world. This will keep the bodies within certain parameters.
  World.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight]);


  /*--------------------------
  Pixi
  --------------------------*/

  // Setup Pixi renderer to match the same size as the Matter world.
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: sceneContainer,
  });

  // Put the Pixi apps canvas into the scene container.
  document.querySelector(".scene").appendChild(app.view);


 /*--------------------------
  Create Scene Object
  --------------------------*/

  function createRectangleSceneObject(image) {
    // Matter Body
    const imageBody = Bodies.rectangle(
      image.initialPosition.x,
      image.initialPosition.y,
      image.width,
      image.height,
      // {
      //   restitution: 0.8,
      // }
    );
    createSceneObject(imageBody, image.width, image.height, image.src);
  }

  

  function createCircleSceneObject(image) {
    const imageBody = Bodies.circle(
      image.initialPosition.x,
      image.initialPosition.y,
      image.width/2,
    );
    createSceneObject(imageBody, image.width, image.height, image.src);
    sceneBadgeObjects.push(imageBody);
  }

  

  function createSceneObject(imageBody, imgWidth, imgHeight, imgSrc) {
    World.addBody(engine.world, imageBody);

    // Pixi Sprite
    // The sprite can be anything from the Pixi api. Video, image, make it into a circle, mask it, etc. You just need to make sure the proper anchor point is set, its added to the stage and that it follows the body in our pixi app ticker.
    const imageSprite = new PIXI.Sprite.from(imgSrc);
    imageSprite.width = imgWidth;
    imageSprite.height = imgHeight;
    imageSprite.position;
    imageSprite.anchor.set(0.5, 0.5);
    app.stage.addChild(imageSprite);

    // Add the complete scene object (body and sprite) to our array of objects. We'll track those objects in the pixi frame updates (see app.ticker below).
    sceneObjects.push({
      body: imageBody,
      sprite: imageSprite,
    });
  }

  /*--------------------------
  Pixi Frame Updates
  --------------------------*/

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      // Make all pixi sprites follow the position and rotation of their body.
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  /*--------------------------
  Mouse Control
  ---
  Add the mouse to the Pixi frame. This is how you enable interaction with the bodies. We aren't using the Matter renderer so need the mouse to be attached to our invisible Matter engine that runs on top of the Pixi world.
  --------------------------*/

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(document.querySelector(".scene canvas")),
  });

  World.add(engine.world, mouseConstraint);

  /*--------------------------
  Window Resize
  ---
  Ensure the objects are still bounded to the containers walls even in the case of resizing the browser.
  --------------------------*/

  window.addEventListener("resize", function (event) {
    // Save the new canvas width
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;

    // Reposition all the walls and scale them so they retain their width/height.
    Body.setPosition(wallLeft, {
      x: 0,
      y: canvasHeight / 2,
    });
    Body.scale(wallLeft, 1, canvasHeight / canvasPrevHeight);

    Body.setPosition(wallRight, {
      x: canvasWidth,
      y: canvasHeight / 2,
    });
    Body.scale(wallRight, 1, canvasHeight / canvasPrevHeight);

    Body.setPosition(wallTop, {
      x: canvasWidth / 2,
      y: 0,
    });
    Body.scale(wallTop, canvasWidth / canvasPrevWidth, 1);

    Body.setPosition(wallBottom, {
      x: canvasWidth / 2,
      y: canvasHeight,
    });
    Body.scale(wallBottom, canvasWidth / canvasPrevWidth, 1);

    // Set the new canvas dimensions as the previous. We use this so we can properly scale the environment.
    canvasPrevWidth = canvasWidth;
    canvasPrevHeight = canvasHeight;
  });

  /*--------------------------
  Run
  ---
  This is where we create the initial objects and start the engine.
  --------------------------*/

  // Create the bodies and sprites.
  images.forEach((image) => {
    createRectangleSceneObject(image);
  });

  // Coso 
  
  badgesUrls.forEach(badgeUrl => {
    getMeta(badgeUrl).then(img => {
      raidus = 25;
      circle = Bodies.circle(300, 100, raidus, {
        render: {
          sprite: {
            texture: badgeUrl,
            xScale: (raidus * 2) / img.width,
            yScale: (raidus * 2) / img.height
          }
        }
      });
      createCircleSceneObject({
        src: badgeUrl,
        initialPosition: {
          x: 300,
          y: 180,
        },
        width: img.width,
        height: img.height,

      });
    });

  });

  // Run the Matter engine. This continuously updates the Matter.Engine. It ensures we can listen for the updates on each tick and move the Pixi objects with Matter bodies (see app.ticker function).
  Matter.Runner.run(engine);




  function isOffScreen(item) {
    // Save the new canvas width
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;

    if (item.position.x > canvasWidth || item.position.x < 0) {
      return true;
    }
    if (item.position.y > canvasHeight || item.position.y < 0) {
      return true;
    }
    return false;
  }
  

  app.ticker.add(() => {
    // Save the new canvas width
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;

    sceneBadgeObjects.forEach((object) => {
      // Reset items that are off screen
      if(isOffScreen(object)) {
        Matter.Body.set(object, "position", { x: canvasWidth/2, y: 1 });
        Matter.Body.set(object, "velocity", { x: 0, y: 1 });
      }
    });
  });
});
