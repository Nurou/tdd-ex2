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

function cellContentIsEmpty(str) {
  return str === ".";
}

function generateFallingBlockPiece(piece, width, height) {
  return new Piece(piece, width, height);
}

export class Board {
  width;
  height;
  piece;
  stationaryBoard;
  fallingPieceBlockShape;
  fallingPiece = null;

  offsetRows = 0;
  offsetCols = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    const stationaryBoard = generateStationaryBoard(width, height);

    this.stationaryBoard = stationaryBoard;

    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }

  drop(piece) {
    if (this.fallingPiece) {
      throw new Error("already falling");
    }

    this.piece = piece;

    let gridifiedPiece = generateFallingBlockPiece(
      piece,
      this.width,
      this.height
    );

    const fallingBlockCoordinates = [];

    for (let row = 0; row < gridifiedPiece.grid.length; row++) {
      for (let col = 0; col < gridifiedPiece.grid[0].length; col++) {
        const charAtCell = gridifiedPiece.grid[row][col];
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

  tick() {
    if (!this.fallingPiece) return;

    const currentBottomRowCoords = [...this.fallingPiece].sort(
      (a, b) => b.row - a.row
    );

    const currentBottomRowIndex = currentBottomRowCoords[0].row;

    const hasReachedBottom = currentBottomRowIndex === this.height - 1;

    let hasLandedOnAnotherPiece = false;

    // we also need to ensure it hasn't landed on another piece
    if (!hasReachedBottom) {
      const updatedPieceCoords = this.fallingPiece.map((coord) => ({
        ...coord,
        row: coord.row + 1,
      }));

      updatedPieceCoords.forEach((coord) => {
        const charAtCell = this.stationaryBoard[coord.row]?.[coord.col];
        if (!cellContentIsEmpty(charAtCell)) {
          hasLandedOnAnotherPiece = true;
        }
      });
    }

    if (!hasReachedBottom && !hasLandedOnAnotherPiece) {
      // carry on ticking...
      this.fallingPiece = this.fallingPiece.map((coord) => ({
        ...coord,
        row: coord.row + 1,
      }));

      this.offsetRows++;
    } else {
      // this piece is done
      // so update stationary board
      for (let row = 0; row < this.height; row++) {
        for (let column = 0; column < this.width; column++) {
          this.stationaryBoard[row][column] = this.charAtCell(row, column);
        }
      }
      this.fallingPiece = null;
      this.fallingPieceBlockShape = null;
      this.offsetRows = 0;
      this.offsetCols = 0;

      // clear any lines
      let clearedLines = 0;

      const boardWithClearedLines = this.stationaryBoard.filter((row) => {
        const rowIsFull = row.every((cell) => cell !== ".");
        if (rowIsFull) {
          clearedLines++;
          return false;
        } else {
          return true;
        }
      });

      let newStationaryBoard = boardWithClearedLines;

      for (let index = 0; index < clearedLines; index++) {
        const emptyRow = Array(this.width).fill(".");
        newStationaryBoard.unshift(emptyRow);
      }

      // notify subscribers
      if (clearedLines > 0 && this.observers.length > 0) {
        this.notify(clearedLines);
      }

      this.stationaryBoard = newStationaryBoard;
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

    const cellToRightIsEmpty = cellContentIsEmpty(cellToRight);

    if (!cellToRightIsEmpty) return;

    this.fallingPiece = this.fallingPiece.map((coord) => ({
      ...coord,
      col: coord.col + 1,
    }));

    this.offsetCols++;
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

    const cellToLeftIsEmpty = cellContentIsEmpty(cellToLeft);

    if (!cellToLeftIsEmpty) return;

    this.fallingPiece = this.fallingPiece.map((coord) => ({
      ...coord,
      col: coord.col - 1,
    }));

    this.offsetCols--;
  }

  rotateRight() {
    const prevOrientationIndex = this.piece.currentOrientationIndex;
    const rotatedPiece = this.piece.rotateRight();

    this.piece = rotatedPiece;

    this.updateFallingBlockCoordinates(rotatedPiece, prevOrientationIndex);
  }

  rotateLeft() {
    const prevOrientationIndex = this.piece.currentOrientationIndex;
    const rotatedPiece = this.piece.rotateLeft();

    this.piece = rotatedPiece;

    this.updateFallingBlockCoordinates(rotatedPiece, prevOrientationIndex);
  }

  updateFallingBlockCoordinates(rotatedPiece, prevOrientationIndex) {
    const updatedPiece = new Piece(
      rotatedPiece,
      this.width,
      this.height,
      this.offsetRows,
      this.offsetCols,
      prevOrientationIndex
    );

    let blockedByAnotherPiece = false;

    for (let row = 0; row < updatedPiece.grid.length; row++) {
      for (let col = 0; col < updatedPiece.grid[0].length; col++) {
        const charAtCell = updatedPiece.grid[row][col];
        const charAtStationaryCell = this.stationaryBoard[row][col];
        if (
          !cellContentIsEmpty(charAtCell) &&
          !cellContentIsEmpty(charAtStationaryCell)
        ) {
          blockedByAnotherPiece = true;
        }
      }
    }

    if (blockedByAnotherPiece) return;

    const fallingBlockCoordinates = [];

    for (let row = 0; row < updatedPiece.grid.length; row++) {
      for (let col = 0; col < updatedPiece.grid[0].length; col++) {
        const charAtCell = updatedPiece.grid[row][col];
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
