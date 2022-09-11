class Perceptron {
  constructor(inputs, rate) {
    this.weights = new Array(inputs);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = this.generateRandomInteger(-0.5, 0.5);
    }
    this.rate = rate;
  }

  guess(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.step(sum);
  }

  step(sum) {
    if (sum > 0) return 1;
    else return 0;
  }

  train(inputs, desired) {
    let guess = this.guess(inputs);
    let error = desired - guess;

    if (error !== 0) {
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += error * inputs[i] * this.rate;   
      }
    }
  }

  generateRandomInteger(min, max) {
    return min + Math.random()*(max - min + 1)
  }
}