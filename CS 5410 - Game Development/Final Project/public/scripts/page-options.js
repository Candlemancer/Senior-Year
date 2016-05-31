// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

TowerDefense.pages['page-options'] = (function(screens) {

	function initialize() {
		document.getElementById('id-help-back').addEventListener(
			'click',
			function() { screens.showScreen('page-mainmenu'); });
	}

	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}

	return {
		initialize : initialize,
		run : run
	};
}(TowerDefense.Screens));
