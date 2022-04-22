/* 
a falling tetromino can be rotated
it cannot be rotated when there is no room to rotate
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

  it("can be rotated right (cw)", () => {
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
});
