// Jonathan Petersen
// A01236750

TowerDefense.Cursor = (function() {

	var mouse,
		mousePosition,
		brush;

	var init = function(mouseSource) {
		mouse = mouseSource;
		mouse.registerCommand('mousemove', moveCursor);
		brush = {
			graphic: null,
			range: null
		};
		mousePosition = {
			x: 0,
			y: 0
		};
	}

	var update = function() {
		var towerCoords = TowerDefense.Reference.toNearestNormalCoordinates(mousePosition);

		if (brush.graphic) {
			brush.graphic.moveTo(towerCoords);
		}
		if (brush.range) {
			brush.range.moveTo(towerCoords);
		}
	}

	var render = function() {
		if (TowerDefense.Towers.canPlaceTowerAt(
				TowerDefense.Reference.toNearestNormalCoordinates(mousePosition)
			)) {
			// console.log('could draw');
			// console.log(brush);
			if (brush.graphic) {
				brush.graphic.draw();
			}
			if (brush.range) {
				brush.range.draw();
			}
		}
	}

	var moveCursor = function(mouseEvent) {
		mousePosition = {
			x: mouseEvent.layerX,
			y: mouseEvent.layerY
		}
	}

	var setBrush = function(newBrush) {
		brush = newBrush;
	}

	return {
		init: init,
		update: update,
		render: render,
		setBrush: setBrush
	}
}());
