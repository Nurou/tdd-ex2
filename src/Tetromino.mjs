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

  toString() {
    return this.shape;
  }

  generateTShape() {
    return new RotatingShape(
      `.T.
      TTT
      ...`
    ).shape;
  }
}
