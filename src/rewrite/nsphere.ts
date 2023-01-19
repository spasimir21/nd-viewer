function generateNSpherePoints(radius: number, counts: number[], dimensions = counts.length + 1): number[][] {
  if (dimensions <= 2) {
    const step = (2 * Math.PI) / counts[0];
    return new Array(counts[0]).fill(null).map((_, i) => [radius * Math.cos(i * step), radius * Math.sin(i * step)]);
  }

  const points: number[][] = [];

  const step = Math.PI / (counts[dimensions - 2] + 1);
  for (let i = 1; i <= counts[dimensions - 2]; i++) {
    const angle = -Math.PI / 2 + i * step;
    const newDimension = radius * Math.sin(angle);
    const sliceRadius = radius * Math.cos(angle);

    const slicePoints = generateNSpherePoints(sliceRadius, counts, dimensions - 1);
    for (const slicePoint of slicePoints) points.push([...slicePoint, newDimension]);
  }

  return points;
}

function generateNSphereEdges(counts: number[], dimensions = counts.length + 1): [number, number][] {
  if (dimensions <= 2) {
    const edges: [number, number][] = new Array(counts[0]).fill(null).map((_, i) => [i, i + 1]);
    edges[edges.length - 1][0] = edges.length - 1;
    edges[edges.length - 1][1] = 0;
    return edges;
  }

  const edges: [number, number][] = [];

  const slicePointCount = counts.slice(0, dimensions - 2).reduce((total, n) => total * n, 1);
  const sliceEdges = generateNSphereEdges(counts, dimensions - 1);
  for (let i = 0; i < counts[dimensions - 2]; i++)
    edges.push(...(sliceEdges.map(edge => [edge[0] + i * slicePointCount, edge[1] + i * slicePointCount]) as any));

  // if (dimensions == 3)
  for (let i = 0; i < counts[dimensions - 2] - 1; i++) {
    for (let j = 0; j < slicePointCount; j++) edges.push([i * slicePointCount + j, (i + 1) * slicePointCount + j]);
  }

  return edges;
}

export { generateNSpherePoints, generateNSphereEdges };
