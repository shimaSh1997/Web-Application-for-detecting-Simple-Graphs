// app states
const STATE = {
  isPlacingNode: true
};

const Mouse = {
  isPressed: false,
  isDragging: false,
  lockClick: false,
  x: 0,
  y: 0
};

// app event handlers
function mouseDragged() {
  Mouse.isDragging = true;
  Mouse.isPressed = true;
  return false;
}

function mouseReleased(fxn) {
  Mouse.isPressed = false;
  Mouse.isDragging = false;
  Mouse.lockClick = false;

  if (snappedCircle !== null && selectedCircle !== null) {
    const p1 = new Point(selectedCircle.x, selectedCircle.y);
    const p2 = new Point(snappedCircle.x, snappedCircle.y);
    const e = new Edge(p1, p2, 0xf00, 2);

    // we found a loop
    if (snappedCircle.isEqual(selectedCircle)) {
      let _foundLoop = null;
      for (let tempEdge of snappedCircle.connectedEdges) {
        if (tempEdge.isLoop) {
          _foundLoop = tempEdge;
        }
      }
      if (_foundLoop) {
        _foundLoop.numParallelEdges++;
      } else {
        e.isLoop = true;
        snappedCircle.connectedEdges.push(e);
      }
    }
    // its a normal edge
    else {
      let _foundParallelEdge = null;
      for (let tempEdge of snappedCircle.connectedEdges) {
        if (tempEdge.isEqual(e)) {
          _foundParallelEdge = tempEdge;
        }
      }

      if (_foundParallelEdge) {
        _foundParallelEdge.numParallelEdges++;
      } else {
        snappedCircle.connectedEdges.push(e);
        selectedCircle.connectedEdges.push(e);
      }
    }
    edges.push(e);
    // console.log(edges.sort());
  }
  selectedCircle = null;
  snappedCircle = null;
}

function mousePressed(fxn) {
  Mouse.isPressed = true;
}

// app helpers in fucked up situation
//TODO: remove the comment above later to not get fucked at presentation
function isOverlapping(x, y, c, margin = 0) {
  let xPrime = Math.pow(x - c.x, 2);
  let yPrime = Math.pow(y - c.y, 2);
  let distance = c.radius + margin;

  return Math.sqrt(xPrime + yPrime) < distance;
}

// function getDegreeOfEachNode() {
//   degreeOfSequence = [];
//   for (let i = 0; i < circles.length; i++) {
//     return degreeOfSequence.push("node: ", circles[i].connectedEdges.length);
//     // return degreeOfSequence.push(`node${i}:`, circles[i].connectedEdges.length);
//     //  `circles${i}`, circles[i].connectedEdges.length;
//   }
// }
