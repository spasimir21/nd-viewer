import { toNDPoint } from './geometryHelpers';

// prettier-ignore
const HYPERCUBE_VERTICES = [
  [1, 1, 1, 1],
  [-1, 1, 1, 1],

  [1, -1, 1, 1],
  [-1, -1, 1, 1],

  [1, 1, -1, 1],
  [-1, 1, -1, 1],

  [1, -1, -1, 1],
  [-1, -1, -1, 1],


  [1, 1, 1, -1],
  [-1, 1, 1, -1],

  [1, -1, 1, -1],
  [-1, -1, 1, -1],

  [1, 1, -1, -1],
  [-1, 1, -1, -1],

  [1, -1, -1, -1],
  [-1, -1, -1, -1]
];

const HYPERCUBE_POINTS = HYPERCUBE_VERTICES.map(vertex => toNDPoint(vertex, true));

const HYPERCUBE_EDGES = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 2],
  [1, 3],
  [4, 6],
  [5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],

  [8, 9],
  [10, 11],
  [12, 13],
  [14, 15],
  [8, 10],
  [9, 11],
  [12, 14],
  [13, 15],
  [8, 12],
  [9, 13],
  [10, 14],
  [11, 15],

  [0, 8],
  [1, 9],
  [2, 10],
  [3, 11],
  [4, 12],
  [5, 13],
  [6, 14],
  [7, 15]
];

export { HYPERCUBE_POINTS, HYPERCUBE_EDGES };
