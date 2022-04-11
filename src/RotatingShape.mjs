export class RotatingShape {
  shape;
  constructor(shape) {
    this.shape = shape
      .split("\n")
      .map((s) => s.trim().concat("\n"))
      .join("");
  }

  rotateRight() {
    let splitAndTrimmed = splitAndTrim(this.shape);

    let correctlyGroupedStrings = formGroups(splitAndTrimmed);

    let rightRotated = correctlyGroupedStrings
      .map((str) => reverse(str))
      .join("\n");

    return new RotatingShape(rightRotated);
  }

  rotateLeft() {
    return new RotatingShape(this.shape)
      .rotateRight()
      .rotateRight()
      .rotateRight();
  }

  toString() {
    return this.shape;
  }
}

function reverse(s) {
  return s.split("").reverse().join("");
}

function splitAndTrim(s) {
  let res = s.split("\n").map((s) => s.trim());
  res.pop();
  return res;
}

function formGroups(stringArr) {
  let strs = [];

  stringArr.forEach((str, i) => {
    let chars = str.split("");
    chars.forEach((char, j) => {
      strs[j] = strs[j] ? strs[j].concat(char) : char;
    });
  });

  return strs;
}
