boolean isLeft, isRight, isUp, isDown, isFloat, isSink; 
//float deltx;

//void mousemovement(){
//  if(mouseX == width-1){
//    robby.mouseMove(1, mouseY);
//  }
//  if(mouseX == 0){
//    robby.mouseMove(width-2, mouseY);
//  }
//  deltx = map(mouseX, 0, width, 0, 2*PI);
//}

void keyPressed(){
  setMove(keyCode, true);
}
 
void keyReleased(){
  setMove(keyCode, false);
}

boolean setMove(int k, boolean b){
  switch(k){
  case UP:
    return isUp = b;
 
  case DOWN:
    return isDown = b;
 
  case LEFT:
    return isLeft = b;
 
  case RIGHT:
    return isRight = b;

  case 87:
    return isUp = b;
 
  case 83:
    return isDown = b;
 
  case 65:
    return isLeft = b;
 
  case 68:
    return isRight = b;
    
  case 32:
    return isFloat = b;
    
  case 16:
    return isSink = b;
    
  default:
    return b;
  }
}
