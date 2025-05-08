const pkg = require("jStat");
const { jStat } = pkg;

const ourSample = require("../index");
const print = require("./printFuncs/print");

const task = "Довірчий інтервал для дисперсії";
const reason =
  "Побудова довірчого інтервалу для дисперсії ґрунтується на χ²-розподілі ";

const deviation = ourSample.deviation();
const df = ourSample.len - 1;
const alpha = ourSample.alpha;

const chi2_low = jStat["chisquare"].inv(1 - alpha / 2, df);
const chi2_high = jStat["chisquare"].inv(alpha / 2, df);

const lower = (df * deviation) / chi2_low;
const upper = (df * deviation) / chi2_high;

print({ alpha: ourSample.alpha, deviation, lower, upper, task, reason });
