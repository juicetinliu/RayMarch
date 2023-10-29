class Solid{
    constructor(x, y, z, col, type){
        this.pos = createVector(x,y,z);
        this.col = col;
        this.type = type;
    }
    
    distToSurf(){
        return 0;
    }
}
  
class Sphere extends Solid{
    constructor(x, y, z, r, col){
      super(x, y, z, col, 1);
      this.r = r;
    }
    
    distToSurf(viewVector){
        let p = viewVector.copy().sub(this.pos);
        return p.mag() - this.r;
    }
}
  
class Cube extends Solid{
    constructor(x, y, z, w, h, d, col){
        super(x, y, z, col, 2);
        this.dims = createVector(w, h, d);
    }
    
    distToSurf(viewVector){
        let p = viewVector.copy().sub(this.pos);
        let q = absPVec(p).sub(this.dims);
        
        return maxPVecVal(q, 0.0).mag() + min(max(q.x, max(q.y, q.z)), 0.0);
    }
}
  
  
class InfSpheres extends Solid{
    constructor(x, y, z, r, col){
        super(x, y, z, col, 3);
        this.r = r;
    }
    
    distToSurf(viewVector){
        let p = moduloPVec(viewVector.copy(), 10).sub(this.pos);
        return p.mag() - this.r;
    }
}
  
function distToAllSurfaces(viewVector){
    let minDistCol = new DistCol(200, color(255,255,255));
    displayedSolids.forEach(thisSolid => {
        minDistCol = minDCol(minDistCol, new DistCol(thisSolid.distToSurf(viewVector), thisSolid.col));
    })
    return minDistCol;
}
  