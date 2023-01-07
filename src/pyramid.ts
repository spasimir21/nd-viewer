import { toNDPoint } from './geometryHelpers';

// prettier-ignore
const PYRAMID_VERTICES = [
  [0, 1, 0],
  [-1, -1, 1],
  [1, -1, -1],
  [-1, -1, -1],
  [1, -1, 1]
];

const PYRAMID_POINTS = PYRAMID_VERTICES.map(vertex => toNDPoint(vertex, true));

const PYRAMID_EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 3]
];

export { PYRAMID_POINTS, PYRAMID_EDGES };
