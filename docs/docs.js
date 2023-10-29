let main;
let displayedSolids = [];
let mainEye;

function setup() {
  setupHTML();
  pixelDensity(1);
  mainEye = new Eye(-14, 28, -2, 0.984, 2.278);
  createScene();
  // noLoop();
}


function draw() {
  mainEye.move(1);
  mainEye.see();
    // console.log("DONE")
}


function createScene(){
  displayedSolids.push(new Sphere(0, 0, 20, 10, color(255, 0, 255)));
  displayedSolids.push(new Cube(10, 0, 20, 10, 10, 10, color(255, 255, 0)));
  displayedSolids.push(new Sphere(0, 0, 50, 10, color(0, 255, 255)));
  
  // displayedSolids.push(new InfSpheres(0, 0, 0, 1, color(0, 255, 0)));
}

// function createScene(){
//   displayedSolids.push(new Cube(0, 0, 0, 10, 10, 10, color(255, 255, 0)));
//   displayedSolids.push(new Cube(0, 10, 0, 10, 10, 10, color(0, 255, 0)));
//   displayedSolids.push(new Cube(0, 20, 0, 10, 10, 10, color(255, 255, 0)));
//   displayedSolids.push(new Cube(10, 0, 0, 10, 10, 10, color(0, 255, 0)));
//   displayedSolids.push(new Cube(10, 10, 0, 10, 10, 10, color(255, 255, 0)));
//   displayedSolids.push(new Cube(10, 20, 0, 10, 10, 10, color(0, 255, 0)));
//   displayedSolids.push(new Cube(20, 0, 0, 10, 10, 10, color(255, 255, 0)));
//   displayedSolids.push(new Cube(20, 10, 0, 10, 10, 10, color(0, 255, 0)));
//   displayedSolids.push(new Cube(20, 20, 0, 10, 10, 10, color(255, 255, 0)));
// }
