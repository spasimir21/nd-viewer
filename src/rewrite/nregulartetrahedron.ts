function generateNRegularTetrahedronPoints(dimensions: number, sideLegth: number): number[][] {
  if (dimensions < 2) return [[-sideLegth / 2], [sideLegth / 2]];

  const points = generateNRegularTetrahedronPoints(dimensions - 1, sideLegth);

  const max = new Array(dimensions - 1).fill(-Infinity);
  const min = new Array(dimensions - 1).fill(Infinity);

  for (const point of points) {
    for (let i = 0; i < dimensions - 1; i++) {
      if (max[i] < point[i]) max[i] = point[i];
      if (min[i] > point[i]) min[i] = point[i];
    }
  }

  const newPoint = new Array(dimensions).fill(0);

  let squareSum = 0;

  for (let i = 0; i < dimensions - 1; i++) squareSum += max[i] ** 2;

  const newDimension = Math.sqrt(sideLegth ** 2 - squareSum);

  for (const point of points) point.push(-newDimension / 2);

  newPoint[dimensions - 1] = newDimension / 2;

  points.push(newPoint);

  console.log(points);

  return points;
}

function generateNRegularTetrahedronEdges(dimensions: number): [number, number][] {
  if (dimensions < 2) return [[0, 1]];

  const edges = generateNRegularTetrahedronEdges(dimensions - 1);

  for (let i = 0; i < dimensions; i++) edges.push([i, dimensions]);

  return edges;
}

export { generateNRegularTetrahedronPoints, generateNRegularTetrahedronEdges };
