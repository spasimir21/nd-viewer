import { DataType, NDArray, create, dot, get, set } from './ndarray';

interface Projection {
  project: (point: NDArray) => NDArray;
}

interface PerspectiveProjectionOptions {
  dimensions: number;
  focalLength: number;
  fov: number;
}

interface PerspectiveProjection extends Projection {
  dimensions: number;
  focalLength: number;
  fov: number;
  screenSize: number;
  projectionMatrix: NDArray;
}

interface StereographicProjectionOptions {
  dimensions: number;
  distance: number;
}

interface StereographicProjection extends Projection {
  dimensions: number;
  distance: number;
  projectionMatrix: NDArray;
}

function createPerspectiveProjection(options: PerspectiveProjectionOptions) {
  const screenSize = Math.abs(2 * options.focalLength * Math.tan(Math.PI * (options.fov / 360)));
  const projectionMatrix = create(DataType.f32, [options.dimensions, options.dimensions + 1]);

  for (let i = 0; i < options.dimensions - 1; i++) {
    set(projectionMatrix, [i, i], 1);
  }

  set(projectionMatrix, [options.dimensions - 1, options.dimensions], 1);

  const projection: PerspectiveProjection = {
    ...options,
    screenSize,
    projectionMatrix,
    project: (point: NDArray) => {
      const projectedPoint = dot(projectionMatrix, point);

      const w =
        ((get(point, [0, options.dimensions]) as number) * options.focalLength) /
        (get(point, [0, options.dimensions - 1]) as number);

      set(projectedPoint, [0, options.dimensions - 1], w);

      return projectedPoint;
    }
  };

  return projection;
}

function createStereographicProjection(options: StereographicProjectionOptions) {
  const projectionMatrix = create(DataType.f32, [options.dimensions, options.dimensions + 1]);

  for (let i = 0; i < options.dimensions - 1; i++) {
    set(projectionMatrix, [i, i], 1);
  }

  set(projectionMatrix, [options.dimensions - 1, options.dimensions], 1);

  const projection: StereographicProjection = {
    ...options,
    projectionMatrix,
    project: (point: NDArray) => {
      const projectedPoint = dot(projectionMatrix, point);

      const w =
        (get(point, [0, options.dimensions]) as number) /
        (options.distance - (get(point, [0, options.dimensions - 1]) as number));

      set(projectedPoint, [0, options.dimensions - 1], w);

      return projectedPoint;
    }
  };

  return projection;
}

function projectPoints(points: NDArray[], projection: Projection): NDArray[] {
  return points.map(point => projection.project(point));
}

export {
  createPerspectiveProjection,
  PerspectiveProjection,
  PerspectiveProjectionOptions,
  createStereographicProjection,
  StereographicProjection,
  StereographicProjectionOptions,
  projectPoints
};
