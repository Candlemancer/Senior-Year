// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

MyGame.Objects = (function() {

	var Constants = {
		levelOneTimes: 	[3, 3, 2, 2, 1, 1],
		levelTwoTimes: 	[4, 3, 2, 3, 3, 2, 2, 1, 1],
		levelThreeTimes:[5, 4, 3, 4, 3, 2, 3, 3, 2, 2, 1, 1],
		levelFourTimes: [6, 5, 4, 5, 4, 3, 4, 3, 2, 3, 3, 2, 2, 1, 1],
		levelFiveTimes: [7, 6, 5, 6, 5, 4, 5, 4, 3, 4, 3, 2, 3, 3, 2, 2, 1, 1]
	}

	function Bomb(spec) {
		var that = {};
			that.image = MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/Bomb.png'
			}),
			that.explodedImg = MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/Explosion.png'
			}),
			that.defusedImg = MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/checkmark.png'
			});
			that.counterImgs = [];
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_0.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_1.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_2.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_3.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_4.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_5.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_6.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_7.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_8.png'
			}));
			that.counterImgs.push( MyGame.Graphics.drawImage({
				center: {x: spec.x, y: spec.y},
				rotation: 0,
				width: 64,
				height: 64,
				image: 'images/glass_numbers_9.png'
			}));

		var timeMultiplier = 10000;

		that.alive = true;
		that.defused = false;
		that.timeRemaining = spec.time * timeMultiplier;

		that.render = function(graphics) {
			that.image.draw();
			if (that.defused === true && that.alive === false) {
				that.defusedImg.draw();
			}
			else if (that.defused === false && that.alive === false) {
				that.explodedImg.draw();
			}
			else {
				
				that.counterImgs[that.updateCounter()].draw();
			}
			
		}

		that.update = function(elapsedTime) {
			that.timeRemaining -= elapsedTime;
			if (that.timeRemaining < 0) {
				that.explode();
			}
			if (that.defused === true && that.alive === false) {
				return 1;
			}

			return 0;
		}

		that.updateCounter = function() {
			if (that.alive === true) {
				var seconds = Math.floor(that.timeRemaining / timeMultiplier);
				if (seconds < 0) seconds = 0;
				if (seconds > 9) seconds = 9;
				// console.log(seconds);
				return seconds;
			}
		}

		that.defuse = function() {
			if (that.alive === true) {
				that.alive = false;
				that.defused = true;
				MyGame.Scoring.addPoints(Math.floor(that.timeRemaining / timeMultiplier));
			}
		}

		that.explode = function() {
			if (that.alive === true) {
				that.alive = false;
				that.defused = false;
				for (var i = 0; i < 50; ++i) {
					MyGame.Particles.createExplosionParticle({
						center: {x: spec.x, y: spec.y},
						speed: {mean: 60, stdev: 10},
						lifetime: {mean: 0.5, stdev: 0.2}
					});
				}
			}
		}

		that.checkCollision = function(coords) {
			if (coords.x > spec.x - (64 / 2) && coords.x < spec.x + (64 / 2) &&
				coords.y > spec.y - (64 / 2) && coords.y < spec.y + (64 / 2)) {
				that.defuse();
			}
		}

		return that;
	}


	function Bombs(spec) {
		var that = {},
			bombs = [],
			level = 0;

		that.initializeLevelOne = function() {
			MyGame.Graphics.clear();
			var times = shuffle(Constants.levelOneTimes);

			bombs.push(Bomb({x: 200, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 200, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 400, time:times.pop()}));

			level = 1;
		}

		that.initializelevelTwo = function() {
			MyGame.Graphics.clear();
			var times = shuffle(Constants.levelTwoTimes);

			bombs.push(Bomb({x: 200, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 200, time:times.pop()}));

			bombs.push(Bomb({x: 200, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 200, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 400, time:times.pop()}));

			level = 2;
		}

		that.initializeLevelThree = function() {
			MyGame.Graphics.clear();
			var times = shuffle(Constants.levelThreeTimes);

			bombs.push(Bomb({x: 200, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 500, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 200, time:times.pop()}));

			bombs.push(Bomb({x: 200, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 200, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 400, time:times.pop()}));

			level = 3;
		}

		that.initializeLevelFour = function() {
			MyGame.Graphics.clear();
			var times = shuffle(Constants.levelFourTimes);

			bombs.push(Bomb({x: 200, y: 100, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 100, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 100, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 500, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 200, time:times.pop()}));

			bombs.push(Bomb({x: 200, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 200, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 400, time:times.pop()}));

			level = 4;
		}

		that.initializeLevelFive = function() {
			MyGame.Graphics.clear();
			var times = shuffle(Constants.levelFiveTimes);

			bombs.push(Bomb({x: 200, y: 600, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 600, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 600, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 100, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 100, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 100, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 500, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 500, time:times.pop()}));			

			bombs.push(Bomb({x: 200, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 200, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 200, time:times.pop()}));

			bombs.push(Bomb({x: 200, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 300, time:times.pop()}));
			bombs.push(Bomb({x: 200, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 300, y: 400, time:times.pop()}));
			bombs.push(Bomb({x: 400, y: 400, time:times.pop()}));

			level = 5;
		}

		that.render = function(graphics) {
			for (var i = bombs.length - 1; i >= 0; i--) {
				bombs[i].render(graphics);
			}
		}

		that.update = function(elapsedTime) {
			var numDefused = 0;

			for (var i = bombs.length - 1; i >= 0; i--) {
				numDefused += bombs[i].update(elapsedTime);
			}

			if (numDefused >= level * 3 + 3) {
				bombs = [];
				return level;
			}

			return 0;
		}

		that.checkCollisions = function(coords) {
			for (var i = bombs.length - 1; i >= 0; i--) {
				bombs[i].checkCollision(coords);
			}
		}

		return that;
	}

	return {
		Constants: Constants,
		Bombs: Bombs
	}
}());



	// // Constants, as best as we can do them in JavaScript
	// var Constants = {
	// 	get PaddleHeight() { return 15; },
	// 	get PaddleOffset() { return 5; },
	// 	get PaddleWidthPercent() { return 10; },
	// 	get BallSize() { return 15; },
	// 	get BricksOffset() { return 50; },
	// 	get BrickRows() { return 8; },
	// 	get BricksPerRow() { return  14; },
	// 	get BrickHeight() { return 15; },
	// 	get BrickWidthPercent() { return 7; }
	// };

	// //------------------------------------------------------------------
	// // Tests to see if two rectangles intersect.  If they do, true is returned, false otherwise.
	// // Adapted from: 
	// // http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
	// //------------------------------------------------------------------
	// function intersectRectangles(r1, r2) {
	// 	return !(
	// 		r2.left > r1.right ||
	// 		r2.right < r1.left ||
	// 		r2.top > r1.bottom ||
	// 		r2.bottom < r1.top
	// 	);
	// }

	// // ------------------------------------------------------------------
	// //
	// // This represents the model for the game paddle.  It knows how to
	// // move and draw itself upon request.
	// //
	// // 'spec' must include:
	// //		color: rgba
	// //		view: {width, height}
	// //		moveRate: number // pixels per millisecond
	// //
	// // ------------------------------------------------------------------
	// function Paddle(spec) {
	// 	var that;

	// 	//
	// 	// Prepare the initial properties of the paddle
	// 	spec.fullSize = true;
	// 	spec.center =  {
	// 		x: spec.view.width / 2,
	// 		y: spec.view.height -(Constants.PaddleOffset + Constants.PaddleHeight / 2)
	// 	};
	// 	spec.width = spec.view.width * (Constants.PaddleWidthPercent / 100);

	// 	//
	// 	// Had to wait to define that until we had the spec fully initialized
	// 	that = {
	// 		get left() { return spec.center.x - spec.width / 2 },
	// 		get right() { return spec.center.x + spec.width / 2 },
	// 		get top() { return spec.center.y - Constants.PaddleHeight / 2 },
	// 		get bottom() { return spec.center.y + Constants.PaddleHeight / 2 },
	// 		get center() { return spec.center },
	// 		get width() { return spec.width }
	// 	};

	// 	that.moveRight = function(elapsedTime) {
	// 		spec.center.x += spec.moveRate * elapsedTime;
	// 		//
	// 		// Don't let it go past the left edge of the screen
	// 		if (spec.center.x > (spec.view.width - spec.width / 2)) {
	// 			spec.center.x = spec.view.width - spec.width / 2;
	// 		}
	// 	}

	// 	that.moveLeft = function(elapsedTime) {
	// 		spec.center.x -= spec.moveRate * elapsedTime;
	// 		//
	// 		// Don't let it go past the left edge of the screen
	// 		if (spec.center.x < spec.width / 2) {
	// 			spec.center.x = spec.width / 2;
	// 		}
	// 	}

	// 	that.intersectBall = function(ball) {
	// 		var intersect = false;
	// 		if (!ball.collided && intersectRectangles(that, ball)) {
	// 			intersect = true;
	// 		}

	// 		ball.collided = intersect;

	// 		return intersect;
	// 	}

	// 	that.update = function(elapsedTime) {
	// 		//
	// 		// Nothing to do for now, maybe later
	// 	}

	// 	that.render = function(graphics) {
	// 		graphics.drawRectangle({
	// 			x: spec.center.x - spec.width / 2,
	// 			y: spec.center.y - Constants.PaddleHeight / 2,
	// 			width: spec.width,
	// 			height: Constants.PaddleHeight,
	// 			fill: spec.color,
	// 			stroke: 'rgba(0, 0, 0, 1)'
	// 		});
	// 	}

	// 	return that;
	// }

	// // ------------------------------------------------------------------
	// //
	// // This represents the model for a game ball.  It knows how to
	// // move and draw itself upon request.
	// //
	// // 'spec' must include:
	// //		color: rgba
	// //		view: {width, height}
	// //		direction: { x, y }
	// //		moveRate: number // pixels per millisecond
	// //
	// // ------------------------------------------------------------------
	// function Ball(spec) {
	// 	var collided = false,
	// 		that = {
	// 			get left() { return spec.center.x - Constants.BallSize / 2 },
	// 			get right() { return spec.center.x + Constants.BallSize / 2 },
	// 			get top() { return spec.center.y - Constants.BallSize / 2 },
	// 			get bottom() { return spec.center.y + Constants.BallSize / 2 },
	// 			get collided() { return collided },
	// 			set collided(value) { collided = value; },
	// 			set centerX(value) { spec.center.x = value; }
	// 		};

	// 	//
	// 	// Prepare the initial properties of the ball
	// 	spec.center = {
	// 		x: spec.view.width / 2,
	// 		y: spec.view.height - (Constants.PaddleOffset + Constants.PaddleHeight + Constants.BallSize)
	// 	};

	// 	that.reflectY = function() {
	// 		spec.direction.y *= -1;
	// 	};

	// 	that.update = function(elapsedTime) {
	// 		var missed = false;
	// 		spec.center.x += (spec.direction.x * spec.moveRate * elapsedTime);
	// 		spec.center.y += (spec.direction.y * spec.moveRate * elapsedTime);
	// 		//
	// 		// If we hit an arena boundary, change the ball direction accordingly
	// 		if (that.right > spec.view.width) {
	// 			spec.direction.x *= -1;
	// 		}
	// 		if (that.left < 0) {
	// 			spec.direction.x *= -1;
	// 		}
	// 		if (that.top < 0) {
	// 			spec.direction.y *= -1;
	// 		}
	// 		if (that.bottom > spec.view.height) {
	// 			// spec.direction.y *= -1;
	// 			//
	// 			// Indicate the ball fell through the bottom
	// 			missed = true;
	// 		}

	// 		return missed;
	// 	}

	// 	that.render = function(graphics) {
	// 		graphics.drawRectangle({
	// 			x: spec.center.x - Constants.BallSize / 2,
	// 			y: spec.center.y - Constants.BallSize / 2,
	// 			width: Constants.BallSize,
	// 			height: Constants.BallSize,
	// 			fill: spec.color,
	// 			stroke: 'rgba(0, 0, 0, 1)'
	// 		});
	// 	};

	// 	return that;
	// }

	// // ------------------------------------------------------------------
	// //
	// // This represents the model for a single brick.  It knows how to draw
	// // itself upon request.
	// //
	// // 'spec' must include:
	// //		color: rgba
	// //		position: { left, top }
	// //		score: number
	// //		view: { width, height }
	// //
	// // ------------------------------------------------------------------
	// function Brick(spec) {
	// 	var alive = true,
	// 		brickWidth = Math.trunc((Constants.BrickWidthPercent / 100) * spec.view.width),
	// 		that = {
	// 			get left() { return spec.position.left },
	// 			get right() { return spec.position.left + brickWidth },
	// 			get top() { return spec.position.top },
	// 			get bottom() { return spec.position.top + Constants.BrickHeight },
	// 			get alive() { return alive },
	// 			get score() { return spec.score }
	// 		};

	// 	that.intersectBall = function(ball) {
	// 		var intersect = false;
	// 		if (alive) {
	// 			if (!ball.collided && intersectRectangles(that, ball)) {
	// 				alive = false;
	// 				intersect = true;
	// 			}
	// 		}

	// 		ball.collided = intersect;

	// 		return intersect;
	// 	}

	// 	that.update = function() {
	// 		//
	// 		// Bricks don't have any updates to do...at least not yet
	// 	};

	// 	that.render = function(graphics) {
	// 		if (alive) {
	// 			graphics.drawRectangle({
	// 				x: that.left,
	// 				y: that.top,
	// 				width: brickWidth,
	// 				height: Constants.BrickHeight,
	// 				fill: spec.color,
	// 				stroke: 'rgba(0, 0, 0, 1)'
	// 			});
	// 		}
	// 	};

	// 	return that;
	// }

	// // ------------------------------------------------------------------
	// //
	// // This creates the set of all bricks model.
	// //		view: { width, height }
	// //
	// // ------------------------------------------------------------------
	// function Bricks(spec) {
	// 	var that = {},
	// 		bricks = [],
	// 		top = Constants.BricksOffset + Constants.BrickRows * Constants.BrickHeight;

	// 	// ------------------------------------------------------------------
	// 	//
	// 	// Utility function to create a single row of bricks
	// 	//
	// 	// ------------------------------------------------------------------
	// 	function createRow(rowTop, score, color) {
	// 		var leftover = spec.view.width - Constants.BricksPerRow * 
	// 					   Math.trunc((Constants.BrickWidthPercent / 100) * spec.view.width),
	// 			left = leftover / 2,
	// 			brick = 0,
	// 			brickRow = bricks.length;

	// 		bricks.push([]);
	// 		for (brick = 0; brick < Constants.BricksPerRow; brick += 1) {
	// 			bricks[brickRow].push(Brick({
	// 				color: color,
	// 				position: {left: left, top: rowTop},
	// 				score: score,
	// 				view: spec.view
	// 			}));
	// 			left = bricks[brickRow][bricks[brickRow].length - 1].right;
	// 		}
	// 	}

	// 	// ------------------------------------------------------------------
	// 	//
	// 	// Checks to see which, if any, bricks were hit by the ball.  Those
	// 	// bricks hit by the ball are returned by the function.
	// 	//
	// 	// ------------------------------------------------------------------
	// 	that.intersectBall = function(ball) {
	// 		var row,
	// 			brick,
	// 			thoseHit = [],
	// 			intersectAll,
	// 			intersectRow;

	// 		// Step 1: See if we can reject all of the bricks first
	// 		intersectAll = intersectRectangles(ball, {
	// 			left: bricks[0][0].left,
	// 			right: bricks[0][bricks[0].length - 1].right,
	// 			top: bricks[bricks.length - 1][0].top,
	// 			bottom: bricks[0][0].bottom });

	// 		if (intersectAll) {
	// 			for (row = 0; row < bricks.length; row += 1) {
	// 				intersectRow = intersectRectangles(ball, {
	// 					left: bricks[row][0].left,
	// 					right: bricks[row][bricks[row].length - 1].right,
	// 					top: bricks[row][0].top,
	// 					bottom: bricks[row][0].bottom });

	// 				// Step 2: See if we can reject this row
	// 				if (intersectRow) {
	// 					for (brick = 0; brick < bricks[row].length; brick += 1) {
	// 						if (bricks[row][brick].intersectBall(ball)) {
	// 							thoseHit.push(bricks[row][brick]);
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}

	// 		return thoseHit;
	// 	}

	// 	that.update = function(elapsedTime) {
	// 		// Nothing to do yet
	// 	}

	// 	that.render = function(graphics) {
	// 		var row,
	// 			brick;

	// 		for (row = 0; row < bricks.length; row += 1) {
	// 			for (brick = 0; brick < bricks[row].length; brick += 1) {
	// 				bricks[row][brick].render(graphics);
	// 			}
	// 		}
	// 	}

	// 	// Create the eight rows of bricks: yellow, orange, blue, and green
	// 	createRow(top, 1, 'rgba(255, 255, 0, 1)');
	// 	createRow(bricks[0][0].top - Constants.BrickHeight, 1, 'rgba(255, 255, 0, 1)');
	// 	createRow(bricks[1][0].top - Constants.BrickHeight, 2, 'rgba(255, 165, 0, 1)');
	// 	createRow(bricks[2][0].top - Constants.BrickHeight, 2, 'rgba(255, 165, 0, 1)');
	// 	createRow(bricks[3][0].top - Constants.BrickHeight, 3, 'rgba(0, 0, 255, 1)');
	// 	createRow(bricks[4][0].top - Constants.BrickHeight, 3, 'rgba(0, 0, 255, 1)');
	// 	createRow(bricks[5][0].top - Constants.BrickHeight, 5, 'rgba(0, 255, 0, 1)');
	// 	createRow(bricks[6][0].top - Constants.BrickHeight, 5, 'rgba(0, 255, 0, 1)');

	// 	return that;
	// }

	// return {
	// 	Constants: Constants,
	// 	Paddle: Paddle,
	// 	Ball: Ball,
	// 	Brick: Brick,
	// 	Bricks: Bricks
	// };
