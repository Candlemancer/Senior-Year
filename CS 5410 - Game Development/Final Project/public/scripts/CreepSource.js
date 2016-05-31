// Jonathan Petersen
// A01236750

TowerDefense.CreepSource = function() {

	var startRect,
		endRect,
		movementField,
		creeps,
		basicCreepsLeft,
		fastCreepsLeft,
		airCreepsLeft,
		creepRate,
		timeSinceLastCreep,
		initialDelay;

	var creepFactory = function() {

		// Adjustible Values
		var alive,
			girth,
			goal,
			maxHealth,
			maxSpeed,
			pos,
			score,
			type;

		// Calculated Values
		var health,
			healthBarOffset,
			lastDirection,
			slowPercent,
			slowRemaining,
			speed;

		// Graphics
		var graphic,
			healthGraphic,
			maxHealthGraphic;

		////////////////////////////////////////////////////////////////////////////////////////////
		// init - Initializes the creep
		// Parameters:
		//	alive (true) - 	Should the creep keep existing 
		// 	girth (20) -	Radius of the creeps hitbox
		//  goal - 			Grid coordinates of the goal of the creep
		//  health (5) - 	How many HP the creep has
		//  pos (0, 0) - 	(x, y) coordinates of the creep
		//  speed (0.05) - 	How fast the creep should move per millisecond
		//  type (ground) - What type projectiles can hit this creep
		////////////////////////////////////////////////////////////////////////////////////////////
		var init = function(spec) {
			// Adjustable values
			alive = spec.alive || true;
			girth = spec.girth || 20;
			goal = {
				x: spec.goal.x || 0,
				y: spec.goal.y || 0
			}
			maxHealth = spec.health || 5;
			maxSpeed = spec.speed || 0.025;
			pos = {
				x: spec.pos.x || 0,
				y: spec.pos.y || 0
			}
			score = spec.score || 10;
			type = spec.type || 'ground';


			// Calculated Values
			health = maxHealth;
			healthBarOffset = 25;
			lastDirection = 0;
			slowPercent = 0.0;
			slowRemaining = 0;
			speed = maxSpeed;

			// Graphics
			graphic = spec.graphic || TowerDefense.AnimatedObjects.AnimatedMoveModel({
				pos: spec.pos,
				rotation: 0,
				width: 46,
				height: 46,
				spriteCount: 4,
				spriteSheet: 'images/creep/creep-2-blue/sheet.png',
				spriteTime: [200, 1000, 200, 600],
				speed: spec.speed,
			});

			healthGraphic = TowerDefense.Graphics.rectangleFactory({
				x: pos.x,
				y: pos.y - healthBarOffset,
				width: health * 8,
				height: 3,
				style: '#7ABF66'
			});
			maxHealthGraphic = TowerDefense.Graphics.rectangleFactory({
				x: pos.x,
				y: pos.y - healthBarOffset,
				width: health * 8,
				height: 3,
				style: '#941F1F'
			});
		}

		var update = function(elapsedTime) {
			if (alive) {
				var myIndex,
					goalIndex,
					movement;

				if (slowRemaining > 0) {
					slowRemaining -= elapsedTime;
					speed = Math.max(maxSpeed - (maxSpeed * slowPercent), 0);
				} else {
					slowRemaining = 0;
					slowPercent = 0.0;
					speed = maxSpeed;
				}

				movement = that.move(elapsedTime);
				pos = movement.pos;

				myIndex = TowerDefense.Reference.toGridCoordinates(pos);
				goalIndex = TowerDefense.Reference.toGridCoordinates(goal);

				graphic.moveTo(pos);
				graphic.setRotation(movement.dir);
				graphic.update(elapsedTime);
				maxHealthGraphic.moveTo({
					x: pos.x,
					y: pos.y - healthBarOffset
				});
				healthGraphic.moveTo({
					x: pos.x,
					y: pos.y - healthBarOffset
				});

				if (myIndex.x == goalIndex.x && myIndex.y == goalIndex.y) {
					flee();
				} 
				if (Math.abs(pos.x - goal.x) < 5 && Math.abs(pos.y - goal.y) < 5) {
					flee();
				}
			}
		}

		var renderLow = function() {
			if (alive) {
				graphic.draw();
				maxHealthGraphic.draw();
				healthGraphic.draw();
			}
		}

		var renderHigh = function() {
			// Empty
		}

		var move = function(elapsedTime) {
			var myIndex = TowerDefense.Reference.toGridCoordinates(pos),
				direction = movementField[myIndex.y][myIndex.x],
				newPos = {
					x: 0, 
					y: 0
				};
			lastDirection = direction;

			newPos.x = pos.x + speed * Math.cos(direction) * elapsedTime;
			newPos.y = pos.y + speed * Math.sin(direction) * elapsedTime;
			newPos.x = Math.min(Math.max(newPos.x, 0), TowerDefense.Reference.CANVAS_WIDTH);
			newPos.y = Math.min(Math.max(newPos.y, 0), TowerDefense.Reference.CANVAS_HEIGHT);

			return {
				pos: newPos,
				dir: direction 
			};
		}

		var getPos = function() {
			return {
				x: pos.x,
				y: pos.y
			}
		}

		var kill = function() {
			TowerDefense.Scoring.addToScore(score);
			TowerDefense.Scoring.changeCredits(100);
			TowerDefense.ParticleSystem.creepScoreEffect(pos, score);
			TowerDefense.ParticleSystem.creepExplosionEffect(pos);
			document.getElementById('creepDeathAudio').currentTime = 0;
			document.getElementById('creepDeathAudio').play();
			alive = false;
		}

		var flee = function() {
			TowerDefense.Scoring.removeLives(1);
			alive = false;
		}

		var getGirth = function() {
			return girth;
		}

		var isDead = function() {
			return !alive;
		}

		// var getFuturePos = function(millisecondsToGo) {
		// 	return {
		// 		x: Math.min(Math.max(
		// 			pos.x + speed * Math.cos(lastDirection) * millisecondsToGo, 0), CANVAS_WIDTH),
		// 		y: Math.min(Math.max(
		// 			pos.x + speed * Math.cos(lastDirection) * millisecondsToGo, 0), CANVAS_HEIGHT)
		// 	}
		// }

		var damage = function(projectile) {
			var effects = projectile.getDamage();
			if (effects.hasOwnProperty('healthDamage')) {
				health -= effects.healthDamage;
			}
			healthGraphic.changeWidth(health * 6);
			if (health <= 0) {
				kill();
			}

			slowRemaining = (effects.slowTime || 0);
			slowPercent = (effects.slowPercent || 0);

			projectile.hit();
		}

		var getType = function() {
			return type;
		}

		var that = {
			damage: damage,
			// getFuturePos: getFuturePos,
			getGirth: getGirth,
			getPos: getPos,
			init: init,
			isDead: isDead,
			kill: kill,
			move: move,
			renderLow: renderLow,
			renderHigh: renderHigh,
			update: update,
			getType: getType
		};
		return that;
	}

	var fastCreepFactory = function() {
		var that = creepFactory(),
			parentInit = that.init;

		var init = function(spec) {
			spec.girth = spec.fastGirth || 10;
			spec.health = spec.fastHealth || 3;
			spec.speed = spec.fastSpeed || 0.075;
			spec.graphic = TowerDefense.AnimatedObjects.AnimatedMoveModel({
				pos: spec.pos,
				rotation: 0,
				width: 46,
				height: 46,
				spriteCount: 4,
				spriteSheet: 'images/creep/creep-3-green/sheet.png',
				spriteTime: [1000, 200, 200, 200],
				speed: spec.speed,
			});

			parentInit(spec);
		}
		that.init = init;

		return that;
	}

	var airCreepFactory = function() {
		var that = creepFactory(),
			parentInit = that.init,
			parentRender = that.renderLow,
			goal,
			speed;

		var init = function(spec) {
			spec.health = spec.health || 3;
			spec.speed = spec.speed || 0.1;
			spec.type = spec.airType || 'air';
			spec.graphic = TowerDefense.AnimatedObjects.AnimatedMoveModel({
				pos: spec.pos,
				rotation: 0,
				width: 46,
				height: 46,
				spriteCount: 6,
				spriteSheet: 'images/creep/creep-1-yellow/sheet.png',
				spriteTime: [1000, 200, 100, 1000, 100, 200],
				speed: spec.speed,
			});
			goal = {
				x: spec.goal.x || 0,
				y: spec.goal.y || 0
			};
			speed = spec.speed;
			parentInit(spec);
		}
		that.init = init;

		var move = function(elapsedTime) {
			var newPos = {
					x: 0,
					y: 0
				},
				currentPos = that.getPos(),
				direction = Math.atan2(goal.y - currentPos.y, goal.x - currentPos.x);

			newPos = {
				x: currentPos.x + (speed * Math.cos(direction) * elapsedTime),
				y: currentPos.y + (speed * Math.sin(direction) * elapsedTime)
			}

			return {
				pos: newPos,
				dir: direction
			};
		}
		that.move = move;

		var renderLow = function() {
			// Empty
		}
		that.renderLow = renderLow;

		var renderHigh = function() {
			parentRender();
		}
		that.renderHigh = renderHigh;

		return that;
	}

	var recalculateMovement = function(towerPositions) {
		var gridSize = TowerDefense.Reference.toGridCoordinates({
			x: TowerDefense.Reference.CANVAS_WIDTH,
			y: TowerDefense.Reference.CANVAS_HEIGHT
		});
		movementField = [];
		for (var i = 0; i <= gridSize.y; ++i) {
			var tempRow = [];
			for (var j = 0; j <= gridSize.x; ++j) {
				tempRow.push(null);
			}
			movementField.push(tempRow);
		}
		for (var i = 0; i < towerPositions.length; ++i) {
			movementField[towerPositions[i].y][towerPositions[i].x] = Math.PI;
		}

		var searchQueue = [];
		searchQueue.push(
			TowerDefense.Reference.toGridCoordinates({
				x: (endRect.x2 - endRect.x1) / 2 + endRect.x1,
				y: (endRect.y2 - endRect.y1) / 2 + endRect.y1
			})
		);
		movementField[searchQueue[0].y][searchQueue[0].x] = 0;

		while (searchQueue.length > 0) {
			var current = searchQueue.shift();
			if (current.x > 0 &&
				movementField[current.y][current.x - 1] === null) {
				movementField[current.y][current.x - 1] = 0;
				searchQueue.push({
					x: current.x - 1,
					y: current.y
				});
			}
			if (current.y > 0 &&
				movementField[current.y - 1][current.x] === null) {
				movementField[current.y - 1][current.x] = Math.PI / 2;
				searchQueue.push({
					x: current.x,
					y: current.y - 1
				});
			}
			if (current.x < movementField[0].length - 1 &&
				movementField[current.y][current.x + 1] === null) {
				movementField[current.y][current.x + 1] = Math.PI;
				searchQueue.push({
					x: current.x + 1,
					y: current.y
				});
			}
			if (current.y < movementField.length - 1 &&
				movementField[current.y + 1][current.x] === null) {
				movementField[current.y + 1][current.x] = 3 * Math.PI / 2;
				searchQueue.push({
					x: current.x,
					y: current.y + 1
				});
			}
		}
	}

	var printMovementGrid = function() {
		console.log('_______________________MOVEMENT FIELD_______________________');
		for (var i = 0; i < movementField.length; ++i) {
			console.log('[i]: ' + i);
			console.log(movementField[i]);
		}
		console.log('------------------------------------------------------------');
	}

	var getCreeps = function() {
		return creeps;
	}

	var init = function(spec) {
		startRect = spec.startRect || {
			x1: 0,
			y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 150,
			x2: 0,
			y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 150
		};
		endRect = spec.endRect || {
			x1: TowerDefense.Reference.CANVAS_WIDTH - 1,
			y1: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) - 150,
			x2: TowerDefense.Reference.CANVAS_WIDTH - 1,
			y2: Math.floor(TowerDefense.Reference.CANVAS_HEIGHT / 2) + 150
		}

		movementField = [];
		recalculateMovement({
			x: -1,
			y: -1
		});
		// printMovementGrid();

		creeps = [];
		basicCreepsLeft = spec.numBasicCreeps || 0;
		fastCreepsLeft = spec.numFastCreeps || 0;
		airCreepsLeft = spec.numAirCreeps || 0;
		creepRate = spec.creepRate;
		timeSinceLastCreep = creepRate;
		initialDelay = spec.initialDelay;	
	}

	var update = function(elapsedTime) {
		if (initialDelay > 0) {
			initialDelay -= elapsedTime;
			return;
		}

		var totalCreepsLeft = basicCreepsLeft + fastCreepsLeft + airCreepsLeft,
		 	basicRate,
		 	fastRate,
		 	airRate,
		 	randomIndex;

		if (totalCreepsLeft > 0) {
			timeSinceLastCreep += elapsedTime;
			while (timeSinceLastCreep > creepRate) {
			 	basicRate = basicCreepsLeft / totalCreepsLeft;
			 	fastRate = fastCreepsLeft / totalCreepsLeft;
			 	airRate = airCreepsLeft / totalCreepsLeft;

			 	// console.log(basicCreepsLeft);
			 	// console.log(fastCreepsLeft);
			 	// console.log(airRate);

				randomIndex = Math.random();
				// console.log(randomIndex);
				if (randomIndex < basicRate) {
					// console.log('basic');
					creeps.push(creepFactory());
					basicCreepsLeft--;
				}
				else if (randomIndex >= basicRate && randomIndex < basicRate + fastRate) {
					// console.log('fast');
					creeps.push(fastCreepFactory());
					fastCreepsLeft--;
				}
				else {
					// console.log('air');
					creeps.push(airCreepFactory());
					airCreepsLeft--;
				}
				totalCreepsLeft--;
				creeps[creeps.length - 1].init({
					pos: {
						x: Math.random() * (startRect.x2 - startRect.x1) + startRect.x1,
						y: Math.random() * (startRect.y2 - startRect.y1) + startRect.y1
					},
					goal: {
						x: (endRect.x2 - endRect.x1) / 2 + endRect.x1,
						y: (endRect.y2 - endRect.y1) / 2 + endRect.y1
					}
				});
				timeSinceLastCreep -= creepRate;
			}
		}

		for (var i = creeps.length - 1; i >= 0; i--) {
			creeps[i].update(elapsedTime);
			if (creeps[i].isDead()) {
				creeps.splice(i, 1);
			}
		}
	};

	var renderLow = function() {
		for (var i = creeps.length - 1; i >= 0; i--) {
			creeps[i].renderLow();
		}
	};

	var renderHigh = function() {
		for (var i = creeps.length - 1; i >= 0; i--) {
			creeps[i].renderHigh();
		}
	};

	return {
		init: init,
		update: update,
		renderLow: renderLow,
		renderHigh: renderHigh,
		recalculateMovement: recalculateMovement,
		getCreeps: getCreeps
	}
};
