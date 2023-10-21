function init() {
  newScramble();
  window.addEventListener("resize", drawCube);
}
$(document).ready(function () {
  init();
});

function newScramble() {
  var box = document.querySelector("#content-text");
  var scramble = getScramble(0);
  box.innerHTML = scramble;
  convert(scramble);
}
var context = document.getElementById("canvas").getContext("2d");

function convert(scramble) {
  scramble = clean(scramble);
  console.log(scramble);
  executeScramble(scramble);
  var edge = document.querySelector("#edges");
  edge.innerHTML = getEdgeSolution();
  var corner = document.querySelector("#corners");
  corner.innerHTML = getCornerSolution();
  drawCube();
}

function clean(scramble) {
  //split string to array
  var scram_s = scramble.split(" ");
  //remove empty strings
  var scram = [];
  for (var i = 0; i < scram_s.length; i++) {
    if (scram_s[i] != "") {
      scram.push(scram_s[i]);
    }
  }

  return scram;
}

var cube_letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "z",
];
var backup = [
  "u",
  "g",
  "i",
  "z",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "z",
];

function drawCube() {
  var c = document.getElementById("canvas");
  c.width = window.innerWidth / 2;
  c.height = window.innerHeight / 2;
  var ctx = c.getContext("2d");
  var size = Math.floor(Math.min(c.width / 12, c.height / 9)) - 1;

  c.width = 12 * size + size;
  c.height = 9 * size + size;
  drawCenters(ctx, size);
  drawCorners(ctx, size);
  drawEdges(ctx, size);
  console.log("Draw cube");
}

function drawEdges(ctx, size) {
  var colors = getCubeColor(getCubeEdges());
  ctx.strokeStyle = "#000000";
  for (var i = 0; i < backup.length; i++) {
    var x = i % 4;
    var y = Math.floor(i / 4);
    var z = y == 0 ? 1 : y % 4;
    var z2 = Math.ceil((y % 5) / 5) + Math.floor(y / 5) * 2;
    if (i % 4 == 2) {
      drawSquare(
        ctx,
        z * 3 * size + size,
        z2 * 3 * size + size * (Math.floor(x / 3) + (x % 3)),
        size,
        colors[i]
      );
    } else {
      drawSquare(
        ctx,
        z * 3 * size + ((x + 1) % 4) * size,
        z2 * 3 * size + size * (Math.floor(x / 3) + (x % 3)),
        size,
        colors[i]
      );
    }
  }
}

function drawCorners(ctx, size) {
  var colors = getCubeColor(getCubeCorners());
  ctx.strokeStyle = "#000000";
  for (var i = 0; i < 24; i++) {
    var x = i % 4;
    var y = Math.floor(i / 4);
    var z = y == 0 ? 1 : y % 4;
    var z2 = Math.ceil((y % 5) / 5) + Math.floor(y / 5) * 2;
    drawSquare(
      ctx,
      z * 3 * size + 2 * size * Math.ceil((x % 3) / 3),
      3 * z2 * size + 2 * size * Math.floor(x / 2),
      size,
      colors[i]
    );
  }
}
function drawCenters(ctx, size) {
  ctx.strokeStyle = "#000000";
  drawSquare(ctx, 4 * size, 1 * size, size, "white");
  drawSquare(ctx, 4 * size, 4 * size, size, "green");
  drawSquare(ctx, 7 * size, 4 * size, size, "red");
  drawSquare(ctx, 10 * size, 4 * size, size, "blue");
  drawSquare(ctx, 1 * size, 4 * size, size, "orange");
  drawSquare(ctx, 4 * size, 7 * size, size, "yellow");
}
function drawSquare(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fRect(x, y, size, size);
  ctx.sRect(x, y, size, size);
}
context.sRect = function (x, y, w, h) {
  x = Math.floor(x) + 0.5;
  y = Math.floor(y) + 0.5;
  this.strokeRect(x, y, Math.floor(w), Math.floor(h));
};
context.fRect = function (x, y, w, h) {
  x = Math.floor(x);
  y = Math.floor(y);
  context.fillRect(x, y, Math.floor(w), Math.floor(h));
};
