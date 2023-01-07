import { PipelineStep } from './pipeline';
import { StepGenerator } from './step';

interface TranslationParams {
  translation?: number[];
  translationArgument?: string;
}

const generateTranslationStep: StepGenerator<TranslationParams> = ({ dimensions, point, params }) => {
  let pointCode = '';

  if (params.translation != null) {
    for (let i = 0; i < dimensions; i++)
      if (params.translation[i] != 0) pointCode += `${point[i]} += ${params.translation[i]};\n`;
  } else {
    for (let i = 0; i < dimensions; i++)
      pointCode += `${point[i]} += args.${params.translationArgument ?? 'translation'}[${i}];\n`;
  }

  return { pointCode };
};

function translate(params: TranslationParams = {}): PipelineStep<TranslationParams> {
  return { generator: generateTranslationStep, params };
}

export { translate, generateTranslationStep };
