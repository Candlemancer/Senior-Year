// Jonathan Petersen
// A01236750

TowerDefense.Towers = (function(projectiles) {
	'use strict';

	var towers,
		selectedTowerIndex;

	var basicTowerFactory = function() {
		// Adjustable values
		var attackType,
			maxShotCooldown,
			range,
			pos,
			sideLength,
			towerType;

		// Calculated values
		var alive,
			shotCooldown,
			shotGenerator = projectiles,
			showRadius,
			upgradeLevel,
			lastTarget,
			rotation;

		// Graphics
		var graphic,
			baseGraphic,
			rangeGraphic,
			levelOneGraphic,
			levelTwoGraphic,
			levelThreeGraphic;

		var init = function(spec) {
			// Adjustable Values
			attackType = spec.attackType || 'mixed';
			maxShotCooldown = spec.shotCooldown || 1000;
			range = spec.range || 75;
			pos = {
				x: spec.pos.x || 0,
				y: spec.pos.y || 0
			};
			sideLength = spec.sideLength || 40;
			towerType = spec.towerType || 'basic';

			// Calculated Values
			alive = true;
			shotCooldown = maxShotCooldown;
			showRadius = false;
			upgradeLevel = 0;
			lastTarget = null;
			rotation = 0;

			// Graphics
			baseGraphic = spec.baseGraphic || TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-base.gif',
				pos: spec.pos,
				width: sideLength + 10,
				height: sideLength + 10,
				rotation: 0
			});
			rangeGraphic = spec.rangeGraphic || TowerDefense.Graphics.circleFactory({
				x: spec.pos.x,
				y: spec.pos.y,
				radius: range,
				style: '#53B2C3'
			});
			levelOneGraphic = spec.levelOneGraphic || TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-1-1.png',
				pos: spec.pos,
				width: sideLength + 20,
				height: sideLength + 20,
				rotation: 0
			});
			levelTwoGraphic = spec.levelTwoGraphic || TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-1-2.png',
				pos: spec.pos,
				width: sideLength + 20,
				height: sideLength + 20,
				rotation: 0
			});
			levelThreeGraphic = spec.levelThreeGraphic || TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-1-3.png',
				pos: spec.pos,
				width: sideLength + 20,
				height: sideLength + 20,
				rotation: 0
			});
			graphic = levelOneGraphic;
		}

		var update = function(elapsedTime) {
			if (alive) {
				if (shotCooldown > 0) {
					shotCooldown -= elapsedTime;
				}
				if (shotCooldown < 0) {
					shotCooldown = 0;
				}
				if (lastTarget) {
					// rotation = ;
					graphic.setRotation(Math.atan2(lastTarget.y - pos.y, lastTarget.x - pos.x) + Math.PI / 2);
				}
			}
		}

		var renderLow = function() {
			if (alive) {
				baseGraphic.draw();
			}
		}

		var renderHigh = function() {
			if (alive) {
				graphic.draw();
				if (showRadius) {
					rangeGraphic.draw();
				}
			}
		}

		var setRadiusVisibility = function(state) {
			showRadius = !!state;
		}

		var getRange = function() {
			return range;
		}

		var getPos = function() {
			return {
				x: pos.x,
				y: pos.y
			};
		}

		var getBoundingBox = function() {
			return {
				left: pos.x - sideLength / 2,
				right: pos.x + sideLength / 2,
				top: pos.y - sideLength / 2,
				bottom: pos.y + sideLength / 2
			}
		}

		var fireAt = function(creep) {
			lastTarget = creep.getPos();
			if (shotCooldown == 0) {
				shotGenerator.shoot({
					source: getPos(),
					target: creep,
					type: that.getType(),
					attackType: that.getAttackType(),
					level: upgradeLevel + 1
				});
				shotCooldown = maxShotCooldown;
				document.getElementById('towerShootAudio').currentTime = 0;
				document.getElementById('towerShootAudio').play();

			}
		}

		var getGraphics = function() {
			return {
				graphic: graphic,
				range: rangeGraphic
			}
		}

		var sell = function() {
			alive = false;
			TowerDefense.Scoring.changeCredits(getCost());
			TowerDefense.Scoring.addToScore(-Math.floor(getCost() / 10));
			TowerDefense.ParticleSystem.towerSellEffect(pos);
			document.getElementById('towerSellAudio').currentTime = 0;
			document.getElementById('towerSellAudio').play();
		}

		var isDead = function() {
			return !alive;
		}

		var upgrade = function() {
			if (getUpgradeCost() <= TowerDefense.Scoring.getCredits()) {
				TowerDefense.Scoring.changeCredits(-getUpgradeCost());
				upgradeLevel++;
				range += 5;
				maxShotCooldown -= 20;
				rangeGraphic.setRadius(range);
			}
			if (upgradeLevel == 1) {
				graphic = levelTwoGraphic;
			}
			if (upgradeLevel >= 2) {
				graphic = levelThreeGraphic;
			}
		}

		var getAttackType = function() {
			return attackType;
		}

		var getType = function() {
			return towerType;
		}

		var getCost = function() {
			return 1000;
		}

		var getUpgradeCost = function() {
			return that.getCost() / 2 * (upgradeLevel + 1);
		}

		var getUpgradeLevel = function() {
			return upgradeLevel + 1;
		}

		var that = {
			init: init,
			update: update,
			renderLow: renderLow,
			renderHigh: renderHigh,
			setRadiusVisibility: setRadiusVisibility,
			getBoundingBox: getBoundingBox,
			getPos: getPos,
			getRange: getRange,
			getGraphics: getGraphics,
			fireAt: fireAt,
			sell: sell,
			isDead: isDead,
			upgrade: upgrade,
			getAttackType: getAttackType,
			getType: getType,
			getCost: getCost,
			getUpgradeCost: getUpgradeCost,
			getUpgradeLevel: getUpgradeLevel
		}
		return that;
	}

	var missileTowerFactory = function() {
		var that = basicTowerFactory(),
			parentInit = that.init;

		var init = function(spec) {
			spec.range = spec.range || 150;
			spec.sideLength = spec.sideLength || 40;
			spec.attackType = spec.attackType || 'air';
			spec.levelOneGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-2-1.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelTwoGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-2-2.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelThreeGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-2-3.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.towerType = spec.towerType || 'missile';
			parentInit(spec);
		}
		that.init = init;

		return that;
	}

	var grenadeTowerFactory = function() {
		var that = basicTowerFactory(),
			parentInit = that.init;

		var init = function(spec) {
			spec.sideLength = spec.sideLength || 40;
			spec.attackType = spec.attackType || 'ground';
			spec.levelOneGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-3-1.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelTwoGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-3-2.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelThreeGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-3-3.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.towerType = spec.towerType || 'grenade';
			parentInit(spec);
		}
		that.init = init;

		var getCost = function() {
			return 2000;
		}
		that.getCost = getCost;

		return that;
	}

	var freezingTowerFactory = function() {
		var that = basicTowerFactory(),
			parentInit = that.init;

		var init = function(spec) {
			spec.sideLength = spec.sideLength || 40;
			spec.attackType = spec.attackType || 'ground';
			spec.levelOneGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-4-1.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelTwoGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-4-2.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});
			spec.levelThreeGraphic = TowerDefense.Graphics.particleImageFactory({
				src: 'images/tower-defense-turrets/turret-4-3.png',
				pos: spec.pos,
				width: 60,
				height: 60,
				rotation: 0
			});

			spec.towerType = spec.towerType || 'freezing';
			parentInit(spec);
		}
		that.init = init;

		var getCost = function() {
			return 2000;
		}
		that.getCost = getCost;

		return that;
	}

	var getTowerPositions = function() {
		var positions = [];

		for (var i = towers.length - 1; i >= 0; i--) {
			var aabb = towers[i].getBoundingBox();
			positions.push({
				x: Math.floor(aabb.left / 25),
				y: Math.floor(aabb.top / 25)
			});
			positions.push({
				x: Math.floor(aabb.right / 25),
				y: Math.floor(aabb.top / 25)
			});
			positions.push({
				x: Math.floor(aabb.left / 25),
				y: Math.floor(aabb.bottom / 25)
			});
			positions.push({
				x: Math.floor(aabb.right / 25),
				y: Math.floor(aabb.bottom / 25)
			});
		}
		return positions;
	}

	var createFakeTower = function(spec) {
		var tower;

		if (spec.pos) {
			if (!canPlaceTowerAt(spec.pos)) {
				return false;
			}			
		} else {
			spec.pos = {
				x: -100,
				y: -100
			}
		}

		if (spec.type === 'basic') {
			tower = basicTowerFactory();
		}
		else if (spec.type === 'missile') {
			tower = missileTowerFactory();
		}
		else if (spec.type === 'grenade') {
			tower = grenadeTowerFactory();
		}
		else if (spec.type === 'freezing') {
			tower = freezingTowerFactory();
		}
		else {
			return false;
		}
		tower.init({
			pos: TowerDefense.Reference.toNormalizedCoordinates(spec.pos)
		});

		return tower;
	}

	var addTower = function(spec) {
		var newTower = createFakeTower(spec);
		if (newTower && newTower.getCost() <= TowerDefense.Scoring.getCredits()) {
			towers.push(newTower);
			TowerDefense.Scoring.changeCredits(-newTower.getCost());
			TowerDefense.Scoring.addToScore(Math.floor(newTower.getCost() / 10));
			document.getElementById('towerPlaceAudio').currentTime = 0;
			document.getElementById('towerPlaceAudio').play();
		}
	}

	var canPlaceTowerAt = function(pos) {
		var alignedPosition = TowerDefense.Reference.toNormalizedCoordinates(pos),
			imaginaryBoundingBox = {
				left: alignedPosition.x - 20,
				right: alignedPosition.x + 20,
				top: alignedPosition.y - 20,
				bottom: alignedPosition.y + 20
			};

		if (pos.x >= TowerDefense.Reference.CANVAS_WIDTH - 50 ||
			pos.y >= TowerDefense.Reference.CANVAS_HEIGHT - 50 ||
			pos.x < 50 ||
			pos.y < 50) {
			return false;
		}

		for (var i = towers.length - 1; i >= 0; i--) {
			if (TowerDefense.Reference.intersectRectangles(
					imaginaryBoundingBox,
					towers[i].getBoundingBox()
				)) {
				return false;
			}
		}

		return true;
	}

	var clickAllTowers = function(pos) {
		for (var i = towers.length - 1; i >= 0; i--) {
			towers[i].setRadiusVisibility(false);
			selectedTowerIndex = null;
		}

		for (var i = towers.length - 1; i >= 0; i--) {
			var aabb = towers[i].getBoundingBox();
			if (pos.x < aabb.right &&
				pos.x > aabb.left &&
				pos.y > aabb.top &&
				pos.y < aabb.bottom) {
				towers[i].setRadiusVisibility(true);
				selectedTowerIndex = i;
			}
		}
	}

	var findTargets = function(creeps) {
		for (var i = 0; i < towers.length; ++i) {
			for (var j = 0; j < creeps.length; ++j) {
				if (towers[i].getAttackType() != 'mixed' &&
					towers[i].getAttackType() != creeps[j].getType()) {
					continue;
				}
				if (Math.sqrt(
						(creeps[j].getPos().x - towers[i].getPos().x) *
						(creeps[j].getPos().x - towers[i].getPos().x) +
						(creeps[j].getPos().y - towers[i].getPos().y) *
						(creeps[j].getPos().y - towers[i].getPos().y)
					) < towers[i].getRange()) {
					towers[i].fireAt(creeps[j]);
					break;
				}
			}
		}
	}

	var init = function() {
		towers = [];
		selectedTowerIndex = null;
	}

	var update = function(elapsedTime) {
		for (var i = towers.length - 1; i >= 0; i--) {
			towers[i].update(elapsedTime);
			if (towers[i].isDead()) {
				towers.splice(i, 1);
				selectedTowerIndex = null;
			}
		}
	}

	var renderLow = function() {
		for (var i = towers.length - 1; i >= 0; i--) {
			towers[i].renderLow();
		}
	}
	
	var renderHigh = function() {
		for (var i = towers.length - 1; i >= 0; i--) {
			towers[i].renderHigh();
		}
	}

	var getSelectedTower = function() {
		if (selectedTowerIndex !== null) {
			return towers[selectedTowerIndex];
		}
		return null;
	}

	return {
		init: init,
		update: update,
		renderLow: renderLow,
		renderHigh: renderHigh,
		addTower: addTower,
		createFakeTower: createFakeTower,
		canPlaceTowerAt: canPlaceTowerAt,
		clickAllTowers: clickAllTowers,
		getTowerPositions: getTowerPositions,
		findTargets: findTargets,
		getSelectedTower: getSelectedTower
	}
}(TowerDefense.Projectiles));
