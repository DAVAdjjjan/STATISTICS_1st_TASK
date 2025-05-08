const pkg = require("jStat");
const { jStat } = pkg;

const expected = (intervals, sample, mean, std) =>
  intervals.map(({ min, max }) => {
    const p =
      jStat["normal"].cdf(max, mean, std) - jStat["normal"].cdf(min, mean, std);
    return sample.len * p;
  });

module.exports = expected;
