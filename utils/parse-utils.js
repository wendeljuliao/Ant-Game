import MovingDirection from "../src/MovingDirection.js";

export function translatePosToNodeIndex(x,y){
    //Traduz as coordenadas de map para o número do nó no mapa de adjacência.
    const columns = 10;
    return y*columns + x;
}

export function getCoordFromNodeIndex(nodeIndex){
    //Retorna as coordenadas X e Y a partir do índice do nó.
    const columns = 10;
    const y = parseInt(nodeIndex/columns);
    const x = nodeIndex%columns;

    return {x:x, y:y}
}

export function getNewMoveDirection(originNodeIndex, destNodeIndex){
    if(destNodeIndex == (originNodeIndex+1)){
        return MovingDirection.right;
    }else if(destNodeIndex == (originNodeIndex-1)){
        return MovingDirection.left;
    }else if(destNodeIndex == (originNodeIndex+10)){
        return MovingDirection.down;
    }else if(destNodeIndex == (originNodeIndex-10)){
        return MovingDirection.up;
    }
}