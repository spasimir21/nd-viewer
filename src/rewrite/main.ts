import { generate3DSphereEdges, generate3DSpherePoints } from './sphere';
import { generateNCubeVertices, generateNCubeEdges } from './ncube';
import { pointsToPointBuffer, edgesToEdgeBuffer } from './geometry';
import { stereographicProjection } from './stereographicProjection';
import { perspectiveProjection } from './perspectiveProjection';
import { RenderOptions, render } from './renderer';
import { createPipeline } from './pipeline';
import { aspectRatio } from './aspectRatio';
import { rotate } from './rotateOnPlane';
import { translate } from './translate';
import { scale } from './scale';
import { generateNSphereEdges, generateNSpherePoints } from './nsphere';

const CANVAS_SIZE = [1000, 563];

type PipelineArgs = { angle: number };

// const _3DPipeline = createPipeline<PipelineArgs>({
//   name: '3-D Pipeline',
//   dimensions: 3,
//   steps: [
//     scale({ scale: [0.5, 0.5, 0.5] }),
//     rotate({ plane: [0, 1] }),
//     rotate({ plane: [0, 2], invert: true }),
//     rotate({ plane: [1, 2] }),
//     translate({ translation: [0, 0, 2] }),
//     perspectiveProjection({ fov: 90, finalDimensions: 2 }),
//     aspectRatio({ aspectRatio: CANVAS_SIZE })
//   ]
// });

const _4DPipeline = createPipeline<PipelineArgs>({
  name: '4-D Pipeline',
  dimensions: 4,
  steps: [
    scale({ scale: [0.5, 0.5, 0.5, 0.5] }),
    // rotate({ plane: [0, 2] }),
    // rotate({ plane: [0, 1] }),
    // rotate({ plane: [1, 2] }),
    // rotate({ plane: [1, 3] }),
    rotate({ plane: [0, 1] }),
    rotate({ plane: [0, 2] }),
    rotate({ plane: [0, 3] }),
    rotate({ plane: [1, 2] }),
    rotate({ plane: [1, 3] }),
    rotate({ plane: [2, 3] }),
    translate({ translation: [0, 0, 2, 4] }),
    stereographicProjection({ distance: 5, finalDimensions: 2 }),
    perspectiveProjection({ fov: 90, finalDimensions: 2 }),
    aspectRatio({ aspectRatio: CANVAS_SIZE })
  ]
});

// const _5DPipeline = createPipeline<PipelineArgs>({
//   name: '5-D Pipeline',
//   dimensions: 5,
//   steps: [
//     scale({ scale: [0.5, 0.5, 0.5, 0.5, 0.5] }),
//     // rotate({ plane: [0, 2] }),
//     // rotate({ plane: [1, 3] }),
//     // rotate({ plane: [1, 4] }),
//     // rotate({ plane: [3, 4] }),
//     rotate({ plane: [0, 1] }),
//     rotate({ plane: [0, 2] }),
//     rotate({ plane: [0, 3] }),
//     rotate({ plane: [0, 4] }),
//     rotate({ plane: [1, 2] }),
//     rotate({ plane: [1, 3] }),
//     rotate({ plane: [1, 4] }),
//     rotate({ plane: [2, 3] }),
//     rotate({ plane: [2, 4] }),
//     rotate({ plane: [3, 4] }),
//     translate({ translation: [0, 0, 2, 4, 4] }),
//     stereographicProjection({ distance: 5, finalDimensions: 2 }),
//     stereographicProjection({ distance: 5.1, finalDimensions: 2 }),
//     perspectiveProjection({ fov: 90, finalDimensions: 2 }),
//     aspectRatio({ aspectRatio: CANVAS_SIZE })
//   ]
// });

// const _6DPipeline = createPipeline<PipelineArgs>({
//   name: '6-D Pipeline',
//   dimensions: 6,
//   steps: [
//     scale({ scale: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5] }),
//     rotate({ plane: [0, 2] }),
//     rotate({ plane: [1, 3] }),
//     rotate({ plane: [1, 4] }),
//     rotate({ plane: [1, 5] }),
//     // rotate({ plane: [3, 4] }),
//     // rotate({ plane: [0, 1] }),
//     // rotate({ plane: [0, 2] }),
//     // rotate({ plane: [0, 3] }),
//     // rotate({ plane: [0, 4] }),
//     // rotate({ plane: [0, 5] }),
//     // rotate({ plane: [1, 2] }),
//     // rotate({ plane: [1, 3] }),
//     // rotate({ plane: [1, 4] }),
//     // rotate({ plane: [1, 5] }),
//     // rotate({ plane: [2, 3] }),
//     // rotate({ plane: [2, 4] }),
//     // rotate({ plane: [2, 5] }),
//     // rotate({ plane: [3, 4] }),
//     // rotate({ plane: [3, 5] }),
//     // rotate({ plane: [4, 5] }),
//     translate({ translation: [0, 0, 4, 4, 4, 3] }),
//     stereographicProjection({ distance: 5.1, finalDimensions: 2 }),
//     stereographicProjection({ distance: 5.1, finalDimensions: 2 }),
//     stereographicProjection({ distance: 5.1, finalDimensions: 2 }),
//     perspectiveProjection({ fov: 90, finalDimensions: 2 }),
//     aspectRatio({ aspectRatio: CANVAS_SIZE })
//   ]
// });

// const _2DPipeline = createPipeline<PipelineArgs>({
//   name: '2-D Pipeline',
//   dimensions: 2,
//   steps: [scale({ scale: [0.5, 0.5] }), rotate({ plane: [0, 1] }), aspectRatio({ aspectRatio: CANVAS_SIZE })]
// });

console.log(_4DPipeline.code);

const renderOptions: RenderOptions<PipelineArgs> = {
  appearance: {
    backgroundColor: 'black',
    pointColor: 'red',
    pointSize: 3,
    edgeColor: 'purple',
    edgeSize: 1,
    drawPoints: false,
    drawEdges: true
  },
  mesh: {
    pointBuffer: pointsToPointBuffer(4, generateNSpherePoints(1, [10, 10, 10])),
    edgeBuffer: edgesToEdgeBuffer(generateNSphereEdges([10, 10, 10]))
  },
  pipeline: _4DPipeline
};

const pipelineArgs: PipelineArgs = { angle: 0 };

function drawLoop(ctx: CanvasRenderingContext2D) {
  render(ctx, renderOptions, pipelineArgs);

  pipelineArgs.angle += 45 / 60;

  requestAnimationFrame(() => drawLoop(ctx));
}

function main() {
  const canvas = document.querySelector('#viewport') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = CANVAS_SIZE[0];
  canvas.height = CANVAS_SIZE[1];

  drawLoop(ctx);
}

window.addEventListener('DOMContentLoaded', main);
