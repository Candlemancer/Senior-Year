// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

MyGame.Model = (function(objects, graphics, input, particles) {
	// var paddle,
	// 	ball,
	// 	bricks,
	// 	paddlesRemaining = 3,
	// 	elapsedCountdown = 3000,
	// 	internalUpdate,
	// 	internalRender,
	// 	keyboard = input.Keyboard(),
	// 	textGameOver = {
	// 		font: '128px Arial, sans-serif',
	// 		fill: 'rgba(100, 0, 255, 1)',
	// 		stroke: 'rgba(0, 0, 0, 1)',
	// 		text: 'Game Over'
	// 	};

	var mouse = input.Mouse(),
		lastMouseCoords = {x:0, y:0},
		score,
		bombs,
		background = graphics.drawBackground({
			image: 'images/Background.png'
		}),
		explosionParticles;

	function storeLastClick(event) {		
		lastMouseCoords = {
			x: event.layerX,
			y: event.layerY
		}
	}

	//------------------------------------------------------------------
	//
	// Prepares a newly initialized game model, ready for the start of
	// the game.
	//
	//------------------------------------------------------------------
	function initialize() {
		// // Prepare the game over rendering position
		// var textWidth = graphics.measureTextWidth(textGameOver),
		// 	textHeight = graphics.measureTextHeight(textGameOver);
		// textGameOver.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		// paddlesRemaining = 3;
		// initializePaddleAndBall();
		explosionParticles = particles.initialize({
			imageSrc: 'images/Explosion.png'
		})

		// bricks = components.Bricks({
		// 	view: { width: 800, height: 600 }
		// });
		// console.log(objects);
		bombs = objects.Bombs();
		bombs.initializeLevelOne();
		// console.log('init bombs');


		score = {
			total: 0,
			position: {x: 10, y: 10 },
			font: '32px Arial, sans-serif',
			fill: 'rgba(0, 0, 0, 1)',
			text: ''
		};

		mouse.registerCommand('mousedown', storeLastClick);

		// //
		// // Start in the countdown state
		elapsedCountdown = 3000;
		internalUpdate = updateCountdown;
		internalRender = renderCountdown;
	}

	//------------------------------------------------------------------
	//
	// Draw how many paddles remain
	//
	//------------------------------------------------------------------
	function renderPaddlesRemaining() {
		// var item,
		// 	left = 800 - ((paddle.width + 10) * 3);

		// for (var item = 0; item < paddlesRemaining; item += 1) {
		// 	graphics.drawRectangle({
		// 		x: left,
		// 		y: components.Constants.PaddleOffset,
		// 		width: paddle.width,
		// 		height: components.Constants.PaddleHeight,
		// 		fill: 'rgba(0, 0, 255, 1)',
		// 		stroke: 'rgba(0, 0, 0, 1)'
		// 	});

		// 	left += (paddle.width + 10);
		// }
	}

	//------------------------------------------------------------------
	//
	// Draw the current score
	//
	//------------------------------------------------------------------
	function renderScore() {
		score.text = 'Score: ' + MyGame.Scoring.getScore();
		graphics.drawText(score);
	}

	//------------------------------------------------------------------
	//
	// Update the state of the game while in countdown
	//
	//------------------------------------------------------------------
	function updateCountdown(elapsedTime) {
		elapsedCountdown -= elapsedTime;
		// paddle.update(elapsedTime);
		// Keep the ball centered on the paddle
		// ball.centerX = paddle.center.x;

		// Once the countdown timer is down, switch to the playing state
		if (elapsedCountdown <= 0) {
			internalUpdate = updatePlaying;
			internalRender = renderPlaying;
		}
	}

	//------------------------------------------------------------------
	//
	// Render the state of the game while in countdown
	//
	//------------------------------------------------------------------
	function renderCountdown() {
		var number = Math.ceil(elapsedCountdown / 1000),
			countDown = {
				font: '128px Arial, sans-serif',
				fill: 'rgba(0, 0, 255, 1)',
				stroke: 'rgba(0, 0, 0, 1)',
				text: number.toString()
			},
			textWidth = graphics.measureTextWidth(countDown),
			textHeight = graphics.measureTextHeight(countDown);

		countDown.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		renderPlaying();
		// Draw the countdown numbers
		graphics.drawText(countDown);
	}

	//------------------------------------------------------------------
	//
	// Let the play know the game is over.
	//
	//------------------------------------------------------------------
	function renderGameOver() {
		renderPlaying();
		graphics.drawText(textGameOver);
	}

	//------------------------------------------------------------------
	//
	// Handle any keyboard input
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		mouse.update(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Perform an update on the ball.  Check if it fell through the bottom,
	// and start a new one or game over based upon that change.
	//
	//------------------------------------------------------------------
	function updateBall(elapsedTime) {
		// if (ball.update(elapsedTime)) {
		// 	// This means the ball fell through the bottom, reduce number
		// 	// of paddles remaining, reposition the paddle & ball and change states.
		// 	paddlesRemaining -= 1;
		// 	elapsedCountdown = 3000;
		// 	initializePaddleAndBall();
		// 	if (paddlesRemaining === 0) {
		// 		// Update the high scores
		// 		MyGame.HighScores.add(score.total);
		// 		internalUpdate = function() {};
		// 		internalRender = renderGameOver;
		// 	} else {
		// 		internalUpdate = updateCountdown;
		// 		internalRender = renderCountdown;
		// 	}
		// }
	}

	//------------------------------------------------------------------
	//
	// Update the state of the game while playing
	//
	//------------------------------------------------------------------
	function updatePlaying(elapsedTime) {
		bombs.checkCollisions(lastMouseCoords);
		lastMouseCoords = {x: 0, y: 0};

		var levelCompleted = bombs.update(elapsedTime);
		if (levelCompleted == 1) {
			bombs.initializelevelTwo();
			internalUpdate = updateCountdown;
			internalRender = renderCountdown;
		}
		else if (levelCompleted == 2) {
			bombs.initializeLevelThree();
			internalUpdate = updateCountdown;
			internalRender = renderCountdown;
		}
		else if (levelCompleted == 3) {
			bombs.initializeLevelFour();
			internalUpdate = updateCountdown;
			internalRender = renderCountdown;
		}
		else if (levelCompleted == 4) {
			bombs.initializeLevelFive();
			internalUpdate = updateCountdown;
			internalRender = renderCountdown;
		}
		else if (levelCompleted == 5) {
			internalUpdate = function() {};
			internalRender = function() {};
			MyGame.HighScores.add(MyGame.Scoring.getScore());
			MyGame.Screens.showScreen('page-highscores');
			console.log('winner!');
		}

		particles.update(elapsedTime);
		// var bricksHit = [],
		// 	brick;

		// paddle.update(elapsedTime);
		// updateBall(elapsedTime);
		// bricks.update(elapsedTime);

		// // Check to see if the ball and paddle collided with each other
		// if (paddle.intersectBall(ball)) {
		// 	ball.reflectY();
		// }
		// // Check to see if we have a brick-ball collision
		// bricksHit = bricks.intersectBall(ball);
		// if (bricksHit.length > 0) {
		// 	ball.reflectY();

		// 	// Update score based upon the bricks hit
		// 	for (brick = 0; brick < bricksHit.length; brick += 1) {
		// 		score.total += bricksHit[brick].score;
		// 	}
		// }
	}

	//------------------------------------------------------------------
	//
	// Render the state of the game while playing
	//
	//------------------------------------------------------------------
	function renderPlaying() {
		graphics.clear();
		background.draw();	
		bombs.render(graphics);
		particles.render();
		// bricks.render(graphics);
		// paddle.render(graphics);
		// ball.render(graphics);
		// renderPaddlesRemaining();
		renderScore();
	}

	//------------------------------------------------------------------
	//
	// Update the state of the game model based upon the passage of time.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		internalUpdate(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Render the current state of the game model.
	//
	//------------------------------------------------------------------
	function render() {
		internalRender();
	}

	return {
		initialize: initialize,
		processInput: processInput,
		update: update,
		render: render
	};
}(MyGame.Objects, MyGame.Graphics, MyGame.Input, MyGame.Particles));
