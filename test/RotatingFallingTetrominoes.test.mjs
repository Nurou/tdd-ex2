/* 
wall kick: when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible
*/
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("RotatingFallingTetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  xit("can be rotated right (cw)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
      ....T.....
      ....TT....
      ....T.....
      ..........
      ..........`
    );
  });

  xit("can be rotated left (ccw)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
      ....T.....
      ...TT.....
      ....T.....
      ..........
      ..........`
    );
  });

  xit("should return back to starting orientation after being rotated right then left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
          ....T.....
          ...TTT....
          ..........
          ..........
          ..........`
    );
  });

  it("should not rotate when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
      ..IIII....
      ..........
      ..........
      ....T.....
      ...TTT....`
    );
  });
});
