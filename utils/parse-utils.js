import MovingDirection from "../src/MovingDirection.js";

const COLUMNS = 28;
const LINES = 16;

export function translatePosToNodeIndex(x, y) {
  //Traduz as coordenadas de map para o número do nó no mapa de adjacência.
  return y * COLUMNS + x;
}

export function getCoordFromNodeIndex(nodeIndex) {
  //Retorna as coordenadas X e Y a partir do índice do nó.
  const y = parseInt(nodeIndex / COLUMNS);
  const x = nodeIndex % COLUMNS;

  return { x: x, y: y };
}

export function getNewMoveDirection(originNodeIndex, destNodeIndex) {
  if (destNodeIndex == originNodeIndex + 1) {
    return MovingDirection.right;
  } else if (destNodeIndex == originNodeIndex - 1) {
    return MovingDirection.left;
  } else if (destNodeIndex == originNodeIndex + COLUMNS) {
    return MovingDirection.down;
  } else if (destNodeIndex == originNodeIndex - COLUMNS) {
    return MovingDirection.up;
  }
}
