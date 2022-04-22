import { Block } from "./Block.mjs";

function shiftHitsRightWall(arr, direction, n) {
  const times = n > arr.length ? n % arr.length : n;

  const leftMostCellIsEmptyPreShift = arr[0] === ".";
  const arrCopy = [...arr];

  const proposedArr = arrCopy.concat(
    arrCopy.splice(0, direction > 0 ? arr.length - times : times)
  );

  const leftMostCellIsEmptyPostShift = proposedArr[0] === ".";

  const wallHit = leftMostCellIsEmptyPreShift && !leftMostCellIsEmptyPostShift;

  return wallHit;
}

function shiftHitsLeftWall(arr, direction, n) {
  const times = n > arr.length ? n % arr.length : n;

  const rightMostCellIsEmptyPreShift = arr[arr.length - 1] === ".";
  const arrCopy = [...arr];

  const proposedArr = arrCopy.concat(
    arrCopy.splice(0, direction > 0 ? arr.length - times : times)
  );

  const rightMostCellIsEmptyPostShift =
    proposedArr[proposedArr.length - 1] === ".";

  const wallHit =
    rightMostCellIsEmptyPreShift && !rightMostCellIsEmptyPostShift;

  return wallHit;
}

function shift(arr, direction, n) {
  const times = n > arr.length ? n % arr.length : n;

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
  constructor(piece, width, _, offsetRow, offsetCol, prevOrientationIndex) {
    const pieceShape =
      piece instanceof Block
        ? piece.color
        : piece.orientations[piece.currentOrientationIndex].shape;

    const res = pieceShape.split("\n").filter((row) => !isEmpty(row));

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

    const RIGHT = 1;
    const LEFT = 0;
    const DIRECTION = offsetCol > 0 ? RIGHT : LEFT;

    const wallHit = grid.some((row) => {
      return DIRECTION === LEFT
        ? shiftHitsLeftWall(row.split(""), DIRECTION, Math.abs(offsetCol))
        : shiftHitsRightWall(row.split(""), DIRECTION, Math.abs(offsetCol));
    });

    if (wallHit) {
      if (DIRECTION === LEFT) {
        return new Piece(
          { ...piece, currentOrientationIndex: prevOrientationIndex },
          width,
          _,
          offsetRow,
          offsetCol + 1,
          prevOrientationIndex
        );
      } else {
        return new Piece(
          { ...piece, currentOrientationIndex: prevOrientationIndex },
          width,
          _,
          offsetRow,
          offsetCol - 1,
          prevOrientationIndex
        );
      }
    } else {
      // shift cols
      grid = grid.map((row) => {
        const shifted = shift(row.split(""), DIRECTION, Math.abs(offsetCol));
        return shifted.join("");
      });
    }

    grid = grid.map((row) => {
      return row.split("");
    });

    this.grid = grid;
  }

  toString() {
    return this.grid;
  }
}
