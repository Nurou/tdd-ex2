export class Board {
  width;
  height;

  grid;

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

  toString() {
    return this.grid.flat().join("");
  }
}
