import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface ScaleParams {
  scale?: number[];
  scaleArgument?: string;
}

const generateScaleStep: StepGenerator<ScaleParams> = ({ dimensions, point, params }) => {
  let pointCode = '';

  if (params.scale != null) {
    for (let i = 0; i < dimensions; i++) if (params.scale[i] != 1) pointCode += `${point[i]} *= ${params.scale[i]};\n`;
  } else {
    for (let i = 0; i < dimensions; i++) pointCode += `${point[i]} *= args.${params.scaleArgument ?? 'scale'}[${i}];\n`;
  }

  return { pointCode };
};

function scale(params: ScaleParams = {}): PipelineStep<ScaleParams> {
  return { generator: generateScaleStep, params };
}

export { scale, ScaleParams };
