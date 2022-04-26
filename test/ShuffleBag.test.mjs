import { expect } from "chai";
import { shuffle } from "../src/ShuffleBag.mjs";

function isInSameOrder(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every(function (value, index) {
      return value === arr2[index];
    })
  );
}

describe("Shuffle bag algorithm", () => {
  const originalShapeOrder = ["I", "O", "T", "S", "Z", "J", "L"];
  const SEED1 = 5;
  const SEED2 = 3;

  it("returns items in different order to original order", () => {
    const bag = shuffle(
      [...originalShapeOrder],
      Math.random() < 0.5 ? SEED1 : SEED2
    );
    expect(isInSameOrder(originalShapeOrder, bag)).to.be.false;
  });
});
