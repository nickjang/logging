class Graph {
  adjacencyList = {};

  /**     Build Graph    **/

  verticesExist(vertices) {
    let exist = true;
    vertices.forEach(vertex => {
      if (!this.adjacencyList[vertex])
        exist = false;
    });
    return exist;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    if (this.verticesExist([v1, v2])) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }
  }

  removeEdge(v1, v2) {
    if (this.verticesExist([v1, v2])) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      while (this.adjacencyList[vertex].length) {
        const adjacentVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, adjacentVertex);
        delete this.adjacencyList[vertex];
      }
    }
  }

  /**     Traverse Graph    **/

  dfsRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) return dfs(neighbor);
      });
    })(start);

    return result;
  }

  dfsIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    let currVertex;

    visited[start] = true;
    while (stack.length) {
      currVertex = stack.pop();
      result.push(currVertex);

      this.adjacencyList[currVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currVertex;

    visited[start] = true;

    while (queue.length) {
      currVertex = queue.shift();
      result.push(currVertex);

      this.adjacencyList[currVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}


export default Graph;