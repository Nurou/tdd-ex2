import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
          ....TTT...
          ..........
          ..........
          ..........
          ..........`
    );
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
           ..TTT.....
           ..........
           ..........
           ..........
           ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
           ...T......
           ..TTT.....
           ..........
           ..........
           ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `........T.
        .......TTT
        ..........
        ..........
        ..........
        ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `.T........
        TTT.......
        ..........
        ..........
        ..........
        ..........`
    );
  });

  it("cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
            ..........
            ..........
            ..........
            ...T......
            ..TTT.....`
    );
  });

  it("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
            ..........
            ..........
            ..........
            .TIIII....
            TTT.......`
    );
  });

  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ...IIIIT..
      ......TTT.`
    );
  });

  it("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ...IIII...
      ....T.....
      ...TTT....`
    );
  });
});
