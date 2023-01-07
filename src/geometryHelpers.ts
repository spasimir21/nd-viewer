import { DataType, NDArray, create, set } from './ndarray';

function toNDPoint(point: number[], toHomogeneous: boolean = false): NDArray {
  const ndPoint = create(DataType.f32, [toHomogeneous ? point.length + 1 : point.length, 1]);

  for (let i = 0; i < point.length; i++) {
    set(ndPoint, [0, i], point[i]);
  }

  if (toHomogeneous) set(ndPoint, [0, point.length], 1);

  return ndPoint;
}

export { toNDPoint };
