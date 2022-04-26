// Original Nintendo Scoring System
function calculateScore(n) {
  return {
    0: 0,
    1: 40 * (n + 1),
    2: 100 * (n + 1),
    3: 300 * (n + 1),
    4: 1200 * (n + 1),
  };
}

export const scoringSystem = (function () {
  const gameLevel = 10;
  let score = 0;
  function updateScore(numberOfClearedLines) {
    score += calculateScore(gameLevel)[numberOfClearedLines];
    return score;
  }
  return updateScore;
})();
