// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

TowerDefense.pages['page-game-over'] = (function(screens, scores, ui) {

	function initialize() {
		document.getElementById('id-game-over-back').addEventListener(
			'click',
			function() {
				screens.showScreen('page-mainmenu');
			});
	}

	function run() {
		var msg = new XMLHttpRequest();

		msg.open('POST', '/v1/highScores?name=' + ui.getPlayerName() + 
				 '&score=' + scores.getScore(), true);
		msg.send();

		document.getElementById('gameOverHighScore').innerHTML = scores.getScore();
	}

	return {
		initialize: initialize,
		run: run
	};
}(TowerDefense.Screens, TowerDefense.Scoring, TowerDefense.UIController));
