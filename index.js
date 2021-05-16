document.addEventListener("load", setupState);

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
