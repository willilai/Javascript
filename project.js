function mouseMoved (event) {
  /*
    Parameters: event object, which contains information about the event
      that triggered the event listener.
    Returns: None, but modifies global variables which track response to event.
    Purpose: Make the animation respond to keys being pressed.
  */

  rectPos[0] = event.x - 50;
}
function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{
  circle.applyVelocity()
  circle.bounceCheck();

  // clears the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // display the score and lives left
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 30);
  context.fillText("Lives: " + lives, 10, 60)

  // draws the rectangle
  context.beginPath();
  context.rect(rectPos[0], rectPos[1], rectPos[2], rectPos[3]);
  context.fillStyle = "red";
  context.fill();
  context.stroke();
  // draws the circle
  circle.draw();

  // if they run out of lives, end the game
  if (lives == 0)
    {
      return;
    }

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

// The first two coordinates are one end, the second two are the other end.
var rectPos = [canvas.width / 2, canvas.height * 0.95, 100, 10];

// First two coordinates are x,y of center, last is radius
circle = new Circle(50, 50, 25, context);

// sets up the score and lives left
var score = 0;
var lives = 3;

// Set up event listener for when user presses a key down.
// It then calls the function myKeyDown, passing it an event object.
document.addEventListener("mousemove", mouseMoved);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
