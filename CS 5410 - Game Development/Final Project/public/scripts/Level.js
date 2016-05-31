// Jonathan Petersen
// A01236750

TowerDefense.Level = (function(Creeps) {

	var sources,
		currentLevel,
		towerPositions,
		ready = false;

	var updateAllMovementFields = function(updatedTowerPositions) {
		towerPositions = updatedTowerPositions || towerPositions;
		for (var i = sources.length - 1; i >= 0; i--) {
			sources[i].recalculateMovement(towerPositions);
		}
	}

	var getAllCreeps = function() {
		var allCreeps = [];
		for (var i = sources.length - 1; i >= 0; i--) {
			allCreeps = allCreeps.concat(sources[i].getCreeps());
		}
		return allCreeps;
	}

	var damageAllCreeps = function(projectiles) {
		var allCreeps = getAllCreeps();

		for (var j = projectiles.length - 1; j >= 0; j--) {
			for (var i = allCreeps.length - 1; i >= 0; i--) {
				if (projectiles[j].getAttackType() !== 'mixed' &&
					projectiles[j].getAttackType() != allCreeps[i].getType()) {
					continue;
				}
				if (Math.sqrt(
						(projectiles[j].getPos().x - allCreeps[i].getPos().x) *
						(projectiles[j].getPos().x - allCreeps[i].getPos().x) +
						(projectiles[j].getPos().y - allCreeps[i].getPos().y) *
						(projectiles[j].getPos().y - allCreeps[i].getPos().y)
					) <= allCreeps[i].getGirth()) {
					allCreeps[i].damage(projectiles[j]);

					if (projectiles[j].getType() === 'grenade') {
						for (var k = allCreeps.length - 1; k >= 0; k--) {
							if (Math.sqrt(
									(projectiles[j].getPos().x - allCreeps[k].getPos().x) *
									(projectiles[j].getPos().x - allCreeps[k].getPos().x) +
									(projectiles[j].getPos().y - allCreeps[k].getPos().y) *
									(projectiles[j].getPos().y - allCreeps[k].getPos().y)
								) <= projectiles[j].getSplashRadius() &&
								allCreeps[k].getType() === 'ground') {
								allCreeps[k].damage(projectiles[j]);
							}
						}
					}

					return;
				}
			}
		}
	}

	var init = function(spec) {
		sources = [];
		currentLevel = 0;
		towerPositions = [];
		ready = true;
	}

	var update = function(elapsedTime) {
		for (var i = sources.length - 1; i >= 0; i--) {
			sources[i].update(elapsedTime);
		}
	}

	var renderLow = function() {
		for (var i = sources.length - 1; i >= 0; i--) {
			sources[i].renderLow();
		}
	}

	var renderHigh = function() {
		for (var i = sources.length - 1; i >= 0; i--) {
			sources[i].renderHigh();
		}
	}

	var startNextLevel = function() {
		if (!ready) {
			return;
		}
		currentLevel++;
		TowerDefense.Scoring.addToScore(50 * currentLevel);

		for (var waves = 0; waves < Math.floor(currentLevel / 5) + 1; ++waves) {
			var leftSource = Creeps();
			leftSource.init({
				startRect: {
					x1: 0,
					y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 50,
					x2: 0,
					y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 50
				},
				endRect: {
					x1: TowerDefense.Reference.CANVAS_WIDTH - 1,
					y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 50,
					x2: TowerDefense.Reference.CANVAS_WIDTH - 1,
					y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 50
				},
				numBasicCreeps: 10 * Math.floor(1 + Math.exp(currentLevel)),
				numFastCreeps: Math.max(Math.floor(3 * Math.exp(currentLevel - 3)), 0),
				numAirCreeps: Math.max(Math.floor(5 * Math.exp(currentLevel - 5)), 0),
				creepRate: 2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 1000),
				initialDelay: waves * 
					(2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 1000)) * 
					(
						(10 * Math.floor(1 + Math.exp(currentLevel))) + 
						(Math.max(Math.floor(3 * Math.exp(currentLevel - 3)), 0)) + 
						(Math.max(Math.floor(5 * Math.exp(currentLevel - 5)), 0))
					) +
					3000
			});	
			sources.push(leftSource);
		}
		
		if (currentLevel <= 2) {
			updateAllMovementFields();
			return;
		}

		for (var waves = 0; waves < Math.floor(currentLevel / 5) + 1; ++waves) {
			var topSource = Creeps();
			topSource.init({
				startRect: {
					x1: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) - 50,
					y1: 0,
					x2: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) + 50,
					y2: 0
				},
				endRect: {
					x1: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) - 50,
					y1: TowerDefense.Reference.CANVAS_HEIGHT - 1,
					x2: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) + 50,
					y2: TowerDefense.Reference.CANVAS_HEIGHT - 1
				},
				numBasicCreeps: Math.floor(4 * 1 + Math.exp(currentLevel)),
				numFastCreeps: 0,
				numAirCreeps: Math.floor(6 * 1 + Math.exp(currentLevel)), 
				creepRate: 2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 500),
				initialDelay: waves * 
					(2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 1000)) * 
					(
						(Math.floor(4 * 1 + Math.exp(currentLevel))) + 
						(0) + 
						(Math.floor(6 * 1 + Math.exp(currentLevel)))
					) +
					3000
				});
			sources.push(topSource);
		}

		if (currentLevel <= 4) {
			updateAllMovementFields();
			return;
		}

		for (var waves = 0; waves < Math.floor(currentLevel / 5) + 1; ++waves) {
			var bottomSource = Creeps();
			bottomSource.init({
				startRect: {
					x1: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) - 50,
					y1: TowerDefense.Reference.CANVAS_HEIGHT - 1,
					x2: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) + 50,
					y2: TowerDefense.Reference.CANVAS_HEIGHT - 1
				},
				endRect: {
					x1: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) - 50,
					y1: 0,
					x2: Math.floor(TowerDefense.Reference.CANVAS_WIDTH / 2) + 50,
					y2: 0
				},
				numBasicCreeps: Math.floor(4 * 1 + Math.exp(currentLevel)),
				numFastCreeps: Math.floor(3 * 1 + Math.exp(currentLevel)),
				numAirCreeps: Math.floor(3 * 1 + Math.exp(currentLevel)), 
				creepRate: 2000 - Math.min(Math.floor(20 * 1 + Math.exp(currentLevel)), 500),
				initialDelay: waves * 
					(2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 1000)) * 
					(
						Math.floor(4 * 1 + Math.exp(currentLevel)) + 
						Math.floor(3 * 1 + Math.exp(currentLevel)) + 
						Math.floor(3 * 1 + Math.exp(currentLevel))
					) +
					3000
			})
			sources.push(bottomSource);
		}

		if (currentLevel <= 6) {
			updateAllMovementFields();
			return;
		}

		for (var waves = 0; waves < Math.floor(currentLevel / 5) + 1; ++waves) {
			var rightSource = Creeps();
			rightSource.init({
				startRect: {
					x1: TowerDefense.Reference.CANVAS_WIDTH - 1,
					y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 50,
					x2: TowerDefense.Reference.CANVAS_WIDTH - 1,
					y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 50
				},
				endRect: {
					x1: 0,
					y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 50,
					x2: 0,
					y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 50
				},
				numBasicCreeps: 10 * Math.floor(1 + Math.exp(currentLevel)),
				numFastCreeps: 10 * Math.floor(1 + Math.exp(currentLevel)),
				numAirCreeps: 10 * Math.floor(1 + Math.exp(currentLevel)),
				creepRate: Math.max(5000 - (currentLevel * 50), 100),
				initialDelay: waves * 
					(2000 - Math.min(Math.floor(10 * 1 + Math.exp(currentLevel)), 1000)) * 
					(
						10 * Math.floor(1 + Math.exp(currentLevel)) + 
						10 * Math.floor(1 + Math.exp(currentLevel)) + 
						10 * Math.floor(1 + Math.exp(currentLevel))
					) +
					3000
			});
			sources.push(rightSource);
		}

		updateAllMovementFields();
	}

	var getCurrentLevel = function() {
		return currentLevel;
	}

	return {
		init: init,
		update: update,
		renderLow: renderLow,
		renderHigh: renderHigh,
		updateAllMovementFields: updateAllMovementFields,
		getAllCreeps: getAllCreeps,
		damageAllCreeps: damageAllCreeps,
		startNextLevel: startNextLevel,
		getCurrentLevel: getCurrentLevel
	}
}(TowerDefense.CreepSource));
