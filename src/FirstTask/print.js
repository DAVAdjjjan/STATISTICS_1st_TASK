function print(alpha, chi2, chi2Critical, h0, h1, df, intervals, expected) {
  console.log("рівень значущості:", alpha);

  console.log(
    `\nСтатистика χ²: ${chi2.toFixed(4)} при критичному значенні χ² = ${chi2Critical.toFixed(4)} (df = ${df})`,
  );
  if (chi2 < chi2Critical) {
    console.log(`\nГіпотеза H₀ приймається:\n${h0}`);
  } else {
    console.log(`\nГіпотеза H₀ відхиляється:\n${h1}`);
  }

  console.log("\nІнтервали:");
  intervals.forEach(({ min, max, frequency, name }, i) => {
    console.log(
      `${name}: [${min.toFixed(3)} – ${max.toFixed(3)}], ` +
        `Емпірична частота: ${frequency}, Очікувана частота: ${expected[i].toFixed(2)}`,
    );
  });
}

module.exports = print;
