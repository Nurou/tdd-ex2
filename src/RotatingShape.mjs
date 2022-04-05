export class RotatingShape {
  shape;
  constructor(shape) {
    this.shape = shape
      .split("\n")
      .map((s, i) => s.trim().concat("\n"))
      .join("");
  }

  rotateRight() {
    let splitAndTrimmed = splitAndTrim(this.shape);

    let correctlyGroupedStrings = formGroups(splitAndTrimmed);

    let rightRotated = correctlyGroupedStrings
      .map((str, i) => reverse(str))
      .join("\n");

    return new RotatingShape(rightRotated);
  }

  rotateLeft() {
    let splitAndTrimmed = splitAndTrim(this.shape);

    let correctlyGroupedStrings = formGroups(splitAndTrimmed);

    let leftRotated = correctlyGroupedStrings.reverse().join("\n");

    return new RotatingShape(leftRotated);
  }

  toString() {
    return this.shape;
  }
}

function reverse(s) {
  return s.split("").reverse().join("");
}

function splitAndTrim(s) {
  return s.split("\n").map((s) => s.trim());
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
