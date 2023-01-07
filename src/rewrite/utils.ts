type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

const generateId = () => '_' + Math.random().toString(36).substring(2, 9);

export { TypedArray, generateId };
