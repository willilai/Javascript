function applyVelocity (position, velocity) {
  /*
    Parameters: Position and Velocity of an object
      Assumption: Velocity list has same length as position list.
    Returns: None, but modifies global variables
    Purpose: Apply velocity to position, moving the object.
  */
  var i = 0;
  for (i = 0; i < position.length; i++) {
    position[i] += velocity[i];
  }
}

function mouseMoved (event) {
  /*
    Parameters: event object, which contains information about the event
      that triggered the event listener.
    Returns: None, but modifies global variables which track response to event.
    Purpose: Make the animation respond to keys being pressed.
  */
  // One of the attributes of the event object is 'which,' contains the key
  //   that was pressed to trigger the event listener.
  rectPos[0] = event.x - 50;
}
function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{
  // calculateFPS();

  applyVelocity(circlePos, circleVel);

  if ((circlePos[0] + circlePos[2] > canvas.width) || (circlePos[0] - circlePos[2] < 0))
    {
      circleVel[0] *= -1;
      circleVel[0] += Math.random() - 0.5;
    }
  if ((circlePos[1] + circlePos[2] > canvas.height) || (circlePos[1] - circlePos[2] < 0))
    {
      circleVel[1] *= -1;
      circleVel[1] += Math.random() - 0.5;
    }
  if ((circlePos[1] + circlePos[2] > rectPos[1]) && ((circlePos[0] > rectPos[0]) && (circlePos[0] < (rectPos[0] + rectPos[2]))))
    {
      circleVel[1] = (circleVel[1] + 0.75) * (-1);
      circleVel[1] += Math.random() - 0.5;
      score += 1;
    }
  if (circlePos[1] + circlePos[2] > canvas.height)
    {
      score = 0;
      lives -= 1;
    }

    if (lives == 0)
      {
        return;
      }

  // Draw the line
  context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
    context.fillText("Lives: " + lives, 10, 60)

  context.lineWidth = 3;
  context.lineCap = 'round';
  context.beginPath();
  context.rect(rectPos[0], rectPos[1], rectPos[2], rectPos[3]);
  context.fillStyle = "red";
  context.fill();
  context.stroke();
  context.beginPath();
  context.arc(circlePos[0], circlePos[1], circlePos[2], 0, 2*Math.PI);
  context.fillStyle = "blue";
  context.fill();
  context.stroke();
  console.log(score);

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

// The first two coordinates are one end, the second two are the other end.
var rectPos = [canvas.width / 2, canvas.height * 0.95, 100, 10];

// First two coordinates are x,y of center, last is radius
var circlePos = [50, 50, 25];
var circleVel = [8, 8, 0];

var score = 0;
var lives = 3;


// Set up event listener for when user presses a key down.
// It then calls the function myKeyDown, passing it an event object.
document.addEventListener("mousemove", mouseMoved);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
