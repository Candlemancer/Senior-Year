// Jonathan Petersen
// A01236750
// Breakout Game
// Scoring System

Breakout.Scoring = (function(){

	var that = {};
	var score = 0;
	var counters = {};


	that.addPoints = function(amount) {
		score += amount;
	}

	that.getScore = function() {
		return score;
	}

	that.resetScore = function() {
		score = 0;
	}

	return that;
}());
