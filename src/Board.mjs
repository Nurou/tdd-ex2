export class Board {
  width;
  height;
  grid;
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

    this.grid = grid;
  }

  drop(block) {
    if (this.fallingBlock) {
      throw "already falling";
    }

    const INITIAL_ROW_INDEX = 0;
    const INITIAL_COL_INDEX = 1;

    this.fallingBlock = {
      ...block,
      row: INITIAL_ROW_INDEX,
      col: INITIAL_COL_INDEX,
    };
    this.grid[INITIAL_ROW_INDEX][INITIAL_COL_INDEX] = block.color;
  }

  tick() {
    const currentColorRow = this.fallingBlock.row;
    const currentColorCol = this.fallingBlock.col;

    // update coord
    this.fallingBlock.row += 1;

    const newRow = this.fallingBlock.row;
    // check if we have landed
    if (newRow > this.height - 1) {
      this.fallingBlock = null;
    } else {
      // overwrite current
      this.grid[currentColorRow][currentColorCol] = ".";
      // move down
      this.grid[newRow][currentColorCol] = this.fallingBlock.color;
    }
  }

  hasFalling() {
    return Boolean(this.fallingBlock);
  }

  toString() {
    return this.grid.flat().join("");
  }
}
