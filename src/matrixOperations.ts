import { DataType, NDArray, create, dot, set } from './ndarray';

function createScaleMatrix(scale: number[]): NDArray {
  const matrix = create(DataType.f32, [scale.length + 1, scale.length + 1]);

  for (let i = 0; i < scale.length; i++) set(matrix, [i, i], scale[i]);

  set(matrix, [scale.length, scale.length], 1);

  return matrix;
}

function createTranslateMatrix(translate: number[]): NDArray {
  const matrix = create(DataType.f32, [translate.length + 1, translate.length + 1]);

  for (let i = 0; i <= translate.length; i++) set(matrix, [i, i], 1);

  for (let i = 0; i < translate.length; i++) set(matrix, [i, translate.length], translate[i]);

  return matrix;
}

function combineOperationMatrices(...matrices: NDArray[]): NDArray {
  let combined = matrices[0];

  for (let i = 1; i < matrices.length; i++) combined = dot(matrices[i], combined);

  return combined;
}

function processPoints(points: NDArray[], operation: NDArray): NDArray[] {
  return points.map(point => dot(operation, point));
}

export { createScaleMatrix, createTranslateMatrix, combineOperationMatrices, processPoints };
