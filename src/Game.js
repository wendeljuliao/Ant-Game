import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
let isBntPausado = false;
const gameOverSound = new Audio("sounds/gameOver.wav");
const gameWinSound = new Audio("sounds/gameWin.wav");

document.addEventListener("click", btnPausar);

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman, isBntPausado));
  pacman.draw(ctx, pause(), enemies, isBntPausado);
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function btnPausar(event) {
  //console.log(event);
  if (event.target.value == "Pausar") {
    document.getElementById("pausar").style.backgroundColor =
      "rgb(10, 10, 100)";

    event.target.value = "Continuar";
    isBntPausado = true;

    document.getElementById("content-peso").style.display = "flex";
    document.getElementById("content-peso2").style.display = "flex";
    return;
  } else if (event.target.value == "Continuar") {
    document.getElementById("pausar").style.backgroundColor = "red";

    event.target.value = "Pausar";
    isBntPausado = false;

    document.getElementById("content-peso").style.display = "none";
    document.getElementById("content-peso2").style.display = "none";
    return;
  }
  return;
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin || isBntPausado;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = " You Win!";
    if (gameOver) {
      text = "Game Over";
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height / 4, canvas.width, 200);

    ctx.font = "75px comic sans";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText(text, canvas.width / 4, canvas.height / 2);
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 60);
