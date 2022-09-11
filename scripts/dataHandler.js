class DataHandler {
    constructor(total, {min, max}) {
        this.white = [];
        this.red = [];
        this.total = total;
        this.min = min;
        this.max = max;
    }

    /**
     * This function is used to generate the initial random data
     */
    generateData() {
        for (let i = 0; i < this.total; i++) {
            this.white.push({
                x: Math.round(this.generateRandomInteger(this.min, this.max)),
                y: Math.round(this.generateRandomInteger(this.min, this.max))
            });
            this.red.push({
              x: Math.round(this.generateRandomInteger(this.min, this.max)),
              y: Math.round(this.generateRandomInteger(this.min, this.max))
          });
        }
    }

    getData() {
        return { white: this.white, red: this.red };
    }

    /**
     * This function is the perceptron's teacher
     */
    isRed(x, y) {
      // f(x) = 2x + 1
      if (y > 2*x + 1) {
        return 1;
      } else {
        return 0;
      }
    }

    /*
    *   This function is used to generate a 100% accurate line, just to compare with the perceptron's line
    */
    getFixedData() {
      // f(x) = 2x + 1
      const red = [];
      const white = [];
      this.white.forEach((point) => {
        if (point.y > 2 * point.x + 1) {
          red.push(point);
        } else {
          white.push(point);
        }
      });
      this.red.forEach((point) => {
        if (point.y > 2 * point.x + 1) {
          red.push(point);
        } else {
          white.push(point);
        }
      });
      return { white, red };
    }

    generateRandomInteger(min, max) {
      return min + Math.random()*(max - min + 1)
    }
}