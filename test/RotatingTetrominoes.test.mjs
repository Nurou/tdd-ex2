import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE(2);

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .T..
       TTT.`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       .TT.
       .T..`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       TT..
       .T..`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE();

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....
       `
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.
       `
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.
       `
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE();

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO.
       .OO.
       ....`
    );
  });

  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO.
       .OO.
       ....`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO.
       .OO.
       ....`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

describe("The S shape", () => {
  const shape = Tetromino.S_SHAPE();

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.SS.
       SS..
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `S...
       SS..
       .S..
       `
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `S...
       SS..
       .S..
       `
    );
  });

  it("can loop around", () => {
    expect(
      shape.rotateRight().rotateRight().rotateRight().rotateRight().toString()
    ).to.equalShape(
      `.SS.
      SS..
      ....`
    );
  });
});

describe("The Z shape", () => {
  const shape = Tetromino.Z_SHAPE();

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ZZ..
       .ZZ.
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..
       `
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..Z.
      .ZZ.
      .Z..
      `
    );
  });

  it("can loop around", () => {
    expect(
      shape.rotateRight().rotateRight().rotateRight().rotateRight().toString()
    ).to.equalShape(
      `ZZ..
      .ZZ.
      ....`
    );
  });
});

describe("The L shape", () => {
  const shape = Tetromino.L_SHAPE();

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `LLL.
       L...
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `LL..
       .L..
       .L..
       `
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.L..
      .L..
      .LL.
      `
    );
  });

  xit("can loop around", () => {
    expect(
      shape.rotateRight().rotateRight().rotateRight().rotateRight().toString()
    ).to.equalShape(
      `LL..
      .LL.
      ....`
    );
  });
});
