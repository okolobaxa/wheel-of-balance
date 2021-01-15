# Wheel of balance

<img src="https://raw.githubusercontent.com/okolobaxa/wheel-of-balance/master/img/wheel-of-balance.jpg" align="right" alt="Demo" width="300" height="300">

A small lib for drawing [wheel of balance](https://medium.com/thrive-global/how-does-one-become-centered-and-balanced-bb28627a4461). Demo https://trusting-dijkstra-93d87f.netlify.app/

## Usage

```js
var config = {};

config.segments = [
    { color: "#97CC64", text: "Section 1", level: 5 },
    { color: "#4569BC", text: "Section 2" }, // level is optional, 0 by default
    { color: "#2A8341", text: "Section 3" },
    { color: "#F68D38", text: "Section 4" },
    { color: "#EA527F", text: "Section 5" },
    { color: "#77B6E7", text: "Section 6" },
    { color: "#FFD963", text: "Section 7" },
    { color: "#A955B8", text: "Section 8" }
];

config.radius = 200; // optional. Default calculated based in canvas size
config.levels = 10; // optional. Default 10
config.fontSize = 15; // optional. Default 15px

let canvas = document.getElementById("canvas");

const wheel = new Wheel(canvas, config);
wheel.draw();

const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', function (e) {
    wheel.clear();
});

const downloadButton = document.getElementById("download");
downloadButton.addEventListener('click', function (e) {
    wheel.download();
});
```


<a href="https://pspr.to/?utm_source=wheel-of-balance">
  <img src="https://static.tildacdn.com/tild3334-6466-4734-b431-373632616332/logo_transparent.png"
       alt="Sponsored by Psprto" width="100" height="100">
</a>
