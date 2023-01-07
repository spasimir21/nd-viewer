import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface PerspectiveProjectionParams {
  fov: number;
  finalDimensions: number;
}

const generatePerspectiveProjectionStep: StepGenerator<PerspectiveProjectionParams> = ({
  dimensions,
  point,
  symbols,
  params
}) => {
  const screenSize = 2 * Math.tan((params.fov / 360) * Math.PI);
  const screenScaleFactor = 1 / screenSize;

  let pointCode = `const ${symbols.projectionScale} = 1 / ${point[dimensions - 1]};\n`;
  for (let i = 0; i < params.finalDimensions; i++)
    pointCode += `${point[i]} *= ${symbols.projectionScale} * ${screenScaleFactor};\n`;

  return {
    outDimensions: dimensions - 1,
    pointCode
  };
};

function perspectiveProjection(params: PerspectiveProjectionParams): PipelineStep<PerspectiveProjectionParams> {
  return { generator: generatePerspectiveProjectionStep, params };
}

export { perspectiveProjection, PerspectiveProjectionParams };
