// Jonathan Petersen
// A01236750

TowerDefense.Graphics = (function() {
	'use strict';

	var canvas = document.getElementById('game-canvas'),
		context = canvas.getContext('2d');

	var clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	var rectangleFactory = function(spec) {

		var position = {
				x: spec.x,
				y: spec.y
			},
			dimensions = {
				width: spec.width,
				height: spec.height
			};

		var draw = function() {
			var oldStyle = context.fillStyle;
			context.fillStyle = spec.style || '#FEFEFE';
			context.fillRect(position.x - dimensions.width / 2,
				position.y - dimensions.height / 2,
				dimensions.width, dimensions.height);
			context.fillStyle = oldStyle;
		}

		var moveTo = function(pos) {
			position.x = pos.x;
			position.y = pos.y;
		}

		var changeWidth = function(w) {
			dimensions.width = w;
		}

		return {
			draw: draw,
			moveTo: moveTo,
			changeWidth: changeWidth
		}
	}

	var circleFactory = function(spec) {

		var position = {
				x: spec.x,
				y: spec.y
			},
			radius = spec.radius;

		var draw = function() {
			context.beginPath();
			context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
			context.closePath();
			context.strokeStyle = '#FEFEFE';
			context.stroke();
		}

		var moveTo = function(pos) {
			position.x = pos.x;
			position.y = pos.y;
		}

		var setRadius = function(r) {
			radius = r;
		}

		return {
			draw: draw,
			moveTo: moveTo,
			setRadius: setRadius
		}
	}

	function textFactory(spec) {

		var pos = spec.pos,
			width = spec.width,
			height = spec.height,
			rotation = spec.rotation;

		var draw = function() {
			context.save();

			context.font = spec.font,
				context.fillStyle = spec.fill;
			if (spec.hasOwnProperty('stroke')) {
				context.strokeStyle = spec.stroke;
			}
			context.textBaseline = 'top';

			context.fillText(spec.text, pos.x, pos.y);
			context.strokeText(spec.text, pos.x, pos.y);

			context.restore();
		}

		var moveTo = function(p) {
			pos.x = p.x,
				pos.y = p.y
		}

		var setWidth = function(w) {
			width = w;
		}

		var setHeight = function(h) {
			height = h;
		}

		var setRotation = function(r) {
			rotation = r;
		}

		return {
			draw: draw,
			moveTo: moveTo,
			setWidth: setWidth,
			setHeight: setHeight,
			setRotation: setRotation
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////
	// Parameters
	//  pos 		- (x, y) center coordinates of the sprite
	//  rotation 	- Radians to rotate from 0
	// 	width 		- width of a single sprite in pixels
	//  height 		- height of a single sprite in pixels
	//  spriteCount - number of sprites in the image
	//  spriteSheet - source of the spritesheet
	//  spriteTime  - [] of times in ms for each sprite to show
	////////////////////////////////////////////////////////////////////////////////////////////////
	function spriteFactory(spec) {
		var that = {},
			image = new Image();

		// Initialize the animation of the spritesheet
		spec.sprite = 0; // Which sprite to start with
		spec.elapsedTime = 0; // How much time has occured in the animation

		// Load the image, set the ready flag once it is loaded so that
		// rendering can begin.
		image.onload = function() {
			// Our clever trick, replace the draw function once the image is loaded...no if statements!
			that.draw = function() {
				context.save();

				context.translate(spec.pos.x, spec.pos.y);
				context.rotate(spec.rotation);
				context.translate(-spec.pos.x, -spec.pos.y);

				// Pick the selected sprite from the sprite sheet to render
				context.drawImage(
					image,
					spec.width * spec.sprite, 0, // Which sprite to pick out
					spec.width, spec.height, // The size of the sprite
					spec.pos.x - spec.width / 2, // Where to draw the sprite
					spec.pos.y - spec.height / 2,
					spec.width, spec.height);

				context.restore();
			};
			// Once the image is loaded, we can compute the height and width based upon
			// what we know of the image and the number of sprites in the sheet.
			spec.height = image.height;
			spec.width = image.width / spec.spriteCount;
		};
		image.src = spec.spriteSheet;

		//------------------------------------------------------------------
		//
		// Update the animation of the sprite based upon elapsed time.
		//
		//------------------------------------------------------------------
		that.update = function(elapsedTime, forward) {
			spec.elapsedTime += elapsedTime;
			// Check to see if we should update the animation frame
			if (spec.elapsedTime >= spec.spriteTime[spec.sprite]) {
				// When switching sprites, keep the leftover time because
				// it needs to be accounted for the next sprite animation frame.
				spec.elapsedTime -= spec.spriteTime[spec.sprite];
				// Depending upon the direction of the animation...
				if (forward === true) {
					spec.sprite += 1;
					// This provides wrap around from the last back to the first sprite
					spec.sprite = spec.sprite % spec.spriteCount;
				} else {
					spec.sprite -= 1;
					// This provides wrap around from the first to the last sprite
					if (spec.sprite < 0) {
						spec.sprite = spec.spriteCount - 1;
					}
				}
			}
		};

		//------------------------------------------------------------------
		//
		// Render the correct sprint from the sprite sheet
		//
		//------------------------------------------------------------------
		that.draw = function() {
			// Starts out empty, but gets replaced once the image is loaded!
		};

		return that;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////
	// particleImageFactory: Draw an image to the canvas.
	// Parameters:
	//  img.src  	- path to the image source
	//  pos 		- center coords to draw the image
	//  rotation 	- amount to rotate the image
	//  width 		- width of the image
	//  height 		- height of the image
	////////////////////////////////////////////////////////////////////////////////////////////////
	var particleImageFactory = function(spec) {
		var img = new Image(),
			pos = spec.pos,
			width = spec.width,
			height = spec.height,
			rotation = spec.rotation;

		img.src = spec.src;

		// Note, this funciton has no check if the image has loaded. For particles,
		// we don't really care that much.
		var draw = function() {

			context.save();

			context.translate(pos.x, pos.y);
			context.rotate(rotation);
			context.translate(-pos.x, -pos.y);

			context.drawImage(
				img,
				pos.x - width / 2,
				pos.y - height / 2,
				width,
				height
			);
			context.restore();
		}

		var moveTo = function(position) {
			pos = {
				x: position.x,
				y: position.y
			};
		}

		var setWidth = function(w) {
			width = w;
		}

		var setHeight = function(h) {
			height = h;
		}

		var setRotation = function(r) {
			rotation = r;
		}

		that = {
			draw: draw,
			moveTo: moveTo,
			setWidth: setWidth,
			setHeight: setHeight,
			setRotation: setRotation
		}
		return that;
	}

	return {
		clear: clear,
		textFactory: textFactory,
		circleFactory: circleFactory,
		spriteFactory: spriteFactory,
		rectangleFactory: rectangleFactory,
		particleImageFactory: particleImageFactory
	}
}());
