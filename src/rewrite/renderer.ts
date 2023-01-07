import { Pipeline } from './pipeline';
import { TypedArray } from './utils';

interface RenderOptions<TPipelineArgs> {
  appearance: {
    backgroundColor: string;
    pointColor: string;
    pointSize: number;
    edgeColor: string;
    edgeSize: number;
    drawPoints: boolean;
    drawEdges: boolean;
  };
  mesh: {
    pointBuffer: TypedArray;
    edgeBuffer: TypedArray;
  };
  pipeline: Pipeline<TPipelineArgs>;
}

function render<TPipelineArgs>(
  ctx: CanvasRenderingContext2D,
  options: RenderOptions<TPipelineArgs>,
  args: TPipelineArgs
) {
  const dimensions = options.pipeline.inDimensions;

  const pointBuffer = options.pipeline.process(options.mesh.pointBuffer, args);
  const edgeBuffer = options.mesh.edgeBuffer;

  ctx.save();

  ctx.fillStyle = options.appearance.backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (options.appearance.drawEdges) {
    ctx.strokeStyle = options.appearance.edgeColor;
    ctx.lineWidth = options.appearance.edgeSize;

    for (let offset = 0; offset < edgeBuffer.length; offset += 2) {
      ctx.beginPath();
      let pointBufferOffset = edgeBuffer[offset] * dimensions;
      ctx.moveTo(
        (pointBuffer[pointBufferOffset] + 0.5) * ctx.canvas.width,
        (-pointBuffer[pointBufferOffset + 1] + 0.5) * ctx.canvas.height
      );
      pointBufferOffset = edgeBuffer[offset + 1] * dimensions;
      ctx.lineTo(
        (pointBuffer[pointBufferOffset] + 0.5) * ctx.canvas.width,
        (-pointBuffer[pointBufferOffset + 1] + 0.5) * ctx.canvas.height
      );
      ctx.stroke();
      ctx.closePath();
    }
  }

  if (options.appearance.drawPoints) {
    ctx.fillStyle = options.appearance.pointColor;

    for (let offset = 0; offset < pointBuffer.length; offset += dimensions) {
      ctx.beginPath();
      ctx.arc(
        (pointBuffer[offset] + 0.5) * ctx.canvas.width,
        (-pointBuffer[offset + 1] + 0.5) * ctx.canvas.height,
        options.appearance.pointSize / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.closePath();
    }
  }

  ctx.restore();
}

export { render, RenderOptions };
