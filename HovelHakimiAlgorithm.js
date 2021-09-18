document.getElementById("SOLVE").addEventListener("click", function() {
  // alert("Solving...");
  let validation = true;
  for (let item of edges) {
    if (item.isLoop) {
      alert("graph has loop edges");
      validation = false;
      break;
    } else if (item.numParallelEdges > 0) {
      alert("graph has parallel edges");
      validation = false;
      break;
    }
  }
  if (validation == true) {
    const ranks = circles.map(node => node.connectedEdges.length);

    if (HovelHakimi(ranks)) {
      console.log("yesss");
    } else {
      console.log("no");
    }
  }
});

document.getElementById("CLEAR").addEventListener("click", function() {
  console.log("Clearing...");
  circles = [];
  edges = [];
  selectedCircle = null;
  snappedCircle = null;
});

function HovelHakimi(seq) {
  while (true) {
    let sorted_seq = seq.sort().reverse();
    if (sorted_seq[0] == 0 && sorted_seq[sorted_seq.length - 1] == 0) {
      return true;
    }
    first_element = sorted_seq.shift();
    if (first_element > sorted_seq.length) {
      return false;
    }
    for (let i = 0; i < first_element; i++) {
      sorted_seq[i] = sorted_seq[i] - 1;

      if (sorted_seq[i] < 0) {
        return false;
      }
    }
  }
}
