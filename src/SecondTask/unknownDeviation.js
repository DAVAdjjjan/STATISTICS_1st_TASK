const pkg = require("jStat");
const { jStat } = pkg;
const print = require("./printFuncs/print");

const ourSample = require("../index");

const reason = "Дисперсія невідома, тому використано t-розподіл Стьюдента.";

const task = `Довірчий інтервал для математичного сподівання при невідомій дисперсії:`;

const len = ourSample.len;
const mean = ourSample.mean();
const std = ourSample.std();
const df = len - 1;

const t = jStat["studentt"].inv(1 - ourSample.alpha / 2, df);

const margin = (t * std) / Math.sqrt(len);
const lower = mean - margin;
const upper = mean + margin;

print({ alpha: ourSample.alpha, mean, lower, upper, task, reason, type: "m" });
