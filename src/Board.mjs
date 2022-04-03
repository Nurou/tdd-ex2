export class Board {
  width;
  height;
  grid;
  fallingBlock;

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

    // overwrite current
    this.grid[currentColorRow][currentColorCol] = ".";

    // update coord
    this.fallingBlock.row += 1;

    // move down
    const newRow = this.fallingBlock.row;
    this.grid[newRow][currentColorCol] = this.fallingBlock.color;
  }

  hasFalling() {}

  toString() {
    return this.grid.flat().join("");
  }
}
