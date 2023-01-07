import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface StereographicProjectionParams {
  distance: number;
  finalDimensions: number;
}

const generateStereographicProjectionStep: StepGenerator<StereographicProjectionParams> = ({
  dimensions,
  point,
  symbols,
  params
}) => {
  // prettier-ignore
  let pointCode = `const ${symbols.projectionScale} = 1 / (${params.distance} - ${point[dimensions - 1]});\n`;
  for (let i = 0; i < params.finalDimensions; i++) pointCode += `${point[i]} *= ${symbols.projectionScale};\n`;

  return {
    outDimensions: dimensions - 1,
    pointCode
  };
};

function stereographicProjection(params: StereographicProjectionParams): PipelineStep<StereographicProjectionParams> {
  return { generator: generateStereographicProjectionStep, params };
}

export { stereographicProjection, StereographicProjectionParams };
