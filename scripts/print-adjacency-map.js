const nodes = 110;



const generateAdacencyMap = (map) => {
    for(let i=0; i<map.length; i++){
        for(let j=0; j<map[1].length; j++){
            let upIndexNode = -1;
            let downIndexNode = -1;
            let leftIndexNode = -1;
            let rightIndexNode = -1;

            if(i > 0){
                upIndexNode = getUpNodeIndex(i,j);
            }

            if(j > 0){
                leftIndexNode = getLeftNodeIndex(i,j);
            }

            if(j < (map[i].length-1)){
                rightIndexNode = getRightNodeIndex(i,j);
            }

            if(i < (map.length-1)){
                downIndexNode = getDownNodeIndex(i,j);
            }

            process.stdout.write('[');
            for(let k=0; k<((map.length) * (map[i].length)); k++){
                if(k == upIndexNode){
                    process.stdout.write(`${printMapCoord(map[i-1][j])},`)
                }else if(k == leftIndexNode){
                    process.stdout.write(`${printMapCoord(map[i][j-1])},`)
                }else if(k == rightIndexNode){
                    process.stdout.write(`${printMapCoord(map[i][j+1])},`)
                }else if(k == downIndexNode){
                    process.stdout.write(`${printMapCoord(map[i+1][j])},`)
                }else{
                    process.stdout.write(`0,`)
                }

                let rest = k%(map[2].length);
                if(k != 0 && (k+1)%(map[2].length) == 0){
                    process.stdout.write(' ');
                }
            }
            process.stdout.write('],');
            process.stdout.write("\n");
        }
    }
}

const translatePosToNodeIndex = (x,y) => {
    //Traduz as coordenadas de map para o número do nó no mapa de adjacência.
    const columns = 28;
    const lines = 9;
    return x*columns + y;
}

const getUpNodeIndex = (x,y) => {
    return translatePosToNodeIndex(x-1, y);
}

const getDownNodeIndex = (x,y) => {
    return translatePosToNodeIndex(x+1, y);
}

const getLeftNodeIndex = (x,y) => {
    return translatePosToNodeIndex(x, y-1);
}

const getRightNodeIndex = (x,y) => {
    return translatePosToNodeIndex(x, y+1);
}

const printMapCoord = (mapValue) => {
    //Corrige o valor da coordenada x,y em caso de ser o pacman, inimigo, ou moeda.
    if(mapValue == 5 || mapValue == 3 || mapValue == 4){
        return 1
    }else{
        return mapValue
    }
}

map = [
    [
      999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999,
      999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999,
    ],
    [
      999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 5, 3, 999,
    ],
    [
      999, 1, 1, 1, 1, 1, 1, 999, 999, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 999, 999, 999, 999, 999, 999, 999,
      999, 999, 999, 999, 999, 999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 999, 999, 999, 999, 1, 1, 999, 2, 2, 999, 999, 999,
      999, 999, 1, 1, 1, 1, 2, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 999, 1, 1, 1, 1,
      2, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 999, 1, 1, 1, 1,
      999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 999, 999, 999, 1, 1, 999, 999, 999, 1, 1, 999,
      1, 1, 1, 1, 999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 999, 1, 1, 1, 1, 1, 1, 999, 1, 1, 999, 1, 1,
      1, 1, 999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 2, 2, 2, 2, 999, 1, 1, 1, 5, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1,
      999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      999, 1, 1, 1, 999,
    ],
    [
      999, 1, 1, 1, 999, 1, 1, 1, 999, 999, 999, 1, 1, 999, 999, 999, 1, 1, 999,
      1, 1, 1, 1, 999, 1, 1, 1, 999,
    ],
    [
      999, 4, 1, 1, 999, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 999, 1, 1, 1, 1,
      1, 1, 1, 1, 999,
    ],
    [
      999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999,
      999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999,
    ],
  ];

  // console.log(map[0].length)
  generateAdacencyMap(map)