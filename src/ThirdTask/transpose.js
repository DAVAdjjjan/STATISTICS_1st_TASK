function transpose(A) {
  return A[0].map((_, j) => A.map((row) => row[j]));
}

module.exports = transpose;
