import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = "images/yellowDot.png";

    this.pinkDot = new Image();
    this.pinkDot.src = "images/pinkDot.png";

    this.wall = new Image();
    this.wall.src = "images/wall.png";

    this.sandBlock = new Image();
    this.sandBlock.src = "images/blocks/sandBlock.png";

    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;

    /*  this.#addOuvintesMatriz(this.map); */

    //document.addEventListener("click", this.#click);
  }

  //0 - dots
  //1 - wall
  //2 - sand block
  //4 - pacman
  //5 - empty space
  //6 - enemy
  //7 - power dot
  /*   map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]; */

  //1 - empty space
  //2 - sand block
  //3 - dots
  //4 - pacman
  //5 - enemy
  //999 - wall

  map = [
    [999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 3, 999],
    [999, 5, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 1, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 4, 1, 1, 1, 1, 1, 1, 2, 999],
    [999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
  ];

  /* #addOuvintesMatriz(map) {
    for (let row = 0; row < map.length; row++) {
      for (let column = 0; column < map[row].length; column++) {
        map[row][column].addEventListener("click", function () {
          console.log("you clicked region number " + index);
        });
      }
    }
  } */

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 999) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 3) {
          this.#drawDot(ctx, column, row, this.tileSize);
        } else if (tile === 2) {
          this.#drawSandBlock(ctx, column, row, this.tileSize);
        } else if (tile == 7) {
          this.#drawPowerDot(ctx, column, row, this.tileSize);
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }

        // ctx.strokeStyle = "yellow";
        // ctx.strokeRect(
        //   column * this.tileSize,
        //   row * this.tileSize,
        //   this.tileSize,
        //   this.tileSize
        // );
      }
    }
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnmationTimer--;
    if (this.powerDotAnmationTimer === 0) {
      this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawSandBlock(ctx, column, row, size) {
    ctx.drawImage(
      this.sandBlock,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  /*   #click = (event) => {
    console.log(event);
    if (event.target.innerText == "Fantasma") {
      console.log("true");
      this.map[4][4] = 6;
    } else if (event.target.innerText == "Muro") {
      let disponivelMuro = document.getElementById("disponivelMuro");

      if (parseInt(disponivelMuro.innerText) > 0) {
        let restante = parseInt(disponivelMuro.innerText) - 1;
        disponivelMuro.innerText = restante;

        let localMuro = document.getElementById("localMuro");

        let [linha, coluna] = localMuro.value.split(" ");

        this.map[parseInt(linha)][parseInt(coluna)] = 1;
      }
    }
  }; */

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile == 5) {
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  isSandBlock(x, y) {
    const row = Math.ceil(y / this.tileSize);
    const column = Math.ceil(x / this.tileSize);
    const tile = this.map[row][column];
    if (tile === 2) {
      console.log("Sand");
      return true;
    }
    return false;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 999) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#dotsLeft() === 0;
  }

  #dotsLeft() {
    return this.map.flat().filter((tile) => tile === 3).length;
  }

  eatDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 3) {
        this.map[row][column] = 1;
        return true;
      }
    }
    return false;
  }

  eatPowerDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 7) {
        this.map[row][column] = 1;
        return true;
      }
    }
    return false;
  }
}
