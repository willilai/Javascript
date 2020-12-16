// The first two coordinates are one end, the second two are the other end.
var line = [0, 0, 0, 0];
var lineChange = [1, 2, 3, 4];

function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{
  // Change the line endpoints some.
  line[0] += lineChange[0];
  line[1] += lineChange[1];
  line[2] += lineChange[2];
  line[3] += lineChange[3];

  // If the line hits the end of the canvas, bounce
  if ((line[0] > canvas.width) || (line[0] < 0)) {
    lineChange[0] *= -1;
  }
  if ((line[1] > canvas.height) || (line[1] < 0)) {
    lineChange[1] *= -1;
  }
  if ((line[2] > canvas.width) || (line[2] < 0)) {
    lineChange[2] *= -1;
  }
  if ((line[3] > canvas.height) || (line[3] < 0)) {
    lineChange[3] *= -1;
  }

  // Draw the line
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 3;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(line[0], line[1]);
  context.lineTo(line[2], line[3]);
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
