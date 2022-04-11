import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    `.T.
  TTT
  ...`,
    4,
    0,
    []
  );
  static I_SHAPE = new Tetromino(
    `..... 
  .....
  IIII.
  .....
  .....`,
    2,
    0,
    []
  );

  shape;
  orientations = [];
  currentOrientationIndex = 0;
  maxOrientations;

  constructor(shape, maxOrientations, currentOrientationIndex, orientations) {
    this.shape = shape
      .split("\n")
      .map((s) => s.trim().concat("\n"))
      .join("");

    this.maxOrientations = maxOrientations;

    let index;

    if (currentOrientationIndex > orientations.length - 1) {
      index = 0;
    } else if (currentOrientationIndex < 0) {
      index = orientations.length - 1;
    } else {
      index = currentOrientationIndex;
    }

    this.currentOrientationIndex = index;

    if (orientations.length === 0) {
      let orientation = new RotatingShape(shape);

      for (let i = 0; i < maxOrientations; i++) {
        this.orientations.push(orientation);
        orientation = orientation.rotateRight();
      }
    } else {
      this.orientations = orientations;
    }
  }

  rotateRight() {
    return new Tetromino(
      this.shape,
      this.maxOrientations,
      this.currentOrientationIndex + 1,
      this.orientations
    );
  }

  rotateLeft() {
    return new Tetromino(
      this.shape,
      this.maxOrientations,
      this.currentOrientationIndex - 1,
      this.orientations
    );
  }

  toString() {
    return this.orientations[this.currentOrientationIndex].shape;
  }
}
