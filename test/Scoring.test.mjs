import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { scoringSystem } from "../src/Scoring.mjs";
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

  describe("when a scoring system is added to the game", () => {
    it("the scoring system displays the running points tally to the user at an arbitrary game level", () => {
      board.subscribe(scoringSystem);
      clearAline(board);
      clearAline(board);
      expect(scoringSystem(0)).to.equal(880);
    });
  });
});
