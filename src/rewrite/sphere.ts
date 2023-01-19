// x = r * cos(a1) * cos(a0)
// y = r * cos(a1) * sin(a0)
// z = r * sin(a1)
//
// -pi/2 <= a1 <= pi/2
// 0 <= a0 <= 2 * pi

function generate3DSpherePoints(r: number, n: number, m: number): [number, number, number][] {
  const points: [number, number, number][] = [[0, 0, -r]];

  const a1Step = Math.PI / (m + 1);
  const a0Step = (2 * Math.PI) / n;
  for (let i = 1; i <= m; i++) {
    const a1 = -Math.PI / 2 + i * a1Step;
    for (let j = 0; j < n; j++) {
      const a0 = j * a0Step;
      points.push([r * Math.cos(a1) * Math.cos(a0), r * Math.cos(a1) * Math.sin(a0), r * Math.sin(a1)]);
    }
  }

  points.push([0, 0, r]);

  return points;
}

function generate3DSphereEdges(n: number, m: number): [number, number][] {
  const edges: [number, number][] = [];

  // for (let i = 1; i <= n; i++) edges.push([0, i]);

  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) {
      edges.push([i * n + j, i * n + j + 1]);
    }

    edges.push([i * n + n, i * n + 1]);
  }

  for (let i = 0; i < m - 1; i++) {
    for (let j = 1; j <= n; j++) {
      edges.push([i * n + j, (i + 1) * n + j]);
    }
  }

  // for (let i = 0; i <= n; i++) edges.push([1 + n * (m - 1) + i, 1 + n * m]);

  return edges;
}

export { generate3DSpherePoints, generate3DSphereEdges };
