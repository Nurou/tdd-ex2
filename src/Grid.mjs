function isEmpty(string) {
  const chars = string.split("");
  return chars.every((char) => char === ".");
}

export class Grid {
  grid;
  constructor(shape, width) {
    const res = shape.split("\n").filter((row) => !isEmpty(row));
    const len = res[0].length;
    let gridified;
    if (len < width) {
      gridified = res.map((str) => {
        let newStr = str;
        let end = true;
        while (newStr.length < width) {
          if (end) {
            newStr = newStr.padEnd(newStr.length + 1, ".");
            end = false;
          } else {
            newStr = newStr.padStart(newStr.length + 1, ".");
            end = true;
          }
        }
        return newStr;
      });
    }
    gridified = gridified.map((row, i) => {
      let newStr = row.split("");
      return newStr.map((str, i) =>
        i === newStr.length - 1 ? str + "\n" : str
      );
    });

    this.grid = gridified;
  }

  toString() {
    return this.grid;
  }
}
