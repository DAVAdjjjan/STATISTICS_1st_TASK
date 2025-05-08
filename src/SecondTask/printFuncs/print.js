function print({ alpha, mean, deviation, lower, upper, task, reason = "" }) {
  if (reason) console.log(reason + "\n");
  console.log(task);

  console.log(`Рівень довіри ${(1 - alpha) * 100}%`);
  console.log(
    `${mean !== undefined ? "Середнє " + mean.toFixed(3) : "Оцінка дисперсії " + deviation.toFixed(3)}`,
  );
  console.log(`Інтервал: [${lower.toFixed(3)} ; ${upper.toFixed(3)}]`);
}

module.exports = print;
