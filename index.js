NUM_BALLS = 100;
VEL = 25;
NUM_GENES = 250;
MUTATION_RATE = 0.02;

averageFitness = 0;
generation = 0;
balls = [];

document.addEventListener("DOMContentLoaded", setupState);

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

  update() {
    if (300 < this.x && this.x < 420 && this.y > 745 && this.y < 785) {
      this.done = true;
      this.index++;
    } else if (this.index < NUM_GENES) {
      this.x += VEL * this.genes[this.index][0];
      this.y += VEL * this.genes[this.index][1];
      this.index++;
    }
  }
}

function setupState() {
  console.log("Set up started");
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  for (let i = 0; i < NUM_BALLS; i++) {
    var ball = new Ball(395, 25, context);
    ball.setRandomGenes();
    balls.push(ball);
  }
  animateLoop();
}

function animateLoop() {
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  requestAnimationFrame(animateLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < NUM_BALLS; i++) {
    var ball = balls[i];
    ball.update();
    ball.draw();
  }

  context.fillStyle = "rgb(173, 216, 230)";
  context.fillRect(380, 745, 40, 40);
  context.fillStyle = "rgb(0,0,0)";
  context.fillText("Generation: " + generation.toString(), 15, 45);
  context.fillText(
    "Average fitness: " + averageFitness.toFixed(2).toString(),
    15,
    90
  );

  if (balls[0].index == NUM_GENES) nextGen();
}

function nextGen() {
  generation++;
  console.log("Generation: ", generation);

  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");

  var candidates = [];
  var totalFitness = 0;
  for (let i = 0; i < NUM_BALLS; i++) {
    var ball = balls[i];
    ball.calculateFitness();
    totalFitness += ball.fitness;
    for (let j = 0; j < 2 ** (ball.fitness * 10); j++) candidates.push(ball);
  }
  averageFitness = totalFitness / NUM_BALLS;
  console.log("Average fitness:", averageFitness);

  var newBalls = [];
  for (let i = 0; i < NUM_BALLS; i++) {
    // Parent 1
    var parent1 = candidates[Math.floor(Math.random() * candidates.length)];
    // Parent 2
    var parent2 = candidates[Math.floor(Math.random() * candidates.length)];
    // Child
    var child = new Ball(395, 25, context);

    genes = [];
    for (let j = 0; j < NUM_GENES; j++) {
      if (Math.random() < MUTATION_RATE)
        genes.push([Math.random() - 0.5, Math.random() - 0.5]);
      else if (j % 2) genes.push(parent1.genes[j]);
      else genes.push(parent2.genes[j]);
    }
    ball.setGenes(genes);
    newBalls.push(ball);
  }
  balls = newBalls;
}
