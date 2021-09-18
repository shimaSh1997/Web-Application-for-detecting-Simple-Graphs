function Point(x, y) {
  this.x = x;
  this.y = y;
  const _self = this;
  this.distanceTo = function(p) {
    let xPrime = Math.pow(x - p.x, 2);
    let yPrime = Math.pow(y - p.y, 2);
    return Math.sqrt(xPrime + yPrime);
  };

  this.isEqual = function(otherPoint) {
    return otherPoint.x === _self.x && otherPoint.y === _self.y;
  };
}

function Circle(p, radius = 25, color = 0xfff) {
  if (p.x < 0 && p.y < 0) {
    throw Error("x and y must not be negative");
  }
  this.connectedEdges = [];
  this.x = p.x;
  this.y = p.y;
  this.radius = radius;
  this.color = color;
  const _self = this;
  this.draw = function() {
    fill(color);
    ellipse(_self.x, _self.y, radius * 2, radius * 2);
  };

  this.isEqual = function(otherCircle) {
    return (
      otherCircle.x === _self.x &&
      otherCircle.y === _self.y &&
      otherCircle.radius === _self.radius
    );
  };

  this.contain = function(x, y) {
    let xPrime = Math.pow(x - _self.x, 2);
    let yPrime = Math.pow(y - _self.y, 2);
    let distance = _self.radius;

    return Math.sqrt(xPrime + yPrime) < distance;
  };
}

function Edge(p1, p2, color = 0x999, lineWidth = 2) {
  this.p1 = p1;
  this.p2 = p2;
  this.color = color;
  this.lineWidth = lineWidth;
  this.isLoop = false;
  this.numParallelEdges = 0;
  const _self = this;


  let xShift = 20;
  let yShift = 20;
  let slope = (_self.p2.y - _self.p1.y) / (_self.p2.x - _self.p1.x);

  if (slope < -2 || slope > 2) {
    yShift = 0;
  } else if (slope > -0.2 || slope < 0.2) {
    xShift = 0;
  }

  let midX = (_self.p2.x + _self.p1.x) / 2;
  let midY = (_self.p2.y + _self.p1.y) / 2;

  this.isEqual = function(otherEdge) {
    return (
      (_self.p1.isEqual(otherEdge.p1) && _self.p2.isEqual(otherEdge.p2)) ||
      (_self.p1.isEqual(otherEdge.p2) && _self.p2.isEqual(otherEdge.p1))
    );
  };

  this.draw = function() {
    stroke(color);
    strokeWeight(lineWidth);
    if (_self.isLoop) {
      // draw loop
      let arcPoint = new Point(p1.x + CIRCLE_RADIUS, p1.y);

      noFill();
      arc(
        arcPoint.x,
        arcPoint.y,
        CIRCLE_RADIUS * 2,
        CIRCLE_RADIUS * 2,

        (5 * Math.PI) / 4,
        (3 * Math.PI) / 4
      );
      if (_self.numParallelEdges > 0) {
        noStroke();
        fill(255, 255, 0);
        textSize(15);
        text(
          `${_self.numParallelEdges + 1}`,
          arcPoint.x + CIRCLE_RADIUS + 15,
          arcPoint.y
        );
      }
    } else {
      

      line(_self.p1.x, _self.p1.y, _self.p2.x, _self.p2.y);
      if (_self.numParallelEdges > 0) {
        noStroke();
        fill(255, 255, 0);
        textSize(15);
        text(`${_self.numParallelEdges + 1}`, midX + xShift, midY + yShift);
      }
    }
  };
}
