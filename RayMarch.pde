ArrayList<Solid> Displayed = new ArrayList<Solid>();

color bgColor = color(0,0,0);

Eye mainEye = new Eye(0,0,0); 

void setup(){
  size(600,400);
  //fullScreen();
  createScene();
}

void draw(){
  background(bgColor);
  //println(frameRate);
  mainEye.move(1);
  mainEye.see();
}

void createScene(){
  Displayed.add(new Sphere(0,0,20,10,color(255,0,0)));
  Displayed.add(new Cube(10,0,20,10,10,10,color(255,255,0)));
  Displayed.add(new Sphere(0,0,50,10,color(0,255,0)));
  
  //Displayed.add(new InfSphere(0,0,0,1,color(0,255,0)));
}
