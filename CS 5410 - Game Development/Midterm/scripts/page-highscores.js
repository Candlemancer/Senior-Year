// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

MyGame.pages['page-highscores'] = (function(screens) {

	function initialize() {
		document.getElementById('id-high-scores-back').addEventListener(
			'click',
			function() {
				screens.showScreen('page-mainmenu'); 
			});
	}

	function displayScores() {
		var highScores = MyGame.HighScores.get(),
			highScoresHTML = document.getElementById('high-scores-list');

		// Clear whatever was already in the display
		highScoresHTML.innerHTML = '';
		// Grab the previously saved high scores and get them displayed
		highScores.forEach(function (score) {
			highScoresHTML.innerHTML += (score + '<br/>');
		});
	}

	function run() {
		displayScores();
	}

	return {
		initialize : initialize,
		run : run
	};
}(MyGame.Screens));
