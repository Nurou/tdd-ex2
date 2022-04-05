import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino("T");
  shape;

  constructor(shape) {
    switch (shape) {
      case "T":
        this.shape = this.generateTShape();
        break;
      default:
        break;
    }
  }

  rotateRight() {
    return new RotatingShape(this.shape).rotateRight().shape;
  }

  rotateLeft() {
    return new RotatingShape(this.shape).rotateLeft().shape;
  }

  generateTShape() {
    return new RotatingShape(
      `.T.
      TTT
      ...`
    ).shape;
  }

  toString() {
    return this.shape;
  }
}
