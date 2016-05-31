// Jonathan Petersen
// A01236750

TowerDefense.GameLoop = (function(input, towers, cursor, level, projectiles, ui, scores,
	particles) {
	'use strict';

	var timestamp,
		background,
		mouse = input.Mouse(),
		keyboard = input.Keyboard();

	var runClickEvents = function(mouseEvent) {
		checkTowerClick(mouseEvent);
		placeTower(mouseEvent);
	}

	var checkTowerClick = function(mouseEvent) {
		var position = TowerDefense.Reference.toNearestNormalCoordinates({
			x: mouseEvent.layerX,
			y: mouseEvent.layerY
		});
		towers.clickAllTowers(position);
	}

	var placeTower = function(mouseEvent) {
		var position = TowerDefense.Reference.toNearestNormalCoordinates({
				x: mouseEvent.layerX,
				y: mouseEvent.layerY
			}),
			type = ui.getSelectedTowerType();

		if (type == null) {
			return;
		}

		towers.addTower({
			pos: position,
			type: type
		});
		cursor.setBrush({
			brush: null,
			range: null
		});
		ui.clearSelectedTowerType();
		level.updateAllMovementFields(towers.getTowerPositions());
	}

	var init = function() {
		timestamp = performance.now();
		background = TowerDefense.Graphics.particleImageFactory({
			src: 'images/background.png',
			pos: {
				x: TowerDefense.Reference.CANVAS_WIDTH / 2,
				y: TowerDefense.Reference.CANVAS_HEIGHT / 2
			},
			width: TowerDefense.Reference.CANVAS_WIDTH,
			height: TowerDefense.Reference.CANVAS_HEIGHT,
			rotation: 0
		});

		scores.init();
		cursor.init(mouse);
		particles.init()
		projectiles.init();
		towers.init();
		level.init();
		ui.init(keyboard);
	};

	var processInput = function() {
		mouse.update();
		keyboard.update();
	}

	var update = function(elapsedTime) {
		particles.update(elapsedTime);
		level.update(elapsedTime);
		towers.update(elapsedTime);
		cursor.update(elapsedTime);
		towers.findTargets(level.getAllCreeps());
		projectiles.update(elapsedTime);
		level.damageAllCreeps(projectiles.getAllProjectiles());

		var uiStatus = ui.update();
		if (uiStatus.towersSold === true) {
			level.updateAllMovementFields(towers.getTowerPositions());
		}

		return (scores.getLives() <= 0);
	};

	var render = function() {
		TowerDefense.Graphics.clear();
		background.draw();
		towers.renderLow();
		level.renderLow();
		towers.renderHigh();
		level.renderHigh();
		particles.render();
		projectiles.render();
		cursor.render();
	};

	var gameLoop = function(currentTime) {
		var elapsedTime = currentTime - timestamp;
		timestamp = currentTime;

		update(elapsedTime);
		render();
	};

	var run = function() {
		init();
		// console.log('starting game');

		gameLoop(timestamp);
	};

	mouse.registerCommand('mousedown', runClickEvents);

	return {
		init: init,
		run: run,
		processInput: processInput,
		update: update,
		render: render
	}
}(TowerDefense.Input, TowerDefense.Towers, TowerDefense.Cursor, TowerDefense.Level,
	TowerDefense.Projectiles, TowerDefense.UIController, TowerDefense.Scoring,
	TowerDefense.ParticleSystem));
