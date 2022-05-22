export function dijkstra(grafo, origem, destino){
    //Distâncias do nó de origem para todos os outros nós.
    let distancias = [];
    let pais = [];

    //Inicializo as distâncias como infinito
    for(let i=0; i < grafo.length; i++) distancias[i] = Number.MAX_VALUE;

    //Inicializo os pais com valor inválido
    for(let i=0; i < grafo.length; i++) pais[i] = -1;

    //A distância do nó raiz é zero
    distancias[origem] = 0;

    //O pai do nó de origem é Nulo
    pais[origem] = null;

    let visitados = [];

    //Enquanto restar nós a serem visitados
    while(true){
        //Encontra o nó com a menor distâncio corrente do nó raiz.
        let distanciaMaisCurta = Number.MAX_VALUE;
        let indexNoMenorDistancia = -1;

        for(let i=0; i < grafo.length; i++){
            //Passei por todos os nós que ainda não foram visitados
            if(distancias[i] < distanciaMaisCurta && !visitados[i]){
                distanciaMaisCurta = distancias[i];
                indexNoMenorDistancia = i;
            }
        }

        if(indexNoMenorDistancia == -1) {
            let shortestPath = [];
            shortestPath.push(destino);
            let auxDestino = destino;
            while(true){
                if(pais[auxDestino] != null){
                    shortestPath.push(pais[auxDestino]);
                    auxDestino = pais[auxDestino];
                }else{
                    break
                }
            }
            return {dist: distancias, parents: pais, shortestPath: shortestPath.reverse()}
        }

        for(let i=0; i < grafo[indexNoMenorDistancia].length; i++){
            if(grafo[indexNoMenorDistancia][i] !== 0 && distancias[i] > distancias[indexNoMenorDistancia] + grafo[indexNoMenorDistancia][i]){
                distancias[i] = distancias[indexNoMenorDistancia] + grafo[indexNoMenorDistancia][i];
                pais[i] = indexNoMenorDistancia;
            }
        }

        visitados[indexNoMenorDistancia] = true;
    }

}