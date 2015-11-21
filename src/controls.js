//REQUIRE SOMETHING TO CONTROL THE PLAYER

module.exports = {
	useKeyBoardControls: function() {
		var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

	    //Left arrow key `press` method
	    left.press = function() {
    	    dot.vx = -5;
	    };

	    //Left arrow key `release` method
	    left.release = function() {
	  	    if(!right.isDown)
	  			dot.vx = 0;
	  		else
	  			dot.vx = 5;
	  	};

	  	//Up
	  	up.press = function() {
	    	dot.vy = -5;
	  	};
	  	up.release = function() {
	    	if(!down.isDown)
	    		dot.vy = 0;
	    	else 
	    		dot.vy = 5;
	  	};

	  	//Right
	  	right.press = function() {
	    	dot.vx = 5;
	  	};
	  	right.release = function() {
	    	if(!left.isDown)
	    		dot.vx = 0;
	    	else
	    		dot.vx = -5;
	  	};

	  	//Down
	  	down.press = function() {
	   		dot.vy = 5;
	  	};
	  	down.release = function() {
	    	if(!up.isDown)
	    		dot.vy = 0;
	    	else
	    		dot.vy = -5;
	  	};
	},
	useMyoControls: function() {
		//Could add support for myo conrols at a later time
	}
}

function keyboard(keyCode) {
  	var key = {};
  	key.code = keyCode;
  	key.isDown = false;
  	key.isUp = true;
  	key.press = undefined;
  	key.release = undefined;
  	//The `downHandler`
  	key.downHandler = function(event) {
    	if (event.keyCode === key.code) {
      		if (key.isUp && key.press) key.press();
      		key.isDown = true;
      		key.isUp = false;
    	}
    	event.preventDefault();
	};

  	//The `upHandler`
  	key.upHandler = function(event) {
   	 	if (event.keyCode === key.code) {
      		if (key.isDown && key.release) key.release();
      		key.isDown = false;
      		key.isUp = true;
    	}
    	event.preventDefault();
  	};

  	//Attach event listeners
  	window.addEventListener(
    	"keydown", key.downHandler.bind(key), false
  	);
  	window.addEventListener(
    	"keyup", key.upHandler.bind(key), false
  	);
  	return key;
}