// https://michaelwalczyk.com/blog-ray-marching.html

class Eye{
    constructor(x, y, z, roty = 0, rotxz = 0){
        this.position = createVector(x, y, z);
        this.rotxz = rotxz;
        this.roty = roty;

        this.deltx = 23.5;
        this.delty = 72.5;

        this.viewDirection = createVector();
        this.viewPlaneDirectionX = createVector();
        this.viewPlaneDirectionY = createVector();

        this.distanceToScreen = 100;
        this.cutoffDist = 300;
        this.maxMarchSteps = 100;
    }
    
    move(speed){
        if(isLeft){
            this.position.z += speed * sin(3 * PI / 2 + this.roty);
            this.position.x += speed * cos(3 * PI / 2 + this.roty);
        }
        if(isRight){
            this.position.z += speed * sin(PI / 2 + this.roty);
            this.position.x += speed * cos(PI / 2 + this.roty);
        }
        if(isDown){
            this.position.z += speed * sin(PI + this.roty);
            this.position.x += speed * cos(PI + this.roty);
        }
        if(isUp){
            this.position.z += speed * sin(this.roty);
            this.position.x += speed * cos(this.roty);
        }
        
        if(isFloat){
            this.position.y += speed;
        }
        if(isSink){
            this.position.y -= speed;
        }

        if(mouseLocked) {
            this.deltx = (this.deltx + movedX) % width;
            this.deltx = (this.deltx > 0) ? this.deltx : this.deltx + width;
            this.delty = Math.min(Math.max(this.delty + movedY, 0), height-1);

            this.roty = map(this.deltx, 0, width, 0, 2 * PI);
            this.rotxz = map(this.delty, 0, height, 0, PI);
        }

        this.viewDirection.set(
            cos(this.roty) * sin(this.rotxz),
            cos(this.rotxz), 
            sin(this.roty) * sin(this.rotxz)
        ).normalize();

        //parallel to XZ plane but towards the positive X-axis ('rightwards') from POV of Eye
        this.viewPlaneDirectionX.set(
            cos(this.roty + PI/2),
            0,
            sin(this.roty + PI/2)
        ).normalize();

        this.viewPlaneDirectionY = this.viewDirection.cross(this.viewPlaneDirectionX).normalize(); //give us 'upwards' Y-axis from POV of eye

        this.viewDirection.setMag(this.distanceToScreen);
    }
    
    see(){
        loadPixels();
        for(let x = 0; x < width; x++){
            for(let y = 0; y < height; y++){
                let pixelsIndex = (x + y * width) * 4; //https://p5js.org/reference/#/p5/pixels

                let imagePlaneX = x - width/2;
                let imagePlaneY = y - height/2;
                let imagePlaneDirectionX = this.viewPlaneDirectionX.copy().setMag(imagePlaneX);
                let imagePlaneDirectionY = this.viewPlaneDirectionY.copy().setMag(imagePlaneY);

                let marchDirection = this.viewDirection.copy().add(imagePlaneDirectionX).add(imagePlaneDirectionY);
                // console.log(marchDirection);
                let pixelColor = this.rayMarch(marchDirection);

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
    
    rayMarch(marchDirectionVector){
        let depth = 0;
        let minDist = 0.01; 
        
        for(let i = 0; i < this.maxMarchSteps; i++) {
            let distCol = distToAllSurfaces(this.position.copy().add(marchDirectionVector.copy().setMag(depth)));
            
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