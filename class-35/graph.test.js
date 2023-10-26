const Graph = require("./graph");

describe("graph implementation", () => {
  test("we can add verticies", () => {
    const myGraph = new Graph();
    myGraph.addVertex(3);
    myGraph.addVertex(5);
    expect(myGraph.adjacencyList.size).toBe(2);
  });
  test("we can return an array of graph verticies", () => {
    const myGraph = new Graph();
    myGraph.addVertex(3);
    myGraph.addVertex(5);
    expect(myGraph.getVerticies().length).toEqual(2);
  });
});
