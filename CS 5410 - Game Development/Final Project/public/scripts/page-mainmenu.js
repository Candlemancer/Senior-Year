// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

TowerDefense.pages['page-mainmenu'] = (function(screens) {

	function initialize() {
		// Setup each of menu events for the screens
		document.getElementById('id-new-game').addEventListener(
			'click',
			function() {screens.showScreen('page-game'); });

		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() { screens.showScreen('page-highscores'); });

		document.getElementById('id-help').addEventListener(
			'click',
			function() { screens.showScreen('page-options'); });

		document.getElementById('id-about').addEventListener(
			'click',
			function() { screens.showScreen('page-about'); });
	}

	function run() {
		document.getElementById('backgroundMusic').pause();
	}

	return {
		initialize : initialize,
		run : run
	};
}(TowerDefense.Screens));
