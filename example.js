const cv = document.querySelector("game-canvas");

let player = {
  x: 0,
  y: 50,
  z: 1,
  width: 100,
  height: 100,
  image: "https://via.placeholder.com/100",
  rotation: 0,
};

let button = {
  x: 200,
  y: 200,
  z: 10,
  width: 100,
  height: 100,
  color: "blue",
  rotation: 0,
  touching: false,
};

function update() {
  
  const rect = cv.rect(
    button.width, 
    button.height, 
    button.width, 
    button.height, 
    button.color, 
    button.rotate, 
    button.z
  );

  const spr = cv.spr(
    player.x, 
    -player.y, 
    player.width, 
    player.height, 
    player.image, 
    player.rotation, 
    player.z
  );

  rect.onTouch(() => {
    console.log("Sprite Touched!");
    button.touching = true;
  });

  rect.onRelease(() => {
    console.log("Sprite Released!");
    button.touching = false;
  });

  if (button.touching) {
    spr.x += 5;
    spr.rotate += 1;
  }

  requestAnimationFrame(update);
}

update();
