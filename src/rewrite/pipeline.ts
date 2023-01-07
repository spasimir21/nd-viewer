import { Step, StepGenerator, generateStep } from './step';
import { TypedArray } from './utils';

interface PipelineStep<TParams = any> {
  generator: StepGenerator<TParams>;
  params: TParams;
}

interface PipelineOptions {
  name: string;
  dimensions: number;
  steps: PipelineStep[];
}

interface Pipeline<TArgs> {
  name: string;
  inDimensions: number;
  outDimensions: number;
  process: (inPointsBuffer: TypedArray, args: TArgs) => TypedArray;
  code: string;
}

function createPipeline<TArgs>(options: PipelineOptions): Pipeline<TArgs> {
  let code = `const pointsBuffer = new inPointsBuffer.constructor(inPointsBuffer);\n`; // Clones the typed array (ugly, but supposedly the fastest way)

  let dimensions = options.dimensions;
  const steps: Step[] = [];

  for (const step of options.steps) {
    const generatedStep = generateStep(step.generator, dimensions, step.params);
    steps.push(generatedStep);
    dimensions = generatedStep.outDimensions;

    if (generatedStep.setupCode != null) {
      code += generatedStep.setupCode;
      code += '\n';
    }
  }

  code += `\nfor (let offset = 0; offset < pointsBuffer.length; offset += ${options.dimensions}) {\n`;

  for (const step of steps) {
    if (step.pointCode != null) {
      code += step.pointCode;
      code += '\n';
    }
  }

  code += '\n}\nreturn pointsBuffer;';

  return {
    name: options.name,
    inDimensions: options.dimensions,
    outDimensions: dimensions,
    process: new Function('inPointsBuffer', 'args', code) as any,
    code
  };
}

export { TypedArray, PipelineStep, PipelineOptions, Pipeline, createPipeline };
