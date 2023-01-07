import { combineOperationMatrices, createScaleMatrix, createTranslateMatrix, processPoints } from './matrixOperations';
import { createPerspectiveProjection, createStereographicProjection, projectPoints } from './projection';
import { generateNCubeEdges, generateNCubeVertices } from './geometry/ncube';
import { homogeneous2DPointsToProjected2DSpace } from './canvasHelpers';
import { DataType, fromArray, stringify } from './ndarray/index';
import { HYPERCUBE_EDGES, HYPERCUBE_POINTS } from './hypercube';
import { PYRAMID_EDGES, PYRAMID_POINTS } from './pyramid';
import { CUBE_EDGES, CUBE_POINTS } from './cube';
import { toNDPoint } from './geometryHelpers';
import { StepGenerator, generateStep } from './rewrite/step';
import { createPipeline } from './rewrite/pipeline';

// const GEOMETRY = { points: CUBE_POINTS, edges: CUBE_EDGES };
// const GEOMETRY = { points: PYRAMID_POINTS, edges: PYRAMID_EDGES };
// const GEOMETRY = { points: HYPERCUBE_POINTS, edges: HYPERCUBE_EDGES };
const GEOMETRY = {
  points: generateNCubeVertices(4).map(vertex => toNDPoint(vertex, true)),
  edges: generateNCubeEdges(4)
};

const VIEWPORT_SIZE = 800;

const _4DProjection = createStereographicProjection({
  dimensions: 4,
  distance: 5
});

const _3DProjection = createPerspectiveProjection({
  dimensions: 3,
  focalLength: 1,
  fov: 90
});

let angle = 0;

function draw(ctx: CanvasRenderingContext2D) {
  const radians = angle * (Math.PI / 180);

  const operationMatrix = combineOperationMatrices(
    createScaleMatrix([0.5, 0.5, 0.5, 0.5]),
    fromArray(DataType.f32, [
      [Math.cos(radians), 0, -Math.sin(radians), 0, 0],
      [0, 1, 0, 0, 0],
      [Math.sin(radians), 0, Math.cos(radians), 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1]
    ]),
    fromArray(DataType.f32, [
      [1, 0, 0, 0, 0],
      [0, Math.cos(radians), 0, -Math.sin(radians), 0],
      [0, 0, 1, 0, 0],
      [0, Math.sin(radians), 0, Math.cos(radians), 0],
      [0, 0, 0, 0, 1]
    ]),
    // fromArray(DataType.f32, [
    //   [Math.cos(radians), 0, Math.sin(radians), 0],
    //   [0, 1, 0, 0],
    //   [-Math.sin(radians), 0, Math.cos(radians), 0],
    //   [0, 0, 0, 1]
    // ]),
    // fromArray(DataType.f32, [
    //   [Math.cos(radians), -Math.sin(radians), 0, 0],
    //   [Math.sin(radians), Math.cos(radians), 0, 0],
    //   [0, 0, 1, 0],
    //   [0, 0, 0, 1]
    // ]),
    // fromArray(DataType.f32, [
    //   [1, 0, 0, 0],
    //   [0, Math.cos(radians), -Math.sin(radians), 0],
    //   [0, Math.sin(radians), Math.cos(radians), 0],
    //   [0, 0, 0, 1]
    // ]),
    createTranslateMatrix([0, 0, -4, 4])
  );

  const processedPoints = processPoints(GEOMETRY.points, operationMatrix);

  const _3DProjectedPoints = projectPoints(processedPoints, _4DProjection);
  const _2DProjectedPoints = projectPoints(_3DProjectedPoints, _3DProjection);

  const _2dCanvasPoints = homogeneous2DPointsToProjected2DSpace(_2DProjectedPoints, _3DProjection.screenSize);

  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE);

  ctx.translate(VIEWPORT_SIZE / 2, VIEWPORT_SIZE / 2);
  ctx.scale(VIEWPORT_SIZE, VIEWPORT_SIZE);

  ctx.lineWidth = 3 / VIEWPORT_SIZE;
  ctx.strokeStyle = 'purple';
  ctx.fillStyle = 'purple';

  for (const edge of GEOMETRY.edges) {
    ctx.beginPath();
    ctx.moveTo(_2dCanvasPoints[edge[0]][0], _2dCanvasPoints[edge[0]][1]);
    ctx.lineTo(_2dCanvasPoints[edge[1]][0], _2dCanvasPoints[edge[1]][1]);
    ctx.stroke();
    ctx.closePath();
  }

  // for (const point of _2dCanvasPoints) {
  //   ctx.beginPath();
  //   ctx.arc(point[0], point[1], 5 / VIEWPORT_SIZE, 0, Math.PI * 2);
  //   ctx.fill();
  //   ctx.closePath();
  // }

  ctx.restore();
}

function main() {
  const canvas = document.querySelector('#viewport') as HTMLCanvasElement;
  canvas.width = VIEWPORT_SIZE;
  canvas.height = VIEWPORT_SIZE;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const drawLoop = () => {
    draw(ctx);
    angle += 20 / 60;
    requestAnimationFrame(drawLoop);
  };

  drawLoop();
}

window.addEventListener('DOMContentLoaded', main);
