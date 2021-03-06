// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

MyGame.pages['page-game'] = (function(gameModel, screens, graphics, input) {
	var keyboard = input.Keyboard(),
		cancelNextRequest = false,
		lastTimeStamp = performance.now();

	function initialize() {
		console.log('Initializing Game ...');

		keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			// Then, return to the main menu
			screens.showScreen('page-mainmenu');
		});
	}

	//------------------------------------------------------------------
	//
	// Input is procesed here.
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		keyboard.update(elapsedTime);
		gameModel.processInput(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// The game model is updated here.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		gameModel.update(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// The game model is rendered here.
	//
	//------------------------------------------------------------------
	function render() {
		graphics.clear();
		gameModel.render();
	}

	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {
		var elapsedTime = time - lastTimeStamp;

		processInput(elapsedTime);
		update(elapsedTime);
		lastTimeStamp = time;

		render();

		// Cancel the next animation if the user has pressed the ESC key, returning them
		// to the main menu.
		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}

	function run() {
		gameModel.initialize();
		lastTimeStamp = performance.now();
		// Start the animation loop
		cancelNextRequest = false;
		requestAnimationFrame(gameLoop);
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.Model, MyGame.Screens, MyGame.Graphics, MyGame.Input));
