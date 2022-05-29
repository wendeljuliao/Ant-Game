import MovingDirection from "./MovingDirection.js";
import { dijkstra } from "../utils/dijkstra.js";
import {
  translatePosToNodeIndex,
  getNewMoveDirection,
  getCoordFromNodeIndex,
} from "../utils/parse-utils.js";
import { adjacencyMatrix } from "../utils/adjacency-matrix.js";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );

    this.directionTimerDefault = this.#random(10, 25);
    this.directionTimer = this.directionTimerDefault;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
    this.shortestPath = [];
  }

  getCoordinates() {
    if (
      Number.isInteger(this.x / this.tileSize) &&
      Number.isInteger(this.y / this.tileSize)
    ) {
      return { x: this.x / this.tileSize, y: this.y / this.tileSize };
    }
    return undefined;
  }

  drawPath(ctx) {
    for (let i = 0; i < this.shortestPath.length - 1; i++) {
      const { x, y } = getCoordFromNodeIndex(this.shortestPath[i]);
      ctx.drawImage(
        this.crumbs,
        x * this.tileSize,
        y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
  }

  draw(ctx, pause, pacman) {
    if (!pause) {
      this.#move();
      this.#changeDirection(pacman);
    } else {
      this.drawPath(ctx);
    }
    this.#setImage(ctx, pacman);

    // COORDENADAS DO INIMIGO
    //console.log(this.getCoordinates());

    // COORDENADAS DO PLAYER
    //console.log(pacman.getCoordinates());
  }

  collideWith(pacman) {
    const size = this.tileSize / 2;
    if (
      this.x < pacman.x + size &&
      this.x + size > pacman.x &&
      this.y < pacman.y + size &&
      this.y + size > pacman.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  #setImage(ctx, pacman) {
    if (pacman.powerDotActive) {
      this.#setImageWhenPowerDotIsActive(pacman);
    } else {
      this.image = this.normalGhost;
    }
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #setImageWhenPowerDotIsActive(pacman) {
    if (pacman.powerDotAboutToExpire) {
      this.scaredAboutToExpireTimer--;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        if (this.image === this.scaredGhost) {
          this.image = this.scaredGhost2;
        } else {
          this.image = this.scaredGhost;
        }
      }
    } else {
      this.image = this.scaredGhost;
    }
  }

  #changeDirection(pacman) {
    this.directionTimer = 0;
    let newMoveDirection = null;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;

      let enemyX = Math.ceil(this.x / this.tileSize);
      let enemyY = Math.ceil(this.y / this.tileSize);

      let pacmanX = Math.ceil(pacman.x / this.tileSize);
      let pacmanY = Math.ceil(pacman.y / this.tileSize);

      const originNodeIndex = translatePosToNodeIndex(enemyX, enemyY);
      const destNodeIndex = translatePosToNodeIndex(pacmanX, pacmanY);
      this.shortestPath = dijkstra(
        adjacencyMatrix,
        originNodeIndex,
        destNodeIndex
      ).shortestPath;
      this.shortestPath.shift();
      newMoveDirection = getNewMoveDirection(
        originNodeIndex,
        this.shortestPath[0]
      );
      this.shortestPath.shift();
    }

    if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  #move() {
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = "images/locust1.png";

    this.scaredGhost = new Image();
    this.scaredGhost.src = "images/scaredGhost.png";

    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = "images/scaredGhost2.png";

    this.crumbs = new Image();
    this.crumbs.src = "images/pinkDot.png";

    this.image = this.normalGhost;
  }
}
