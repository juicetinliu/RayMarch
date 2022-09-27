function absPVec(vecin){
    return vecin.set(abs(vecin.x), abs(vecin.y), abs(vecin.z));
}

function maxPVec(vec1, vec2){
    return createVector(max(vec1.x, vec2.x), max(vec1.y,vec2.y), max(vec1.z,vec2.z));
}

function maxPVecVal(vec1, val){
    return createVector(max(vec1.x, val), max(vec1.y,val), max(vec1.z,val));
}

function minPVec(vec1, vec2){
    return createVector(min(vec1.x, vec2.x), min(vec1.y,vec2.y), min(vec1.z,vec2.z));
}

function minPVecVal(vec1, val){
    return createVector(min(vec1.x, val), min(vec1.y,val), min(vec1.z,val));
}

function printVec(vecin){
    print(vecin.x + "," + vecin.y + "," + vecin.z + " ");
}

function moduloPVec(vecin, val){
    return createVector(vecin.x % val, vecin.y % val, vecin.z % val);
}


function minDCol(dc1, dc2){
    if(dc1.distance > dc2.distance){
        return dc2;
    }else{
        return dc1;
    }
}

function maxDCol(dc1, dc2){
    if(dc2.distance > dc1.distance){
        return dc2;
    }else{
        return dc1;
    }
}