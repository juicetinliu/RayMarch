let isLeft, isRight, isUp, isDown, isFloat, isSink; 
let mouseLocked = false;

function keyPressed(){
    setMove(keyCode, true);
}
 
function keyReleased(){
    setMove(keyCode, false);
}

function setMove(key, b){
    switch(key){
        case 87: //w
            return isUp = b;

        case 83: //s
            return isDown = b;

        case 65: //a
            return isLeft = b;

        case 68: //d
            return isRight = b;
            
        case 38:
            return isUp = b;
        
        case 40:
            return isDown = b;
        
        case 37:
            return isLeft = b;
        
        case 39:
            return isRight = b;
            
        case 32:
            return isFloat = b;
            
        case 16:
            return isSink = b;
            
        default:
            return b;
    }
}

function toggleLock(){
    if (!mouseLocked) {
        mouseLocked = true;
        requestPointerLock();
    } else {
        exitPointerLock();
        mouseLocked = false;
    }
}