import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface AspectRatioParams {
  aspectRatio: number[];
}

const generateAspectRatioStep: StepGenerator<AspectRatioParams> = ({ dimensions, point, params }) => {
  const screenScaleFactors = new Array(dimensions).fill(0).map((_, i) => params.aspectRatio[0] / params.aspectRatio[i]);

  let pointCode = '';
  for (let i = 0; i < dimensions; i++) pointCode += `${point[i]} *= ${screenScaleFactors[i]};\n`;

  return { pointCode };
};

function aspectRatio(params: AspectRatioParams): PipelineStep {
  return { generator: generateAspectRatioStep, params };
}

export { aspectRatio, AspectRatioParams };
