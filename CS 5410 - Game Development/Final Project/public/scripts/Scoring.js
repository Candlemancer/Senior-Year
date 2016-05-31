// Jonathan Petersen
// A01236750

TowerDefense.Scoring = (function() {
	var score,
		lives,
		credits;

	var init = function() {
		score = 0;
		lives = 20;
		credits = 3000;
	}

	var getScore = function() {
		return score;
	}

	var getLives = function() {
		return lives;
	}

	var getCredits = function() {
		return credits;
	}

	var setScore = function(newScore) {
		if (newScore >= 0) {
			score = newScore;
		}
	}

	var setLives = function(newLives) {
		if (newLives >= 0) {
			lives = newLives;
		}
	}

	var setCredits = function(newCredits) {
		if (newCredits >= 0) {
			credits = newCredits;
		}
	}

	var addToScore = function(points) {
		setScore(getScore() + points);
	}

	var removeLives = function(livesLost) {
		setLives(getLives() - livesLost);
	}

	var changeCredits = function(amount) {
		setCredits(getCredits() + amount);
	}

	that = {
		init: init,
		getScore: getScore,
		getLives: getLives,
		getCredits: getCredits,
		setScore: setScore,
		setLives: setLives,
		setCredits: setCredits,
		addToScore: addToScore,
		removeLives: removeLives,
		changeCredits: changeCredits
	}
	return that;
}());
