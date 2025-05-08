const pkg = require("jStat");
const { jStat } = pkg;
const print = require("./printFuncs/print");

const ourSample = require("../index");

const reason =
  "Справжня дисперсія невідома, але оскільки вибірка велика, використовуємо S і нормальний розподіл";

const task = `Довірчий інтервал для математичного сподівання при відомій дисперсії:`;

const mean = ourSample.mean();
const sigma = ourSample.std();
const z = jStat["normal"].inv(1 - ourSample.alpha / 2, 0, 1);
const margin = (sigma * z) / Math.sqrt(ourSample.len);

const lower = mean - margin;
const upper = mean + margin;

print({ alpha: ourSample.alpha, mean, lower, upper, task, reason });
