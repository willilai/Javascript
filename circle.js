class Circle {
  constructor(cx, cy, r)
  // creates a center, radius, and velocity attribute
    {
      this.center = [cx, cy];
      this.radius = r;
      this.vel = [8, 8];
    }

  applyVelocity()
    {
      // Adds the velocity to the center
      this.center[0] += this.vel[0];
      this.center[1] += this.vel[1];
    }

  bounceCheck()
    {
      // Check if any point is over any edge.  If it is over the edge, then
      //   set it to be at the edge, reverse direction, and slightly modify
      //   the velocity by a little.
      if (this.center[0] + this.radius >= canvas.width)
        {
          this.center[0] = canvas.width - this.radius;
          this.vel[0] *= -1;
          this.vel[0] += (Math.random() - 0.5) * 1.2;
        }
      if (this.center[0] - this.radius <= 0)
        {
          this.center[0] = this.radius;
          this.vel[0] *= -1;
          this.vel[0] += (Math.random() - 0.5) * 1.2;
        }
        // loses a life
      if (this.center[1] + this.radius >= canvas.height)
        {
          this.center[1] = canvas.height - this.radius;
          this.vel[1] *= -1;
          this.vel[1] += (Math.random() - 0.5) * 1.2;
          lives -= 1;
        }
      if (this.center[1] - this.radius <= 0)
        {
          this.center[1] = this.radius;
          this.vel[1] *= -1;
          this.vel[1] += (Math.random() - 0.5) * 1.2;
        }
      if ((this.center[1] + this.radius >= rectPos[1]) && ((this.center[0] >= rectPos[0]) && (this.center[0] <= (rectPos[0] + rectPos[2]))))
        {
          console.log("in");
          this.center[1] = rectPos[1] - this.radius;
          this.vel[1] = (this.vel[1] + 0.5) * (-1);
          score += 1;
        }
    }

  draw()
    {
      // draws the circle
      context.beginPath();
      context.arc(this.center[0], this.center[1], this.radius, 0, 2*Math.PI);
      context.fillStyle = "blue";
      context.fill();
      context.stroke();
    }
}
