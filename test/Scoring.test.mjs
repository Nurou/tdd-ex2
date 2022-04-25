import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function clearAline(board) {
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
  fallToBottom(board);
}

// Original Nintendo Scoring System
function initialiseScoringSystem(n) {
  return {
    1: 40 * (n + 1),
    2: 100 * (n + 1),
    3: 300 * (n + 1),
    4: 1200 * (n + 1),
  };
}

describe("Scoring", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("when a board has subscriber(s)", () => {
    it("can notify observers of a removed row ", () => {
      let rows = 0;
      const observer = (clearedRows) => {
        rows += clearedRows;
      };
      board.subscribe(observer);
      clearAline(board);
      expect(rows).to.equal(1);
    });

    it("updates observer(s) correctly with subsequent line clears  ", () => {
      let rows = 0;
      const observer = (clearedRows) => {
        rows += clearedRows;
      };
      board.subscribe(observer);
      clearAline(board);
      clearAline(board);
      expect(rows).to.equal(2);
    });
  });
});
