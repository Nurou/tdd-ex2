import { Block } from "./Block.mjs";
import { RotatingShape } from "./RotatingShape.mjs";

function shift(arr, direction, n) {
  var times = n > arr.length ? n % arr.length : n;
  return arr.concat(arr.splice(0, direction > 0 ? arr.length - times : times));
}

function isEmpty(string) {
  const chars = string.split("");
  return chars.every((char) => char === ".");
}

function stringRowOfDots(width) {
  return ".".repeat(width);
}

export class Piece {
  grid;
  block;
  constructor(shape, width, height, offsetRow, offsetCol) {
    const res = shape.split("\n").filter((row) => !isEmpty(row));

    // shift rows
    for (let index = 0; index < offsetRow; index++) {
      res.unshift(stringRowOfDots(res[0].length));
    }

    const rowWidth = res[0].length;

    let grid;

    // pad each row with empty chars if necessary
    // so that they are same width as board
    if (rowWidth < width) {
      grid = res.map((str) => {
        let newStr = str;
        // toggle between padding start and end
        let shouldPadEnd = true;
        while (newStr.length < width) {
          if (shouldPadEnd) {
            newStr = newStr.padEnd(newStr.length + 1, ".");
            shouldPadEnd = false;
          } else {
            newStr = newStr.padStart(newStr.length + 1, ".");
            shouldPadEnd = true;
          }
        }
        return newStr;
      });
    }

    // shift cols
    grid = grid.map((row) => {
      const RIGHT = 1;
      const LEFT = 0;
      const DIRECTION = offsetCol > 0 ? RIGHT : LEFT;
      const shifted = shift(row.split(""), DIRECTION, offsetCol);
      return shifted.join("");
    });

    grid = grid.map((row) => {
      return row.split("");
    });

    this.grid = grid;
  }

  rotateRight() {
    // returns new Tetromino instance
    const rotated = this.block.rotateRight();
    // re-build grid with new shape
    return this.block.rotateRight();
  }

  toString() {
    return this.grid;
  }
}
