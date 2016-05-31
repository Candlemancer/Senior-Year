// Jonathan Petersen
// A01236750
// Midterm Code - Prewritten
// Adapted from Dean Mathias' Example Code

TowerDefense.AnimatedObjects = (function(graphics) {
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// Parameters
	//  spec 		- Data for spriteFactory
	//  rotateRate  - unused
	//  rotation    - angle from 0 to rotate
	//  speed 		- how fast the image is moving
	// 	pos			- (x,y) center position
	////////////////////////////////////////////////////////////////////////////////////////////////
	function AnimatedModel(spec) {
		var that = {},
			sprite = graphics.spriteFactory(spec);
			// We contain a spriteFactory, not inherited from, big difference
			
		that.update = function(elapsedTime) {
			sprite.update(elapsedTime);
		};
		
		that.render = function() {
			sprite.draw();
		};
		
		that.rotateRight = function(elapsedTime) {
			spec.rotation += spec.rotateRate * (elapsedTime);
		};
		
		that.rotateLeft = function(elapsedTime) {
			spec.rotation -= spec.rotateRate * (elapsedTime);
		};
		
		that.setRotation = function(angle) {
			spec.rotation = angle;
		}

		that.draw = function() {
			sprite.draw();
		}

		// //------------------------------------------------------------------
		// //
		// // Move in the direction the sprite is facing
		// //
		// //------------------------------------------------------------------
		// that.moveForward = function(elapsedTime) {
		// 	spec.pos.x += (Math.cos(spec.rotation) * spec.speed * elapsedTime);
		// 	spec.pos.y += (Math.sin(spec.rotation) * spec.speed * elapsedTime);
		// };
		
		// //------------------------------------------------------------------
		// //
		// // Move in the negative direction the sprite is facing
		// //
		// //------------------------------------------------------------------
		// that.moveBackward = function(elapsedTime) {
		// 	spec.pos.x -= (Math.cos(spec.rotation) * spec.speed * elapsedTime);
		// 	spec.pos.y -= (Math.sin(spec.rotation) * spec.speed * elapsedTime);

		// };

		that.moveTo = function(pos) {
			spec.pos.x = pos.x;
			spec.pos.y = pos.y;
		}
		
		return that;
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// Parameters
	//  spec 		- Data for spriteFactory
	//  rotateRate  - unused
	//  rotation    - angle from 0 to rotate
	//  speed 		- how fast the image is moving
	// 	pos			- (x,y) center position
	////////////////////////////////////////////////////////////////////////////////////////////////
	function AnimatedMoveModel(spec) {
		var that = AnimatedModel(spec),	// Inherit from AnimatedModel
			base = {
				// moveForward : that.moveForward,
				// moveBackward : that.moveBackward,
				moveTo: that.moveTo,
				rotateRight : that.rotateRight,
				rotateLeft : that.rotateLeft,
				update : that.update
			},
			didMoveForward = false,
			didMoveBackward = false;
			
		//------------------------------------------------------------------
		//
		// Replacing the update function from the base object.  In this update
		// we check to see if any movement was performed, if so, then the animation
		// is updated.
		//
		//------------------------------------------------------------------
		that.update = function(elapsedTime) {
			if (didMoveForward === true) {
				base.update(elapsedTime, true);
			} else if (didMoveBackward === true) {
				base.update(elapsedTime, false);
			}
			
			didMoveForward = false;
			didMoveBackward = false;
		};
		
		// that.moveForward = function(elapsedTime) {
		// 	base.moveForward(elapsedTime);
		// 	didMoveForward = true;
		// };
		
		// that.moveBackward = function(elapsedTime) {
		// 	base.moveBackward(elapsedTime);
		// 	didMoveBackward = true;
		// };

		that.moveTo = function(pos) {
			base.moveTo(pos);
			didMoveForward = true;
		}

		
		that.setRotation = function(angle) {
			spec.rotation = angle;
			didMoveForward = true;
		}

		that.rotateRight = function(elapsedTime) {
			base.rotateRight(elapsedTime);
			didMoveForward = true;
		};
		
		that.rotateLeft = function(elapsedTime) {
			base.rotateLeft(elapsedTime);
			didMoveForward = true;
		};
		
		return that;
	}
	
	return {
		AnimatedModel : AnimatedModel,
		AnimatedMoveModel : AnimatedMoveModel
	};

}(TowerDefense.Graphics));
