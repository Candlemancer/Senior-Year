// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

TowerDefense.pages['page-highscores'] = (function(screens) {

	function initialize() {
		document.getElementById('id-high-scores-back').addEventListener(
			'click',
			function() {
				screens.showScreen('page-mainmenu');
			});
	}

	function displayScores() {
		var highscores,
			highScoresHTML = document.getElementById('high-scores-list');
			msg = new XMLHttpRequest();

		msg.onreadystatechange = function() {
			if (msg.readyState == 4 && msg.status == 200) {
				highScores = JSON.parse(msg.responseText);
				highScoresHTML.innerHTML = '';
				for (var i = 0; i < 5; ++i) {
					highScoresHTML.innerHTML += (i + 1) + '. ' + highScores[i].name + 
														  ': ' + highScores[i].score;
					highScoresHTML.innerHTML += '<br>';
				}
			}

		}
		msg.open('GET', '/v1/highScores', true);
		msg.send();
	}

	function run() {
		displayScores();
	}

	return {
		initialize: initialize,
		run: run
	};
}(TowerDefense.Screens));
