var Entity = function() {
	GroupChild.call(this);
	var THIS = this;
	
	this.class = Entity.class_Entity;
	
	this.pointSprite = ph.add.sprite(null, 0, 0);
	this.pointSprite.anchor.setTo(0.5, 0.5);

	this.textureSprite = ph.add.sprite(null, 0, 0);
	this.textureSprite.anchor.setTo(0.5, 0.5);
	
	this.pointSprite.addChild(this.textureSprite);
	
	
	
	this.playAnim = function(str) {
		if (this.anims[str] != null) 
			this.anims[str]();
	};
	this.animTweens = [];
	this.anims = {};
	
	this.playSound = function(str) {
		if (this.sounds[str] != null) 
			this.sounds[str]();
	};
	this.soundIDs = {}; // howler ids so some sounds can stop. maybe not needed
	this.sounds = {}; // sound void functions
	
	this._textureWidth = 0;
	this._textureHeight = 0;
	this.setTexture = function(texturePath) {
		this.textureSprite.loadTexture(texturePath);
		this._textureWidth = this.textureSprite.width;
		this._textureHeight = this.textureSprite.height;
		this.anims["texture"] = function() {
			for (var i=0; i<THIS.animTweens.length; i++) {
				THIS.animTweens[i].stop();
			}
			THIS.animTweens = [];
			THIS.textureSprite.loadTexture(texturePath);
			THIS.textureSprite.reset();
			THIS.textureSprite.alpha = 1;
			THIS.textureSprite.scale.setTo(THIS.scale);
		};
		this.playAnim("texture");
	};
	
	this.scale = 1; // RO. used to reset tweens 
	this.setScale = function(scale) {
		this.scale = scale;
	};
	
	
	this.setXY = function(x, y) {
		this.pointSprite.x = x;
		this.pointSprite.y = y;
	}
	this.addXY = function(dx, dy) {
		this.pointSprite.x += dx;
		this.pointSprite.y += dy;
	}
	this.setAngle = function(angle) {
		//angle = angle % (Math.PI * 2);
		//if (angle < 0) angle += 2*Math.PI;
		//if (angle < 0) angle += 2*Math.PI;
		//console.log("angle set", angle);
		this.textureSprite.rotation = angle;
	}
	//this.setAngle(0);
	this.getAngle = function() {
		var angle = this.textureSprite.rotation;
		//angle = angle % (Math.PI * 2);
		//if (angle < 0) angle += 2*Math.PI;
		//angle = g2.angle_02PI(angle);
		//console.log(angle);
		return angle;
	}
	this.g2Point = function() {return g2.P(this.pointSprite.x, this.pointSprite.y);}
	this.g2Rect = function() {return g2.Rect_CS(this.g2Point(), this._textureWidth, this._textureHeight);}
	
	
	/* future physics api */
	this.moveVectors = {
		"movement": g2.Vector_AS(0, 0)
	};
	this.rotateVectors = {
		"rotation": 0
	};
	this.forceVectors = {
		
	};
	this.totalMoveVector = function() {
		var dx = 0, dy = 0;
		for (var key in this.moveVectors) {
			dx += this.moveVectors[key].dx();
			dy += this.moveVectors[key].dy();
		} return g2.Vector(dx, dy);
	}
	this.totalRotateVector = function() {
		var w = 0;
		for (var key in this.rotateVectors) {
			w += this.rotateVectors[key];
		} return w;
	}
	/* future physics api */
	
	
	
	
	/* plan 2D mover */
	this.movementSpeed = 300;
	this.rotationSpeed = 1;
	
	this._movingPoint = g2.Point(0,0);
	this._movingToPoint = false;
	this._movingAngle = 0;
	this._movingToAngle = false;
	
	this._rotatingAngle = 0;
	this._rotatingToAngle = false;
	this._rotatingDelta = 0;
	this._rotatingToDelta = false;
	
	this.isMoving = function() {
		return (this._movingToPoint || this._movingToAngle);
	};
	this.isRotating = function() {
		return (this._rotatingToAngle || this._rotatingToDelta);
	};
	this.stopMoving = function() {
		this._movingToPoint = false;
		this._movingToAngle = false;
	};
	this.stopRotating = function() {
		this._rotatingToAngle = false;
		this._rotatingToDelta = false;
	};
	this.moveToPoint = function(g2Point) {
		this._movingToPoint = true;
		this._movingToAngle = false;
		this._movingPoint = g2Point;
	};
	this.moveToAngle = function(angle) {
		this._movingToAngle = true;
		this._movingToPoint = false;
		this._movingAngle = angle;
	};
	this.rotateToAngle = function(angle) {
		//this._rotatingToAngle = true;
		//this._rotatingToDelta = false;
		//this._rotatingAngle = angle;
		this.setAngle(angle);
	};
	this.rotateToDelta = function(delta /* -1, 0, 1*/) {
		this._rotatingToAngle = false;
		this._rotatingToDelta = false;
		this._rotatingDelta = delta;
	};
	
	this.getMovingVector = function(ms) {
		if (this.isMoving() == false) {
			return g2.Vector_AS(0, 0);
		} else {
			var vectorSize = this.movementSpeed * ms/1000;
			if (this._movingToAngle == true) {
				return g2.Vector_AS(this._movingAngle, vectorSize);
			} else if (this._movingToPoint == true) {
				var dest = g2.pointsDistance(this.g2Point(), this._movingPoint);
				var angle = g2.pointsAngle(this.g2Point(), this._movingPoint);
				if (dest < vectorSize)
					return g2.Vector_AS(angle, dest);
				else
					return g2.Vector_AS(angle, vectorSize);
			}
		}
	};
	this.getRotatingAngle = function(ms) {
		return 0;
		//return this._rotatingAngle - this.getAngle();
		if (this.isRotating() == false) {
			return 0;
		} else {
			var dw = this.rotationSpeed * ms/1000; // dw: rads every deltaMS
			if (this._rotatingToDelta == true) {
				return dw * this._rotatingDelta;
			} else if (this._rotatingToAngle == true) {
				var angleD = g2.angleBetweenAngles(this.getAngle(), this._rotatingAngle);
				//if (Math.abs(angleD) < dw) {
				//	angleD = angleD / Math.abs(angleD) * dw;
				//}
				return angleD;
				/* https://math.stackexchange.com/questions/1366869/calculating-rotation-direction-between-two-angles 
				var angleD = this._rotatingAngle - this.getAngle();
				var angleD = g2.angleBetweenAngles(this.getAngle(), this._rotatingAngle);
				var turn;
				if (-Math.PI < angleD <= Math.PI) {
					turn = angleD;
				} else if (angleD > Math.PI) {
					turn = angleD - 2*Math.PI;
				} else if (angleD <= -Math.PI) {
					turn = angleD + 2*Math.PI;
				}
				var delta = (turn > 0) ? 1 : -1;
				
				var remainingAngle = Math.abs(angleD);
				if (dw > remainingAngle)
					dw = remainingAngle;
				console.log(this.getAngle());
				return dw * delta;
				 https://math.stackexchange.com/questions/1366869/calculating-rotation-direction-between-two-angles */
				
				
				
				 /* THANOS 
				//calculate angle (new-old)
				var angleD = this._rotatingAngle - this.getAngle();
				//fix angle difference when it's bigger than PI
				if (angleD < -Math.PI) {
					angleD = angleD + 2*Math.PI;
				} else if (angleD > Math.PI) {
					angleD = angleD - 2*Math.PI;
				}
				var remainingAngle = Math.abs(angleD);
				if (dw > remainingAngle)
					dw = remainingAngle;
				var delta = (angleD < 0) ? 1 : -1;
				return dw * delta;
				//rotate right if angleD<0, left otherwise by ammount of Math.abs(angleD)
				THANOS */
			} else {
				return 0;
			}
		}
	};
	/* plan 2D mover */
	
	
	
	
	
	
	
	
	
	
	
	
	this._destroyTextures = function() {
		this.pointSprite.destroy();
	};
	
	
	this.collidesWorld = function() {
		return false;
	}
	
	this._entityUpdateMoves = function(delta) {
		/* move */
		var vector = this.getMovingVector(delta);
		this.addXY(vector.dx(), vector.dy());
		var rect = this.g2Rect();
		if (this.collidesWorld()) {
			if (rect.left < 0 || rect.right > ph.world.width || rect.top < 0 || rect.bot > ph.world.height) {
				this.addXY(-vector.dx(), -vector.dy());
			}
		}
		/* rotate */
		//var angle = this.getRotatingAngle(delta);
		//if (angle == null) angle = 0;
		//this.setAngle(this.getAngle() + angle);
	};
};
Entity.prototype = Object.create(GroupChild.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.update = function(delta) {
	this._entityUpdateMoves(delta);
};

Entity.prototype.remove = function() {
	console.log("removing entity");
	this._destroyTextures();
};



