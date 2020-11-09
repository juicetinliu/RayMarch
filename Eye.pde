class Eye{
  PVector pos;
  //PVector dir = new PVector(0,0,0);
  float rotxz = 0, roty = 0;
  
  float widthangrange = PI/3;
  
  float cutoffDist = 300;
  int maxMarchSteps = 500;
  
  Eye(float x, float y, float z){
    this.pos = new PVector(x,y,z);
  }
  
  void move(float speed){
    if(isLeft){
      pos.z += speed*sin(3*PI/2+roty);
      pos.x += speed*cos(3*PI/2+roty);
    }
    if(isRight){
      pos.z += speed*sin(PI/2+roty);
      pos.x += speed*cos(PI/2+roty);
    }
    if(isDown){
      pos.z += speed*sin(PI+roty);
      pos.x += speed*cos(PI+roty);
    }
    if(isUp){
      pos.z += speed*sin(roty);
      pos.x += speed*cos(roty);
    }
    
    if(isFloat){
      pos.y += speed;
    }
    if(isSink){
      pos.y -= speed;
    }
    roty = map(mouseX,0,width,0,2*PI);
    rotxz = map(mouseY,0,height,0,PI);
  }
  
  void see(){
    loadPixels();
    //float xzstep = xzangrange/float(height);
    //float ystep = yangrange/float(width);
    float dtoscreen = float(width)/(2*tan(widthangrange/2));
    for(int x = 0; x < width; x++){
      float rayy = roty+atan2(x-width/2,dtoscreen);
    
      for(int y = 0; y < height; y++){
        float rayxz = rotxz+atan2(y-height/2,dtoscreen);
        distCol thisdc = rayMarch(rayy,rayxz);
        if(thisdc.dist < cutoffDist){
          //float alpha = map(thisdc.dist,0,cutoffDist,1,0);
          color pixelcolor = color(thisdc.col);
          pixels[x+y*width] = pixelcolor;
        }
      }
    }
    updatePixels();
  }
  
  distCol rayMarch(float angy, float angxz){
    
    PVector marchDir = new PVector(cos(angy)*sin(angxz), cos(angxz), sin(angy)*sin(angxz) );
    float depth = 0;
    float minDist = 0.1; 
    
    for (int i = 0; i < maxMarchSteps; i++) {
      
      distCol dist = distToAllSurf(pos.copy().add(marchDir.copy().setMag(depth)));
      
      if (dist.dist < minDist) {
          // We're inside the scene surface!
          
          return new distCol(depth,dist.col);
          //return new distCol(depth,color(map(i,0,100,0,255)));
      }
      // Move along the view ray
      depth += dist.dist;
  
      if (depth >= cutoffDist) {
          // Gone too far; give up
          return new distCol(cutoffDist);
      }
    }
    return new distCol(cutoffDist);
  }
  
  
}

class distCol{
  float dist;
  color col;
  
  distCol(float dist, color col){
    this.dist = dist;
    this.col = col;
  }
  
  distCol(float dist){
    this.dist = dist;
    this.col = 0;
  }
}
