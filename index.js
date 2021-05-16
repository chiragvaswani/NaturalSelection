NUM_BALLS = 100;
VEL = 25;
NUM_GENES = 250;
MUTATION_RATE = 0.02;

averageFitness = 0;
generation = 0;
balls = [];

document.addEventListener("load", setupState);

class Ball {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.radius = 10;
    this.index = 0;
    this.fitness = 0;
    this.done = false;
  }

  draw() {
    this.context.fillStyle = "rgb(173, 216, 230)";
    if (this.done) this.context.fillStyle = "rgb(32, 171, 56)";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fill();
  }

  setGenes(genes) {
    this.genes = genes;
  }

  setRandomGenes() {
    this.genes = [];
    for (let i = 0; i < NUM_GENES; i++) {
      this.genes[i] = [Math.random() - 0.5, Math.random() - 0.5];
    }
  }

  calculateFitness() {
    const distance = Math.sqrt((this.x - 400) ** 2 + (this.y - 765) ** 2);
    this.fitness = Math.max(0, 1 - distance / 800);
  }
}

function setupState() {
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  for (let i = 0; i < NUM_BALLS; i++) {
    var ball = new Ball(395, 25, context);
    ball.setRandomGenes();
    balls.push(ball);
  }
  animateLoop();
}
