import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE(initialOrientation = 0) {
    return new Tetromino(initialOrientation, [
      new RotatingShape("....\nTTT.\n.T.."),
      new RotatingShape(".T..\nTT..\n.T.."),
      new RotatingShape("....\n.T..\nTTT."),
      new RotatingShape(".T..\n.TT.\n.T.."),
    ]);
  }

  static I_SHAPE(initialOrientation = 0) {
    return new Tetromino(initialOrientation, [
      new RotatingShape("....\nIIII\n....\n...."),
      new RotatingShape("..I.\n..I.\n..I.\n..I."),
    ]);
  }
  static O_SHAPE(initialOrientation = 0) {
    return new Tetromino(initialOrientation, [
      new RotatingShape(".OO.\n.OO.\n...."),
    ]);
  }

  static S_SHAPE(initialOrientation = 0) {
    return new Tetromino(initialOrientation, [
      new RotatingShape(".SS.\nSS..\n...."),
      new RotatingShape("S...\nSS..\n.S.."),
    ]);
  }

  orientations = [];
  currentOrientationIndex = 0;

  constructor(currentOrientationIndex, orientations) {
    let index;

    if (currentOrientationIndex > orientations.length - 1) {
      index = 0;
    } else if (currentOrientationIndex < 0) {
      index = orientations.length - 1;
    } else {
      index = currentOrientationIndex;
    }

    this.currentOrientationIndex = index;

    this.orientations = orientations;
  }

  rotateRight() {
    return new Tetromino(this.currentOrientationIndex + 1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.currentOrientationIndex - 1, this.orientations);
  }

  toString() {
    return this.orientations[this.currentOrientationIndex].shape;
  }
}
