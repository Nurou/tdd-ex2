import { expect } from "chai";
import { Block } from "../src/Block.mjs";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Clearing lines", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("should clear a single line when a single row is full", () => {
    board.drop(Tetromino.I_SHAPE());
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.I_SHAPE());
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE());
    expect(board.toString()).to.equalShape(
      `....OO....
        ....OO....
        ..........
        ..........
        ..........
        IIII..IIII`
    );
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
          ..........
          ..........
          ..........
          ..........
          ....OO....`
    );
  });

  it("should be able to clear doubles", () => {
    board.drop(Tetromino.O_SHAPE());
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE());
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE());
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE());
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE());
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........OO
        ........OO
        ..........
        ..........
        OOOOOOOO..
        OOOOOOOO..`
    );
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        ..........
        ..........`
    );
  });

  it("should clear with hurdles", () => {
    board.drop(Tetromino.I_SHAPE());
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.I_SHAPE());
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.O_SHAPE());
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.I_SHAPE());
    board.moveRight();
    fallToBottom(board);

    board.drop(Tetromino.O_SHAPE());
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(new Block("X"));
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(new Block("X"));
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(new Block("X"));
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.Z_SHAPE());
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    board.drop(Tetromino.L_SHAPE());
    board.rotateRight();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..LL......
        ...L......
        ...L....OO
        ZZ..IIIIOO
        .ZZ.IIIIOO
        XXX.IIIIOO`
    );
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ........OO
      .ZZLIIIIOO`
    );
  });
});
