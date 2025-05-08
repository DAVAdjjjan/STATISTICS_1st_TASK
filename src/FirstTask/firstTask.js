const ourSample = require("../index");
const print = require("./print");
const getExpected = require("./expected");

const pkg = require("jStat");
const { jStat } = pkg;

const h0 = "вибірка має нормальний розподіл";
const h1 = "вибірка не має нормального розподілу";

const statDistribution = (sample) => {
  const intervals = [];

  const min = Math.min(...sample.data);
  const max = Math.max(...sample.data);
  const R = max - min;
  const intervalsCount = Math.ceil(1 + 3.222 * Math.log10(sample.len));
  const optimalIntervalLen = R / intervalsCount;

  let leftBound = min;
  for (let i = 0; i < intervalsCount; i++) {
    const rightBound =
      i + 1 !== intervalsCount ? leftBound + optimalIntervalLen : max;
    intervals.push({
      min: leftBound,
      max: rightBound,
      frequency: 0,
      name: `Інтервал № ${i + 1}`,
    });
    leftBound = rightBound;
  }

  for (const el of sample.data) {
    for (let i = 0; i < intervals.length; i++) {
      const isLast = i === intervals.length - 1;
      if (
        (el >= intervals[i].min && el < intervals[i].max) ||
        (isLast && el === max)
      ) {
        intervals[i].frequency += 1;
        break;
      }
    }
  }

  const [mean, std] = [sample.mean(), sample.std()];

  const expected = getExpected(intervals, sample, mean, std);

  let chi2 = 0;
  for (let i = 0; i < intervalsCount; i++) {
    if (expected[i] > 0) {
      chi2 += Math.pow(intervals[i].frequency - expected[i], 2) / expected[i];
    }
  }

  const df = intervalsCount - 1 - 2;
  const chi2Critical = jStat["chisquare"].inv(1 - sample.alpha, df);

  print(sample.alpha, chi2, chi2Critical, h0, h1, df, intervals, expected);
};

statDistribution(ourSample);
