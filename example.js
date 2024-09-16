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

// Keys
const keys = {
  aPressed: false,
  sPressed: false,
  dPressed: false,
  wPressed: false,
};

function update() {
  // Limpa a tela
  cv.clear();

  // Desenha um retângulo
  const rect = cv.rect(
    button.x,
    -button.y,
    button.width,
    button.height,
    button.color,
    button.rotate,
    button.z
  );

  // Desenha um sprite
  const spr = cv.spr(
    player.x,
    -player.y,
    player.width,
    player.height,
    player.image,
    player.rotate,
    player.z
  );

  // Adiciona listener para quando o retângulo é tocado
  rect.onTouch(() => {
    console.log("Sprite Touched!");
    button.touching = true;
  });

  // Adiciona listener para quando o retângulo é solto
  rect.onRelease(() => {
    console.log("Sprite Released!");
    button.touching = false;
  });

  // Adiciona listener para quando a tecla é pressionada
  document.addEventListener("keydown", (event) => {
    if (event.key === "d" || event.key === "D") {
      keys.dPressed = true;
    }
  });

  // Adiciona listener para quando a tecla é solta
  document.addEventListener("keyup", (event) => {
    if (event.key === "d" || event.key === "D") {
      keys.dPressed = false;
    }
  });

  // Move o player
  if (button.touching || keys.dPressed) {
    player.x += 1;
    player.rotate += 1;
  }

  // Chama a função update em loop
  requestAnimationFrame(update);
}

// Inicia a função update
update();


