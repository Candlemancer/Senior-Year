// Jonathan Petersen
// A01236750

// The Main Game Object
var TowerDefense = {
	pages: []
};

// Collection of utility functions and constants
TowerDefense.Reference = (function() {

	var CANVAS_WIDTH = document.getElementById('game-canvas').width;
	var CANVAS_HEIGHT = document.getElementById('game-canvas').height;
	var GRID_SIZE = 25;

	function intersectRectangles(r1, r2) {
		return !(
			r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top
		);
	}

	function toGridCoordinates(pos) {
		return {
			x: Math.floor(pos.x / GRID_SIZE),
			y: Math.floor(pos.y / GRID_SIZE)
		}
	}

	function toNormalizedCoordinates(pos) {
		var gridCoords = toGridCoordinates(pos);

		return {
			x: gridCoords.x * GRID_SIZE,
			y: gridCoords.y * GRID_SIZE
		}
	}

	function toNearestNormalCoordinates(pos) {
		return {
			x: Math.round(pos.x / GRID_SIZE) * GRID_SIZE,
			y: Math.round(pos.y / GRID_SIZE) * GRID_SIZE,
		}
	}

	return {
		CANVAS_WIDTH: CANVAS_WIDTH,
		CANVAS_HEIGHT: CANVAS_HEIGHT,
		GRID_SIZE: GRID_SIZE,
		intersectRectangles: intersectRectangles,
		toGridCoordinates: toGridCoordinates,
		toNormalizedCoordinates: toNormalizedCoordinates,
		toNearestNormalCoordinates: toNearestNormalCoordinates
	}
}());
