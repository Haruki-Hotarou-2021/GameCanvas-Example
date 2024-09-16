const cv = document.querySelector("game-canvas");

let player = {
  x: 0,
  y: 50,
  z: 1,
  width: 100,
  height: 100,
  image: "https://via.placeholder.com/100",
  rotate: 0,
};

let button = {
  x: 400,
  y: -400,
  z: 10,
  width: 100,
  height: 100,
  color: "blue",
  rotate: 0,
  touching: false,
};

function update() {
  cv.clear();

  const rect = cv.rect(
    button.x,
    -button.y,
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
    player.rotate,
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
    player.x += 1;
    player.rotate += 1;
  }

  requestAnimationFrame(update);
}

update();