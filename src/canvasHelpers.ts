import { NDArray, get } from './ndarray';

type ProjectedPoint2D = [number, number];

function homogeneous2DPointToProjected2DSpace(point: NDArray, projectedScreenSize: number): ProjectedPoint2D {
  const w = get(point, [0, 2]) as number;

  return [
    ((get(point, [0, 0]) as number) * w) / projectedScreenSize,
    ((get(point, [0, 1]) as number) * w) / projectedScreenSize
  ];
}

function homogeneous2DPointsToProjected2DSpace(points: NDArray[], projectedScreenSize: number): ProjectedPoint2D[] {
  return points.map(point => homogeneous2DPointToProjected2DSpace(point, projectedScreenSize));
}

export { homogeneous2DPointsToProjected2DSpace };
