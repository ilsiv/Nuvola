function Particle(x, y) {
  this.pos = createVector(x, y);
  // this.vel = createVector();
  this.vel = p5.Vector.random2D();
  // this.vel.setMag(random(5, 10));
  this.acc = createVector(0, 0);
  this.alpha = random(100, 255);
  // this.di = floor(random(-1, 1));

  this.di = (random(1) > 0.5) ? 1 : -1;




  this.update = function() {
    let v = this.size / 2;
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    this.vel.add(this.acc);
    this.vel.limit(20 / this.size);
    // this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.alpha <= 50 || this.alpha >= 255) {
      this.di = this.di * -1;
    }
    this.alpha -= (1 * this.di);
    this.size = map(this.alpha, 0, 255, 10, 30);

  }

  this.show = function() {
    // stroke(map(this.size, 10, 30, 60), 200, 200, this.alpha);
    // stroke(255);
    strokeWeight(1);
    colorMode(HSB);
    // noStroke();
    fill(map(this.size, 10, 30, 60, 0), 80, 95, this.alpha / 2);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }


  this.attractors = function() {
    for (var i = 0; i <= attractor.length - 1; i++) {
      let f = attractor[i].copy();

      f.sub(this.pos);
      let d = f.mag();
      // d = constrain(d, 2, this.size);
      var G = 2;
      var strength = G / (d * d);
      f.setMag(strength * 2);
      if (d < this.size) {
        f.mult(-3);
      }
      this.acc.add(f);
      // console.log(f.mag());
    }
  }


  this.follow = function(vec) {

    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);

    var index = x + y * cols;
    var force = vec[index];
    // force.setMag(0.9);
    // console.log(index);
    this.applyForce(force);

  }
}
