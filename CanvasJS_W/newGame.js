// The first two coordinates are one end, the second two are the other end.
var linePos = [0, 0, 0, 0];
var lineVel = [1, 2, 3, 4];
var center = [0, 0,];
var centerChange = [1, 2];
var radius = 10;

// Count frames, track time so we can compute fps rate
var frames = 0;
var start = new Date();
var now = new Date();
console.log(start);

function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{
  frames += 1;
  if (frames % 200 == 0) {
    now = new Date();
    msecs = now.getTime() - start.getTime();
    console.log(now.getTime());
    console.log("fps:", (frames / msecs) * 1000);
  }

  // Change the center endpoints some.
  center[0] += centerChange[0];
  center[1] += centerChange[1];
  linePos[0] += lineVel[0];
  linePos[1] += lineVel[1];
  linePos[2] += lineVel[2];
  linePos[3] += lineVel[3];

  // If the center hits the end of the canvas, bounce
  // Add/subtract a little speed
  if ((center[0] > canvas.width) || (center[0] < 0)) {
    centerChange[0] *= -1;
    centerChange[0] += Math.random() - 0.5;
    console.log(centerChange);

    lineVel[0] *= -1;
    lineVel[0] += Math.random() - 0.5;
    console.log(lineVel);
  }
  if ((center[1] > canvas.height) || (center[1] < 0)) {
    centerChange[1] *= -1;
    centerChange[1] += Math.random() - 0.5;
    console.log(centerChange);

    lineVel[1] *= -1;
    lineVel[1] += Math.random() - 0.5;
    console.log(lineVel);
  }
  if ((line[2] > canvas.width) || (line[2] < 0)) {
    lineVel[2] *= -1;
    lineVel[2] += Math.random() - 0.5;
    console.log(lineVel);
    // console.log(lineVel);
  }
  if ((line[3] > canvas.height) || (line[3] < 0)) {
    lineVel[3] *= -1;
    lineVel[3] += Math.random() - 0.5;
    console.log(lineVel);
    // console.log(lineVel);
  }

  // Draw the center
  context.clearRect(0, 0, canvas.width, canvas.height);
//  context.centerWidth = 3;
//  context.centerCap = 'round';
//  context.beginPath();
//  context.moveTo(center[0], center[1]);
//  context.centerTo(center[2], center[3]);
  context.fillStyle = "#00ff00";
  context.fillRect(center[0], center[1], center[2] - center[0], center[3] - center[1]);
  context.stroke();
  context.arc(center[0], center[1], radius, 0 , 2 * Math.PI);
  context.stroke();

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

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
