import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE(initialOrientation = 0) {
    return new Tetromino(
      `TTT
    .T.`,
      4,
      initialOrientation,
      [
        new RotatingShape("....\nTTT.\n.T.."),
        new RotatingShape(".T..\nTT..\n.T.."),
        new RotatingShape("....\n.T..\nTTT."),
        new RotatingShape(".T..\n.TT.\n.T.."),
      ]
    );
  }

  static I_SHAPE(initialOrientation = 0) {
    return new Tetromino(
      `IIII
    ....
    ....`,
      2,
      initialOrientation,
      [
        new RotatingShape("....\nIIII\n....\n...."),
        new RotatingShape("..I.\n..I.\n..I.\n..I."),
      ]
    );
  }
  static O_SHAPE = new Tetromino(
    `.OO
    .OO
    ...`,
    1,
    0,
    []
  );

  shape;
  orientations = [];
  currentOrientationIndex = 0;
  maxOrientations;

  constructor(shape, maxOrientations, currentOrientationIndex, orientations) {
    this.shape = shape;

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

    // TODO: remove once shape orientations are hardcoded
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
