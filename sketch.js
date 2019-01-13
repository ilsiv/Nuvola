particles = [];
attractor = [];
var flowfield;


var attract;
var rows, cols;
var scl = 100;

var zOff = 0;
var inc = 0.1;

var fr;

// var f;
function setup() {
  createCanvas(1200, 600);
  colorMode(RGB);

  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(rows * cols);

  fr = createP('');

}

function mousePressed() {
  attract = (attract) ? false : true;
}

function mouseDragged() {
  for (j = 0; j < 1; j++) {
    for (let i = 0; i < 5; i++) {
      let p = new Particle(mouseX, mouseY);
      particles.push(p);
    }
    if ((mouseX % 10) == 0) {
      let m = createVector(mouseX, mouseY);
      // m.setMag(1);
      attractor.push(m);
    }
  }
}

function draw() {
  colorMode(RGB);
  background(50, 220, 240);

  var yOff = 0;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var n = noise(xOff, yOff, zOff) * TWO_PI;
      var v = p5.Vector.fromAngle(n);
      v.setMag(0.01);
      flowfield[index] = v;
      xOff += inc;
      if (floor(second() % 10) == 0) {
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        fill(n, 50);
        stroke(0);
        line(0, 0, scl, 0);
        pop();
      }
    }
    yOff += inc;
  }
  zOff += 0.005;



  fr.html(floor(frameRate()));

  for (var i = 0; i <= attractor.length - 1; i++) {
    strokeWeight(10);
    if (!attract) {
      stroke(100);
    } else {
      stroke(255, 0, 0);
    }
    point(attractor[i].x, attractor[i].y);
  }



  for (var i = 0; i <= particles.length - 1; i++) {
    if (attract) {
      particles[i].attractors();
    }
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();

  }
}
