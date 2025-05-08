const transpose = require("./transpose");

function multiplyMatrices(A, B) {
  const Bt = transpose(B);
  return A.map((row) =>
    Bt.map((col) => row.reduce((sum, v, i) => sum + v * col[i], 0)),
  );
}

module.exports = multiplyMatrices;
