const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CIRCLE_RADIUS = 30;

var circles = [];
var edges = [];
var selectedCircle = null;
var snappedCircle = null;
let button;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  textAlign(CENTER, CENTER);
  // button = createButton("Click Me");
  // button.position(WIDTH * 0.9, height * 0.9);
}
function draw() {
  Mouse.x = pmouseX;
  Mouse.y = pmouseY;

  // get user input
  if (Mouse.isPressed && Mouse.y > 100) {
    if (!Mouse.isDragging && !Mouse.lockClick) {
      Mouse.lockClick = true;
      let _isOverlapped = false;

      for (let c of circles) {
        if (isOverlapping(Mouse.x, Mouse.y, c, CIRCLE_RADIUS)) {
          _isOverlapped = true;
          if (c.contain(Mouse.x, Mouse.y)) {
            selectedCircle = c;
          }
        }
      }

      if (!_isOverlapped) {
        STATE.isPlacingNode = true;
        const p = new Point(Mouse.x, Mouse.y);
        circles.push(new Circle(p));
        selectedCircle = null;
      } else if (circles.length > 1) {
        STATE.isPlacingNode = false;
      }
    }
  }

  // draw and render
  background(0);
  noStroke();
  noFill();

  for (const c of circles) {
    c.draw();
  }
  for (const e of edges) {
    e.draw();
  }

  if (Mouse.isDragging && !STATE.isPlacingNode && selectedCircle !== null) {
    push();
    stroke(255, 0, 0);
    strokeWeight(3);
    let _xSnapp = Mouse.x;
    let _ySnapp = Mouse.y;
    for (const c of circles) {
      if (c.contain(Mouse.x, Mouse.y)) {
        _xSnapp = c.x;
        _ySnapp = c.y;
        snappedCircle = c;
      }
    }

    line(selectedCircle.x, selectedCircle.y, _xSnapp, _ySnapp);
    pop();
  }
}
