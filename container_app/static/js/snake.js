// === Enkel, stabil Snake-version ===

// Canvas och context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// UI-element
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");
const speedSelect = document.getElementById("speedSelect");
const speedLabel = document.getElementById("speedLabel");

// Spelparametrar
const tileSize = 20;
const tileCount = canvas.width / tileSize;

// Spelstate
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = parseInt(localStorage.getItem("snake_high_score") || "0", 10);
let lastTime = 0;
let speed = parseInt(speedSelect.value, 10); // ms mellan uppdateringar

highScoreEl.textContent = highScore.toString();

// Initiera spel
function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  scoreEl.textContent = "0";
  placeFood();
}

// Slumpa ut mat
function placeFood() {
  while (true) {
    const x = Math.floor(Math.random() * tileCount);
    const y = Math.floor(Math.random() * tileCount);
    const onSnake = snake.some(seg => seg.x === x && seg.y === y);
    if (!onSnake) {
      food = { x, y };
      break;
    }
  }
}

// Rita en ruta
function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize - 1, tileSize - 1);
}

// Uppdatera spelstate
function update() {
  // uppdatera riktning
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Väggkrock
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  // Självkrock
  if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Åt mat?
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score.toString();
    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore.toString();
      localStorage.setItem("snake_high_score", String(highScore));
    }
    placeFood();
  } else {
    snake.pop();
  }
}

// Rita scenen
function draw() {
  ctx.fillStyle = "#111827";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // mat
  drawTile(food.x, food.y, "#f97316");

  // orm
  snake.forEach((seg, i) => {
    const color = i === 0 ? "#22c55e" : "#4ade80";
    drawTile(seg.x, seg.y, color);
  });
}

// Game loop med requestAnimationFrame
function loop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;

  if (delta > speed) {
    lastTime = timestamp;
    update();
    draw();
  }

  requestAnimationFrame(loop);
}

// Game over-overlay
function gameOver() {
  ctx.fillStyle = "rgba(15,23,42,0.9)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f9fafb";
  ctx.font = "24px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = "16px system-ui";
  ctx.fillText(
    `Poäng: ${score}  |  Rekord: ${highScore}`,
    canvas.width / 2,
    canvas.height / 2 + 20
  );

  // starta om automatiskt nästa gång man trycker "Starta om"
}

// Input – piltangenter + WASD
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "arrowup" || key === "w") {
    if (direction.y === 1) return;
    nextDirection = { x: 0, y: -1 };
  } else if (key === "arrowdown" || key === "s") {
    if (direction.y === -1) return;
    nextDirection = { x: 0, y: 1 };
  } else if (key === "arrowleft" || key === "a") {
    if (direction.x === 1) return;
    nextDirection = { x: -1, y: 0 };
  } else if (key === "arrowright" || key === "d") {
    if (direction.x === -1) return;
    nextDirection = { x: 1, y: 0 };
  }
});

// Restart-knapp
restartBtn.addEventListener("click", () => {
  resetGame();
});

// Byta hastighet
speedSelect.addEventListener("change", () => {
  speed = parseInt(speedSelect.value, 10);
  const label =
    speed <= 50 ? "Snabb" :
    speed <= 80 ? "Normal" :
    "Långsam";
  speedLabel.textContent = label;
});

// Starta spelet
resetGame();
requestAnimationFrame(loop);
