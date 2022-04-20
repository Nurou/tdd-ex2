import { Block } from "./Block.mjs";
import { Piece } from "./Piece.mjs";

function generateStationaryBoard(width, height) {
  let grid = [];
  for (let row = 0; row < height; row++) {
    let currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(".");
    }
    grid.push(currentRow);
  }
  return grid;
}

function generateFallingBlockPiece(block, width, height) {
  let piece;
  if (block instanceof Block) {
    piece = new Piece(block.color, width, height);
  } else {
    piece = new Piece(block.shape, width, height);
  }
  return piece;
}

export class Board {
  width;
  height;
  stationaryBoard;
  fallingPieceBlockShape;
  fallingPiece = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    const stationaryBoard = generateStationaryBoard(width, height);

    this.stationaryBoard = stationaryBoard;
  }

  drop(block) {
    if (this.fallingPiece) {
      throw new Error("already falling");
    }

    let piece = generateFallingBlockPiece(block, this.width, this.height);

    const fallingBlockCoordinates = [];

    for (let row = 0; row < piece.grid.length; row++) {
      for (let col = 0; col < piece.grid[0].length; col++) {
        const charAtCell = piece.grid[row][col];
        if (charAtCell !== ".") {
          fallingBlockCoordinates.push({ row, col });
          if (!this.fallingPieceBlockShape) {
            this.fallingPieceBlockShape = charAtCell;
          }
        }
      }
    }

    this.fallingPiece = fallingBlockCoordinates;
  }

  /* 
  if not on bottom row and no block underneath, increment falling block row
  if on bottom row, do not increment, set falling block to null
  
 */
  tick() {
    if (!this.fallingPiece) return;

    const currentBottomRowCoords = [...this.fallingPiece].sort(
      (a, b) => b.row - a.row
    );

    const currentBottomRowIndex = currentBottomRowCoords[0].row;

    const hasLanded = currentBottomRowIndex === this.height - 1;

    let hasLandedOnAnotherBlock = false;

    if (!hasLanded) {
      const nextBottomRowIndex = currentBottomRowCoords[0].row + 1;
      const nextBottomRowCoords = currentBottomRowCoords
        .map((coord) => ({ ...coord, row: nextBottomRowIndex }))
        .filter((coord) => coord.row === nextBottomRowIndex);

      hasLandedOnAnotherBlock = nextBottomRowCoords.some((coord) => {
        return this.stationaryBoard[coord.row]?.[coord.col] !== ".";
      });
    }

    if (!hasLanded && !hasLandedOnAnotherBlock) {
      this.fallingPiece = this.fallingPiece.map((coord) => ({
        ...coord,
        row: coord.row + 1,
      }));
    } else {
      // update stationary board
      for (let row = 0; row < this.height; row++) {
        for (let column = 0; column < this.width; column++) {
          this.stationaryBoard[row][column] = this.charAtCell(row, column);
        }
      }
      this.fallingPiece = null;
      this.fallingPieceBlockShape = null;
    }
  }

  moveRight() {
    const sortedByRow = [...this.fallingPiece].sort((a, b) => b.row - a.row);
    const bottomRowIndex = sortedByRow[0].row;
    const onlyBottomRowCells = sortedByRow.filter(
      (coords) => coords.row === bottomRowIndex
    );
    const sortedByCol = onlyBottomRowCells.sort((a, b) => b.col - a.col);
    const rightmostCell = sortedByCol[0];

    const cellToRight =
      this.stationaryBoard[rightmostCell.row][rightmostCell.col + 1];

    const cellToRightIsEmpty = cellToRight === ".";

    if (!cellToRightIsEmpty) return;

    this.fallingPiece = this.fallingPiece.map((coord) => ({
      ...coord,
      col: coord.col + 1,
    }));
  }

  moveLeft() {
    const sortedByRow = [...this.fallingPiece].sort((a, b) => b.row - a.row);
    const bottomRowIndex = sortedByRow[0].row;
    const onlyBottomRowCells = sortedByRow.filter(
      (coords) => coords.row === bottomRowIndex
    );
    const sortedByCol = onlyBottomRowCells.sort((a, b) => a.col - b.col);
    const leftmostCell = sortedByCol[0];

    const cellToLeft =
      this.stationaryBoard[leftmostCell.row][leftmostCell.col - 1];

    const cellToLeftIsEmpty = cellToLeft === ".";

    if (!cellToLeftIsEmpty) return;

    this.fallingPiece = this.fallingPiece.map((coord) => ({
      ...coord,
      col: coord.col - 1,
    }));
  }

  hasFalling() {
    return Boolean(this.fallingPiece);
  }

  charAtCell(row, col) {
    let fallingBlockCellIsOccupied = false;
    if (this.fallingPiece) {
      fallingBlockCellIsOccupied = this.fallingPiece.some(
        (coord) => coord.row === row && coord.col === col
      );
    }
    if (fallingBlockCellIsOccupied) {
      return this.fallingPieceBlockShape;
    } else {
      return this.stationaryBoard[row][col];
    }
  }

  toString() {
    let stringifiedBoard = "";
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        stringifiedBoard += this.charAtCell(row, column);
      }
      stringifiedBoard += "\n";
    }
    return stringifiedBoard;
  }
}
