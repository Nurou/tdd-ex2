export class RotatingShape {
  shape;
  constructor(shape) {
    this.shape = shape
      .split("\n")
      .map((s, i) => s.trim().concat("\n"))
      .join("");
  }

  rotateRight() {
    let splitAndTrimmed = this.shape.split("\n").map((s) => s.trim());

    let strs = [];

    splitAndTrimmed.forEach((str, i) => {
      let chars = str.split("");
      chars.forEach((char, j) => {
        strs[j] = strs[j] ? strs[j].concat(char) : char;
      });
    });

    strs = strs
      .map((str, i) => {
        if (i === strs.length - 1) {
          return reverse(str);
        } else {
          return reverse(str).concat("\n");
        }
      })
      .join("");

    return new RotatingShape(strs);
  }

  toString() {
    return this.shape;
  }
}

function reverse(s) {
  return s.split("").reverse().join("");
}
