function generateNCubeVertices(n: number): number[][] {
  if (n <= 1) return [[1], [-1]];

  const prevVertices = generateNCubeVertices(n - 1);

  return [...prevVertices.map(vertex => [...vertex, 1]), ...prevVertices.map(vertex => [...vertex, -1])];
}

function generateNCubeEdges(n: number): [number, number][] {
  if (n <= 1) return [[0, 1]];

  const edges = generateNCubeEdges(n - 1);
  const prevVertexCount = 1 << (n - 1);

  edges.push(...(edges.map(edge => edge.map(n => n + prevVertexCount)) as [number, number][]));

  for (let i = 0; i < prevVertexCount; i++) edges.push([i, i + prevVertexCount]);

  return edges;
}

export { generateNCubeVertices, generateNCubeEdges };
