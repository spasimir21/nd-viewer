import { generateId } from './utils';

interface Step {
  id: string;
  setupCode?: string;
  pointCode?: string;
  outDimensions: number;
}

type StepGeneratorOutput = Partial<Omit<Step, 'id'>>;

interface StepGeneratorInput<TParams> {
  dimensions: number;
  point: string[];
  symbols: Record<string, string>;
  params: TParams;
}

type StepGenerator<TParams> = (input: StepGeneratorInput<TParams>) => StepGeneratorOutput;

function generateSymbolsObject(id: string): Record<string, string> {
  return new Proxy(
    {},
    {
      get: (_target: any, key: string) => `${id}_${key}`
    }
  );
}

function generateStep<TParams>(generator: StepGenerator<TParams>, dimensions: number, params: TParams): Step {
  const id = generateId();

  const output = generator({
    dimensions,
    point: new Array(dimensions).fill(null).map((_, i) => `pointsBuffer[offset + ${i}]`),
    symbols: generateSymbolsObject(id),
    params
  });

  if (output.outDimensions && output.outDimensions > dimensions)
    throw new Error(`Pipeline steps cannot create extra dimensions! (in: ${dimensions} out: ${output.outDimensions})`);

  return {
    id,
    outDimensions: output.outDimensions ?? dimensions,
    setupCode: output.setupCode,
    pointCode: output.pointCode
  };
}

export { Step, StepGenerator, StepGeneratorInput, StepGeneratorOutput, generateStep };
