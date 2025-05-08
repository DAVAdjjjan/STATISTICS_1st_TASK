class Sample {
  constructor(data) {
    this.data = data;
    this.len = data.length;
    this.alpha = 0.05;
  }

  mean() {
    return this.data.reduce((acc, curr) => acc + curr, 0) / this.len;
  }

  deviation() {
    const m = this.mean();
    return (
      this.data.reduce((acc, curr) => acc + (curr - m) ** 2) / (this.len - 1)
    );
  }

  std() {
    return Math.sqrt(this.deviation());
  }
}

module.exports = Sample;
