// Jonathan Petersen
// A01236750

TowerDefense.Projectiles = (function() {

	var projectiles = [];

	var projectileFactory = function() {
		// Adjustable Values
		var alive,
			attackType,
			level,
			pos,
			speed,
			target,
			timeToLive;

		// Calculated Values
		var direction;

		// Graphics
		var graphic;

		var init = function(spec) {
			// Adjustable Values
			alive = spec.alive || true;
			attackType = spec.attackType || 'mixed';
			level = spec.level || 0;
			pos = spec.source || {
				x: 0,
				y: 0
			};
			speed = spec.speed || 0.1;
			target = spec.target || console.log('Unknown Projectile Target!');
			timeToLive = spec.timeToLive || 3000;

			// Calculated Values
			var targetPos = target.getPos();
			direction = Math.atan2(targetPos.y - pos.y, targetPos.x - pos.x);

			// Graphics
			graphic = spec.graphic || TowerDefense.Graphics.rectangleFactory({
				x: pos.x,
				y: pos.y,
				width: 3,
				height: 3
			});
		};

		var update = function(elapsedTime) {
			if (alive) {
				pos = that.move(elapsedTime);
				graphic.moveTo(pos);

				timeToLive -= elapsedTime;
				if (timeToLive < 0) {
					alive = false;
				}
			}
		}

		var render = function() {
			if (alive) {
				graphic.draw();
			} 
		}

		var move = function(elapsedTime) {
			return {
				x: pos.x + speed * Math.cos(direction) * elapsedTime,
				y: pos.y + speed * Math.sin(direction) * elapsedTime
			}
		}

		var hit = function() {
			alive = false;
		}

		var getPos = function() {
			return {
				x: pos.x,
				y: pos.y
			};
		}

		var isDead = function() {
			return !alive;
		}

		var getDamage = function() {
			return {
				healthDamage: that.getLevel()
			};
		}

		var getLevel = function() {
			return level;
		}

		var getAttackType = function() {
			return attackType;
		}

		var getType = function() {
			return 'projectile';
		}

		var that = {
			init: init,
			update: update,
			render: render,
			move: move,
			hit: hit,
			getPos: getPos,
			isDead: isDead,
			getDamage: getDamage,
			getLevel: getLevel,
			getAttackType: getAttackType,
			getType: getType
		};
		return that;
	}

	var missileFactory = function() {
		var that = projectileFactory(),
			parentInit = that.init,
			parentMove = that.move,
			parentHit = that.hit,
			heatSignature,
			speed,
			lastDirection;

		var init = function(spec) {
			heatSignature = spec.target;
			speed = spec.speed || 0.15;
			lastDirection = 0;
			parentInit(spec);
		}
		that.init = init;

		var move = function(elapsedTime) {
			var currentLocation = that.getPos(),
				targetLock = heatSignature.getPos(),
				targetDir = Math.atan2(targetLock.y - currentLocation.y, 
									   targetLock.x - currentLocation.x);

			if (heatSignature.isDead()) {
				that.move = parentMove;
				return {
					x: currentLocation.x,
					y: currentLocation.y
				};
			}

			lastDirection = targetDir;
			TowerDefense.ParticleSystem.missileTrailEffect(that);

			return {
				x: currentLocation.x + speed * Math.cos(targetDir) * elapsedTime,
				y: currentLocation.y + speed * Math.sin(targetDir) * elapsedTime
			}
		}
		that.move = move;

		var getType = function() {
			return 'missile';
		}
		that.getType = getType;

		var getDirection = function() {
			return lastDirection;
		}
		that.getDirection = getDirection;

		var hit = function() {
			TowerDefense.ParticleSystem.missileExplosionEffect(that.getPos());
			document.getElementById('explosionAudio').currentTime = 0;
			document.getElementById('explosionAudio').play();
			parentHit();
		}
		that.hit = hit;

		return that;
	}

	var grenadeFactory = function() {
		var that = projectileFactory(),
			parentInit = that.init,
			parentMove = that.move,
			parentHit = that.hit;

		var init = function(spec) {
			parentInit(spec);
		}
		that.init = init;

		var move = function(elapsedTime) {
			TowerDefense.ParticleSystem.grenadeTrailEffect(that.getPos());
			return parentMove(elapsedTime);
		}
		that.move = move;

		var getType = function() {
			return 'grenade';
		}
		that.getType = getType;

		var getSplashRadius = function() {
			return 25 * that.getLevel();
		}
		that.getSplashRadius = getSplashRadius;

		var getDamage = function() {
			return {
				healthDamage: 1
			}
		}
		that.getDamage = getDamage;

		var hit = function() {
			document.getElementById('explosionAudio').currentTime = 0;
			document.getElementById('explosionAudio').play();
			TowerDefense.ParticleSystem.grenadeExplosionEffect(that.getPos());
			parentHit();
		}
		that.hit = hit;

		return that;
	}

	var freezingFactory = function(spec) {
		var that = projectileFactory(),
			parentInit = that.init;

		// var init = function(spec) {
		// 	parentInit(spec);
		// }
		// that.init = init;

		var getDamage = function() {
			return {
				slowTime: 1000,
				slowPercent: 0.34 * that.getLevel()
			}
		}
		that.getDamage = getDamage;

		var getType = function() {
			return 'freezing';
		}
		that.getType = getType;

		return that;
	}

	var shoot = function(spec) {
		if (spec.type === 'basic') {
			projectiles.unshift(projectileFactory());
		}
		else if (spec.type === 'missile') {
			projectiles.unshift(missileFactory());
		}
		else if (spec.type === 'grenade') {
			projectiles.unshift(grenadeFactory());
		}
		else if (spec.type === 'freezing') {
			projectiles.unshift(freezingFactory());
		}
		else {
			console.log('Unknown Projectile Type!');
			projectiles.unshift(projectileFactory());
		}
		projectiles[0].init(spec);
	}

	var init = function() {};

	var update = function(elapsedTime) {
		for (var i = projectiles.length - 1; i >= 0; i--) {
			projectiles[i].update(elapsedTime);
			if (projectiles[i].isDead()) {
				projectiles.splice(i, 1);
			}
		}
	}

	var render = function() {
		for (var i = projectiles.length - 1; i >= 0; i--) {
			projectiles[i].render();
		}
	}


	var getAllProjectiles = function() {
		return projectiles;
	}

	return {
		init: init,
		update: update,
		render: render,
		shoot: shoot,
		getAllProjectiles: getAllProjectiles
	}
}());
