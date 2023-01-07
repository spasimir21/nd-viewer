import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface RotationParams {
  plane: [number, number];
  invert?: boolean;
  radians?: boolean;
  angle?: number;
  angleArgument?: string;
}

const generateRotationStep: StepGenerator<RotationParams> = ({ point, symbols, params }) => {
  let setupCode = '';
  let sin = symbols.sin;
  let cos = symbols.cos;

  if (params.angle != null) {
    const angle = (params.invert ? -1 : 1) * (params.radians ? 1 : Math.PI / 180) * params.angle;
    sin = Math.sin(angle).toString();
    cos = Math.cos(angle).toString();
  } else {
    // prettier-ignore
    setupCode = `
      const ${symbols.angle} = ${params.invert ? '-' : ''}args.${params.angleArgument ?? 'angle'}${params.radians ? '' : ' * 0.017453292519943295'};
      const ${symbols.sin} = Math.sin(${symbols.angle});
      const ${symbols.cos} = Math.cos(${symbols.angle});
    `;
  }

  const pointCode = `
    const ${symbols.tempX} = ${point[params.plane[0]]};
    ${point[params.plane[0]]} = ${cos} * ${point[params.plane[0]]} - ${sin} * ${point[params.plane[1]]};
    ${point[params.plane[1]]} = ${sin} * ${symbols.tempX} + ${cos} * ${point[params.plane[1]]};
  `;

  return { setupCode, pointCode };
};

function rotate(params: RotationParams): PipelineStep<RotationParams> {
  return { generator: generateRotationStep, params };
}

export { rotate, RotationParams };
