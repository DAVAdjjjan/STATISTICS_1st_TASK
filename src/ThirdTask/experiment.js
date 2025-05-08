const math = require("mathjs");
const gaussianRandom = require("./gaussianRandom");
const transpose = require("./transpose");
const multiplyMatrices = require("./multiplyMatrices");

const TRUE_BETA = [5, 2.5, -1, 0.8];

function samplePoint() {
  return Array.from(
    { length: TRUE_BETA.length - 1 },
    () => Math.random() * 20 - 10,
  );
}

const NOISE_STD = 0.5;

function observeY(x) {
  return (
    TRUE_BETA.slice(1).reduce((sum, b, i) => sum + b * x[i], TRUE_BETA[0]) +
    gaussianRandom() * NOISE_STD
  );
}

function estimateBeta(Xrows, yArr) {
  const X = Xrows;
  const Y = yArr.map((y) => [y]);
  const Xt = transpose(X);
  const XtX = multiplyMatrices(Xt, X);
  const XtY = multiplyMatrices(Xt, Y);
  const XtX_inv = math.inv(XtX);
  const Bhat = multiplyMatrices(XtX_inv, XtY);
  return Bhat.map((r) => r[0]);
}

function runExperiment(steps = 100) {
  const X = [],
    Y = [];
  console.log("Крок |    β̂0    β̂1    β̂2    β̂3");
  console.log("-----|---------------------------");
  for (let i = 0; i <= steps; i++) {
    const x = samplePoint();
    X.push([1, ...x]);
    Y.push(observeY(x));

    if (X.length > TRUE_BETA.length) {
      const beta = estimateBeta(X, Y)
        .map((v) => v.toFixed(3))
        .join("   ");
      console.log(`${i.toString()} | ${beta}`);
    } else {
      console.log(`${i.toString()} | недостатньо точок`);
    }
  }
}

runExperiment();
