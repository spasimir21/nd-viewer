function pointsToPointBuffer(dimensions: number, points: number[][]): Float32Array {
  const buffer = new Float32Array(dimensions * points.length);

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) buffer[i * dimensions + j] = points[i][j];
  }

  return buffer;
}

function edgesToEdgeBuffer(edges: [number, number][]): Uint32Array {
  const buffer = new Uint32Array(2 * edges.length);

  for (let i = 0; i < edges.length; i++) {
    buffer[i * 2] = edges[i][0];
    buffer[i * 2 + 1] = edges[i][1];
  }

  return buffer;
}

export { pointsToPointBuffer, edgesToEdgeBuffer };
