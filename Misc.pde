PVector absPVec(PVector vecin){
  return vecin.set(abs(vecin.x), abs(vecin.y), abs(vecin.z));
}

PVector maxPVec(PVector vec1, PVector vec2){
  return new PVector(max(vec1.x, vec2.x), max(vec1.y,vec2.y), max(vec1.z,vec2.z));
}

PVector maxPVec(PVector vec1, float val){
  return new PVector(max(vec1.x, val), max(vec1.y,val), max(vec1.z,val));
}

PVector minPVec(PVector vec1, PVector vec2){
  return new PVector(min(vec1.x, vec2.x), min(vec1.y,vec2.y), min(vec1.z,vec2.z));
}

PVector minPVec(PVector vec1, float val){
  return new PVector(min(vec1.x, val), min(vec1.y,val), min(vec1.z,val));
}

void printVec(PVector vecin){
  print(vecin.x + "," + vecin.y + "," + vecin.z + " ");
}

PVector moduloPVec(PVector vecin, float amt){
  return new PVector(vecin.x % amt, vecin.y % amt, vecin.z % amt);
}


distCol minDCol(distCol dc1, distCol dc2){
  if(dc1.dist > dc2.dist){
    return dc2;
  }else{
    return dc1;
  }
}

distCol maxDCol(distCol dc1, distCol dc2){
  if(dc2.dist > dc1.dist){
    return dc2;
  }else{
    return dc1;
  }
}

//distCol maxDCol(distCol dc1, distCol dc2){
//  if(dc2.dist > dc1.dist){
//    return dc2;
//  }else{
//    return dc1;
//  }
//}


//float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
//    return mix( d2, d1, h ) - k*h*(1.0-h); }
