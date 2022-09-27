class Eye{
    constructor(x, y, z){
        this.pos = createVector(x,y,z);
        this.rotxz = 0
        this.roty = 0;

        this.viewAngle = PI/3;
        this.cutoffDist = 300;
        this.maxMarchSteps = 500;
    }
    
    move(speed){
        if(isLeft){
            this.pos.z += speed * sin(3 * PI / 2 + this.roty);
            this.pos.x += speed * cos(3 * PI / 2 + this.roty);
        }
        if(isRight){
            this.pos.z += speed * sin(PI / 2 + this.roty);
            this.pos.x += speed * cos(PI / 2 + this.roty);
        }
        if(isDown){
            this.pos.z += speed * sin(PI + this.roty);
            this.pos.x += speed * cos(PI + this.roty);
        }
        if(isUp){
            this.pos.z += speed * sin(this.roty);
            this.pos.x += speed * cos(this.roty);
        }
        
        if(isFloat){
            this.pos.y += speed;
        }
        if(isSink){
            this.pos.y -= speed;
        }

        this.roty = map(mouseX, 0, width, 0, 2 * PI);
        this.rotxz = map(mouseY, 0, height, 0, PI);
    }
    
    see(){
        loadPixels();
        
        let distanceToScreen = width / (2 * tan(this.viewAngle / 2));
        for(let x = 0; x < width; x++){
            let rayY = this.roty + atan2(x - width / 2, distanceToScreen);
        
            for(let y = 0; y < height; y++){
                let pixelsIndex = (x + y * width) * 4; //https://p5js.org/reference/#/p5/pixels

                let rayXZ = this.rotxz + atan2(y - height / 2, distanceToScreen);
                let pixelColor = this.rayMarch(rayY, rayXZ);

                if(pixelColor){
                    pixels[pixelsIndex] = red(pixelColor);
                    pixels[pixelsIndex + 1] = green(pixelColor);
                    pixels[pixelsIndex + 2] = blue(pixelColor);
                    pixels[pixelsIndex + 3] = alpha(pixelColor);
                } else {
                    pixels[pixelsIndex] = 0.0;
                    pixels[pixelsIndex + 1] = 0.0;
                    pixels[pixelsIndex + 2] = 0.0;
                    pixels[pixelsIndex + 3] = 255.0;
                }
            }
        }
        updatePixels();
    }
    
    rayMarch(angleY, angleXZ){
        let marchDir = createVector(cos(angleY) * sin(angleXZ), cos(angleXZ), sin(angleY) * sin(angleXZ));
        let depth = 0;
        let minDist = 0.01; 
        
        for(let i = 0; i < this.maxMarchSteps; i++) {
            let distCol = distToAllSurfaces(this.pos.copy().add(marchDir.copy().setMag(depth)));
            
            if (distCol.distance < minDist) {
                // We're inside the surface!
                return distCol.color;
            }
        
            if (depth >= this.cutoffDist) {
                // Gone too far; give up
                return false;
            }

            // Move along the view ray
            depth += distCol.distance;
        }
        return false;
    }
}
  
class DistCol {
    constructor(distance, color = 0){
        this.distance = distance;
        this.color = color;
    }
}