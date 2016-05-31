// Jonathan Petersen
// A01236750

TowerDefense.ParticleSystem = (function() {

	var particles;

	var particleFactory = function() {
		var that = {};
		// Adjustable Values
		var pos,
			rotation,
			width,
			height,
			timeToLive;

		// Calculatd Values
		var alive;

		// Graphics
		var graphic;

		var init = function(spec) {
			// Adjustable Values
			pos = spec.pos || {
				x: 0,
				y: 0
			};
			rotation = spec.rotation || 0;
			width = spec.width || 5;
			height = spec.height || 5;
			timeToLive = spec.timeToLive || 1000;
			that.evolve = spec.evolve || function(elapsedTime) {
				return {
					pos: pos,
					rotation: rotation,
					width: width,
					height: height
				}
			}
			that.evolveParams = spec.evolveParams || {};

			// Calculated Values
			alive = true;

			// Graphics
			graphic = spec.graphic || TowerDefense.Graphics.particleImageFactory({
				src: spec.img,
				pos: pos,
				width: width,
				height: height,
				rotation: rotation
			});
		}

		var update = function(elapsedTime) {
			var changes;
			if (alive) {
				timeToLive -= elapsedTime;
				if (timeToLive < 0) {
					timeToLive = 0;
					alive = false;
					return;
				}

				changes = that.evolve(elapsedTime, that, that.evolveParams);
				pos = changes.pos;
				rotation = changes.rotation;
				width = changes.width;
				height = changes.height;
				graphic.moveTo(pos);
				graphic.setHeight(height);
				graphic.setWidth(width);
				graphic.setRotation(rotation);
			}
		}

		var render = function() {
			if (alive) {
				graphic.draw();
			}
		}

		var isDead = function() {
			return !alive;
		}

		var getPos = function() {
			return pos;
		}

		var getRotation = function() {
			return rotation;
		}

		var getWidth = function() {
			return width;
		}

		var getHeight = function() {
			return height;
		}

		var getTimeToLive = function() {
			return timeToLive;
		}

		that = {
			init: init,
			update: update,
			render: render,
			isDead: isDead,
			evolve: that.evolve,
			evolveParams: that.evolveParams,
			getPos: getPos,
			getRotation: getRotation,
			getWidth: getWidth,
			getHeight: getHeight,
			getTimeToLive: getTimeToLive
		}
		return that;
	}

	var creepExplosionEffect = function(pos) {
		var particleDirection,
			particleSpeed,
			tempParticle;

		for (var i = 0; i < 3; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = 0.01;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/smoke.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 20 + Math.random() - 0.5,
				height: 20 + Math.random() - 0.5,
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
	}

	var towerSellEffect = function(pos) {
		var particleDirection,
			particleSpeed,
			tempParticle;

		for (var i = 0; i < 10; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = 0.01;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/smoke.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 30 + Math.random() - 0.5,
				height: 30 + Math.random() - 0.5,
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
	}

	var missileTrailEffect = function(missile) {
		var tempParticle;

		for (var i = 0; i < 3; ++i) {
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/smoke.png',
				pos: missile.getPos(),
				rotation: Math.random() * 2 * Math.PI,
				width: 5 + Math.random() - 0.5,
				height: 5 + Math.random() - 0.5,
				timeToLive: 500,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: missile.getDirection() + Math.PI,
					speed: Math.random() * 0.1
				}
			});
			particles.push(tempParticle);
		}

		tempParticle = particleFactory();
		tempParticle.init({
			img: 'images/fire.png',
			pos: missile.getPos(),
			rotation: Math.random() * 2 * Math.PI,
			width: 10 + Math.random() - 0.5,
			height: 10 + Math.random() - 0.5,
			timeToLive: 5,
			evolve: (function(elapsedTime, obj, params) {
				return {
					pos: {
						x: params.position.x + params.speed * elapsedTime * Math.cos(params.direction),
						y: params.position.y + params.speed * elapsedTime * Math.sin(params.direction)
					},
					rotation: obj.getRotation() + 0.1,
					width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
					height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
				};
			}),
			evolveParams: {
				direction: missile.getDirection() + Math.PI,
				position: missile.getPos(),
				speed: 0.001
			}
		});
		particles.push(tempParticle);
	}

	var missileExplosionEffect = function(pos) {
		var particleDirection,
			particleSpeed,
			tempParticle;

		for (var i = 0; i < 5; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = Math.random() * 0.02;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/fire.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 10 + 10 * Math.random(),
				height: 10 + 10 * Math.random(),
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
			for (var i = 0; i < 5; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = Math.random() * 0.05;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/smoke.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 30 + 10 * (Math.random() - 0.5),
				height: 30 + 10 * (Math.random() - 0.5),
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
	}

	var grenadeTrailEffect = function(pos) {
		var tempParticle;

		tempParticle = particleFactory();
		tempParticle.init({
			img: 'images/fire.png',
			pos: pos,
			rotation: Math.random() * 2 * Math.PI,
			width: 5 + (Math.random() - 0.8) * 5,
			height: 5 + (Math.random() - 0.8) * 5,
			timeToLive: 500,
			evolve: (function(elapsedTime, obj, params) {
				return {
					pos: {
						x: params.position.x + 0.005,
						y: params.position.y - 0.005
					},
					rotation: obj.getRotation() + 0.1,
					width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
					height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
				};
			}),
			evolveParams: {
				position: pos,
			}
		});
		particles.push(tempParticle);
	}

	var grenadeExplosionEffect = function(pos) {
		var particleDirection,
			particleSpeed,
			tempParticle;

		for (var i = 0; i < 5; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = Math.random() * 0.02;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/fire.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 10 + 10 * Math.random(),
				height: 10 + 10 * Math.random(),
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
			for (var i = 0; i < 5; ++i) {
			particleDirection = Math.random() * 2 * Math.PI;
			particleSpeed = Math.random() * 0.05;
			tempParticle = particleFactory();
			tempParticle.init({
				img: 'images/smoke.png',
				pos: pos,
				rotation: Math.random() * 2 * Math.PI,
				width: 30 + 10 * (Math.random() - 0.5),
				height: 30 + 10 * (Math.random() - 0.5),
				timeToLive: 1000,
				evolve: (function(elapsedTime, obj, params) {
					return {
						pos: {
							x: obj.getPos().x + params.speed * elapsedTime * Math.cos(params.direction),
							y: obj.getPos().y + params.speed * elapsedTime * Math.sin(params.direction)
						},
						rotation: obj.getRotation() + 0.1,
						width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
						height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
					};
				}),
				evolveParams: {
					direction: particleDirection,
					speed: particleSpeed
				}
			});
			particles.push(tempParticle);
		}
	}

	var creepScoreEffect = function(pos, score) {
		var tempParticle = particleFactory(),
			textGraphic;

		textGraphic = TowerDefense.Graphics.textFactory({
			text: '10',
			font: '10px Arial',
			fill: '#FEFEFE',
			pos: {
				x: pos.x,
				y: pos.y
			}
		});

		tempParticle.init({
			pos: pos,
			graphic: textGraphic,
			width: 10,
			height: 8,
			rotation: 0,
			timeToLive: 1000,
			evolve: (function(elapsedTime, obj, params) {
				return {
					pos: {
						x: obj.getPos().x,
						y: obj.getPos().y - (0.01 * elapsedTime * (1 - 1 / obj.getTimeToLive())) 
					},
					rotation: obj.getRotation() + 0.1,
					width: obj.getWidth() * (1 - 1 / obj.getTimeToLive()),
					height: obj.getHeight() * (1 - 1 / obj.getTimeToLive())
				};
			})
		});
		particles.push(tempParticle);
	}

	var init = function() {
		particles = [];
	}

	var update = function(elapsedTime) {
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].update(elapsedTime);
			// console.log('--------' + i + '-------');
			if (particles[i].isDead()) {
				particles.splice(i, 1);
			}
		}
	}

	var render = function() {
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].render();
		}
	}

	return {
		init: init,
		update: update,
		render: render,
		creepScoreEffect: creepScoreEffect,
		creepExplosionEffect: creepExplosionEffect,
		towerSellEffect: towerSellEffect,
		missileTrailEffect: missileTrailEffect,
		missileExplosionEffect: missileExplosionEffect,
		grenadeTrailEffect: grenadeTrailEffect,
		grenadeExplosionEffect: grenadeExplosionEffect
	}
}());
