import { toNDPoint } from './geometryHelpers';

// prettier-ignore
const CUBE_VERTICES = [
  // Front Face
  [-1, 1, 1], [1, 1, 1], [-1, -1, 1], [1, -1, 1],
  // Back Face
  [-1, 1, -1], [1, 1, -1], [-1, -1, -1], [1, -1, -1]
];

const CUBE_POINTS = CUBE_VERTICES.map(vertex => toNDPoint(vertex, true));

const CUBE_EDGES = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 0],
  [4, 5],
  [5, 7],
  [7, 6],
  [6, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7]
];

export { CUBE_POINTS, CUBE_EDGES };
