var PIXI = require("pixi.js");

var stage;

module.exports = {
	initCanvas: function() {
		var renderer = PIXI.autoDetectRenderer(250, 250);
		renderer.view.style.position = "absolute"
		renderer.view.style.display = "block";
		renderer.autoResize = true;
		renderer.resize(window.innerWidth, window.innerHeight);
		width = renderer.view.width;
		height = renderer.view.height;
		
		document.body.appendChild(renderer.view);
		stage = new PIXI.Container();
		renderer.render(stage);
	}
	drawPlayer: function(x, y) {
		var randColor = generateColor();
		var dot = new PIXI.Graphics();
	    dot.beginFill(randColor);
	    dot.drawCircle(0, 0, 15);
	    dot.endFill();
	    //TODO random starting position
	    dot.x = x;
	    dot.y = y;
	    dot.vx = 0;
  	    dot.vy = 0;
  	    dot.hitArea = new PIXI.Circle(dot.x, dot.y, 15);
	    stage.addChild(dot);

	    return dot;
	}
}

function generateColor() {
	var red = Math.random() * (256 - 0) + 0;
	var green = Math.random() * (256 - 0) + 0;
	var blue = Math.random() * (256 - 0) + 0;
	var rgb = [red, green, blue];

	PIXI.utils.rgb2hex(rbg);
}