function isEmpty(string) {
  const chars = string.split("");
  return chars.every((char) => char === ".");
}

export class Piece {
  grid;
  constructor(shape, width, height) {
    const res = shape.split("\n").filter((row) => !isEmpty(row));
    const len = res[0].length;

    let grid;

    // pad each row with empty chars if necessary
    // so that they are same width as board
    if (len < width) {
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

    grid = grid.map((row) => {
      return row.split("");
    });

    this.grid = grid;
  }

  toString() {
    return this.grid;
  }
}
