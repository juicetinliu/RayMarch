class Solid{
  PVector pos;
  color col;
  int type;
  
  Solid(float x, float y, float z, color col, int type){
    this.pos = new PVector(x,y,z);
    this.col = col;
    this.type = type;
  }
  
  float distToSurf(){
    return 0;
  }
  
}

class Sphere extends Solid{
  float r;
  Sphere(float x, float y, float z, float r, color col){
    super(x,y,z,col,1);
    this.r = r;
  }
  
  float distToSurf(PVector view){
    //printVec(view);
    PVector p = view.copy().sub(pos);
    //println(p.mag()-r);
    return p.mag() - r;
  }
  
}

class Cube extends Solid{
  PVector dims; //w, h, d
  Cube(float x, float y, float z, float w, float h, float d, color col){
    super(x,y,z,col,2);
    this.dims = new PVector(w,h,d);
  }
  
  float distToSurf(PVector view){
    
    PVector p = view.copy().sub(pos);
    PVector q = absPVec(p).sub(dims);
    
    return maxPVec(q,0.0).mag() + min(max(q.x,max(q.y,q.z)),0.0);
  }
}


class InfSphere extends Solid{
  float r;
  InfSphere(float x, float y, float z, float r, color col){
    super(x,y,z,col,3);
    this.r = r;
  }
  
  float distToSurf(PVector view){
    //printVec(view);
    PVector p = moduloPVec(view.copy(), 10).sub(pos);
    //println(p.mag()-r);
    return p.mag() - r;
  }
  
}

distCol distToAllSurf(PVector view){
  distCol minDistCol = new distCol(200,bgColor);
  //float mindist = 200;
  //color col = bgColor;
  for(Solid thissolid:Displayed){
    switch(thissolid.type){
      case 1:
        Sphere thissphere = (Sphere) thissolid;
        //float spheredist = thissphere.distToSurf(view);
        //if(spheredist < mindist){
        //  mindist = spheredist;
        //  col = thissphere.col;
        //}
        minDistCol = minDCol(minDistCol, new distCol(thissphere.distToSurf(view),thissphere.col));
        //mindist = min(mindist,thissphere.distToSurf(view));
      break;
      case 2:
        Cube thiscube = (Cube) thissolid;
        //float cubedist = thiscube.distToSurf(view);
        //if(cubedist < mindist){
        //  mindist = cubedist;
        //  col = thiscube.col;
        //}
        minDistCol = minDCol(minDistCol, new distCol(thiscube.distToSurf(view),thiscube.col));
        //mindist = min(mindist,thiscube.distToSurf(view));
      break;
      case 3:
        InfSphere thisinfsphere = (InfSphere) thissolid;
        //float spheredist = thissphere.distToSurf(view);
        //if(spheredist < mindist){
        //  mindist = spheredist;
        //  col = thissphere.col;
        //}
        minDistCol = minDCol(minDistCol, new distCol(thisinfsphere.distToSurf(view),thisinfsphere.col));
        //mindist = min(mindist,thissphere.distToSurf(view));
      break;
      default:
        return minDistCol;
    }
  }
  
  return minDistCol;
}
