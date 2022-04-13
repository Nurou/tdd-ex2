import { Block } from "./Block.mjs";
import { Grid } from "./Grid.mjs";

function rowIsEmpty(row) {
  return row.every((char) => char === "." || char === ".\n");
}

function generateEmptyRow(width) {
  return [...Array(width)].map((_, i) => (i === width - 1 ? ".\n" : "."));
}
export class Board {
  width;
  height;
  boardGrid;
  fallingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    const grid = [];

    // generate grid
    for (let row = 0; row < this.height; row++) {
      let currentRow = [];
      for (let col = 0; col < this.width; col++) {
        if (col === this.width - 1) {
          currentRow.push(".\n");
        } else {
          currentRow.push(".");
        }
      }
      grid.push(currentRow);
    }

    this.boardGrid = grid;
  }

  drop(block) {
    if (this.fallingBlock) {
      throw "already falling";
    }

    let shapeGrid;
    if (block instanceof Block) {
      shapeGrid = new Grid(block.color, this.width);
    } else {
      shapeGrid = new Grid(block.shape, this.width);
    }

    const initialEndRowIndex = shapeGrid.grid.length - 1;

    this.fallingBlock = {
      shapeGrid,
      currentBottomRow: initialEndRowIndex,
    };

    if (shapeGrid.grid.length == 1) {
      this.boardGrid[0] = shapeGrid.grid[0];
    } else {
      for (let i = 0; i < shapeGrid.grid.length; i++) {
        this.boardGrid[i] = shapeGrid.grid[i];
      }
    }
  }

  tick() {
    if (!this.fallingBlock) return;

    const endRowIndexOfShape = this.fallingBlock.currentBottomRow;
    const newIndex = endRowIndexOfShape + 1;
    const emptyRow = generateEmptyRow(this.width);

    if (newIndex > this.height - 1) {
      // landed on bottom rom
      this.fallingBlock = null;
    } else if (!rowIsEmpty(this.boardGrid[newIndex])) {
      // landed on another block
      this.fallingBlock = null;
    } else {
      const startIndex =
        this.fallingBlock.currentBottomRow -
        this.fallingBlock.shapeGrid.grid.length +
        1;

      if (this.fallingBlock.shapeGrid.grid.length == 1) {
        const shapeEndIndex = this.fallingBlock.currentBottomRow;

        this.boardGrid[shapeEndIndex] = emptyRow;
        this.boardGrid[shapeEndIndex + 1] = this.fallingBlock.shapeGrid.grid[0];
      } else {
        this.boardGrid.splice(newIndex, 1);
        this.boardGrid.unshift(emptyRow);
      }

      this.fallingBlock.currentBottomRow += 1;
    }
  }

  hasFalling() {
    return Boolean(this.fallingBlock);
  }

  toString() {
    return this.boardGrid.flat().join("");
  }
}
