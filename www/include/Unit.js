// Unit extends Entity

var Unit = function(x, y /*opt*/) {
	Entity.call(this);
	var THIS = this;
	
	if (x != null && y != null)
		this.setXY(x, y);
	
	this.name = "unit";
	this.team = game.TEAM_NEUTRAL;
	this.hp	= 100;
	this.hpMax = 100;
	this.movementSpeed = 100;
	this.rotationSpeed = 100;
	
	this.setHP = function(hp) {
		if (hp < 0) {this.hp = 0;}
		else if (hp > this.hpMax) {this.hp = this.hpMax;}
		else {this.hp = hp;}
	};
	this.alive = true;
	
	this.removalTimer = new Timer();
	this.removalTimer.callback = function() {
		THIS.remove();
	};
	
	this.ai = null;
	
	this.canMove = function() {
		if (this.alive)
			return true;
		else
			return false;
	};
	this.canRotate = function() {
		if (this.alive)
			return true;
		else
			return false;
	};
	
	this.cast_turn = function(angle) {
		if (this.canRotate()) {
			this.rotateToAngle(angle);
		}
	};
	this.cast_moveToPoint = function(point) {
		if (this.canMove()) {
			this.moveToPoint(point);
		}
	};
	this.cast_moveToAngle = function(angle) {
		if (this.canMove()) {
			this.moveToAngle(angle);
		}
	};
	
	this.spells = {};
	
	
	
	
	
	
	
	game.group_units.add(this);
};
Unit.prototype = Object.create(Entity.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function(delta) {
	Entity.prototype.update.call(this, delta);
	for (var spellKey in this.spells) {
		this.spells[spellKey].update(delta);
	}
	if (this.ai != null)
		this.ai.update(delta);
	this.removalTimer.update(delta);
};

Unit.prototype.die = function() {
	this.alive = false;
	this.stopMoving();
	this.playAnim("die");
};

Unit.prototype.remove = function() {
	Entity.prototype.remove.call(this);
	console.log("removing unit");
	if (this.ai != null)
		this.ai.remove();
	this.group_remove();
};

	
	
	
	//this.move = {
	//	speed: units[code].ms,
	//	stopSprite: PH.add.sprite(0, 0, ""),
	//	toXY: function(X, Y) {
	//		THIS.toXY_lockAngle(X, Y);
	//		THIS.sprite.rotation = PH.math.angleBetweenPoints({x: THIS.sprite.x, y: THIS.sprite.y}, {x: X, y: Y});
	//	},
	//	toXY_lockAngle: function(X, Y) {
	//		var angle = PH.math.angleBetweenPoints({x: THIS.sprite.x, y: THIS.sprite.y}, {x: X, y: Y});
	//		THIS.sprite.body.velocity.x = THIS.move.speed * Math.cos(angle);
	//		THIS.sprite.body.velocity.y = THIS.move.speed * Math.sin(angle);
	//		THIS.move.stopSprite.x = X;
	//		THIS.move.stopSprite.y = Y;
	//	},
	//	stop: function() {
	//		THIS.sprite.body.velocity.x = 0;
	//		THIS.sprite.body.velocity.y = 0;
	//		THIS.move.stopSprite.x = -1;
	//		THIS.move.stopSprite.y = -1;
	//	}
	//}
	//PH.physics.arcade.enable(this.move.stopSprite);
	//this.move.stopSprite.body.width = 0;
	//this.move.stopSprite.body.height = 0;
	//this.move.stopSprite.anchor.setTo(0.5, 0.5);
	
	
	
	//this.bar = {
	//	graphic: PH.add.graphics(),
	//	innerGraphic: PH.add.graphics(),
	//	width: 80, height: 10, offsetX: null, offsetY: null,
	//	borderColor: 0x000000,
	//	innerColor: 0xFF0004,
	//	innerOpacity: 0.5,
	//	update: function() {
	//		THIS.bar.graphic.clear();
	//		THIS.bar.innerGraphic.clear();
	//		THIS.bar.graphic.lineStyle(1, THIS.bar.borderColor, 1);
	//		THIS.bar.graphic.beginFill(0x000000, 1);
	//		THIS.bar.graphic.drawRect(0, 0, THIS.bar.width, THIS.bar.height);
	//		THIS.bar.innerGraphic.beginFill(THIS.bar.innerColor, THIS.bar.innerOpacity);
	//		THIS.bar.innerGraphic.drawRect(1, 1, THIS.bar.width * (THIS.hp/THIS.hpMax) - 1, THIS.bar.height - 1);
	//		THIS.bar.graphic.addChild(THIS.bar.innerGraphic);			
	//	},
	//	phaserUpdate: function() {
	//		THIS.bar.graphic.x = THIS.sprite.x + THIS.bar.offsetX;
	//		THIS.bar.graphic.y = THIS.sprite.y + THIS.bar.offsetY;
	//	}
	//}
	//this.bar.offsetX = - this.bar.width / 2;
	//this.bar.offsetY = - 50;
	//this.bar.update();
	
	
	
	//this.nameLabel = {
	//	text: PH.add.text(0, 0, this.name, {fontSize: "14px", fill: "#FFFFFF"}),
	//	update: function() {
	//		THIS.nameLabel.text.setText(THIS.name);
	//	},
	//	phaserUpdate: function() {
	//		THIS.nameLabel.text.position.x = THIS.sprite.x;
	//		THIS.nameLabel.text.position.y = THIS.sprite.y - 54;
	//	}
	//}
	//this.nameLabel.text.anchor.setTo(0.5);
	//this.nameLabel.text.visible = false;
	//this.nameLabel.text.setShadow(1, 1, 'rgba(0, 0, 0, 1)', 0);
	
	
	
	
	//this.sprite.inputEnabled = true;
	//this.sprite.events.onInputOver.add(function() {THIS.nameLabel.text.visible = true;});
	//this.sprite.events.onInputOut.add(function() {THIS.nameLabel.text.visible = false;});
	//this.sprite.events.onInputDown.add(function() {});
			
			
	//this.update = function() {
	//	this.nameLabel.update();
	//	this.bar.update();
	//	if (this.hp < 0) {this.hp = 0;}
	//}
	//this.phaserUpdate = function(ms) {
	//	this.nameLabel.phaserUpdate();
	//	this.bar.phaserUpdate();
	//	this.anim.phaserUpdate(); 
	//	PH.physics.arcade.overlap(THIS.sprite, THIS.move.stopSprite, function() {
	//		THIS.move.stop();
	//	}, null, this);
	//	
	//}
	/*
	this.ai = {
		patrol: {
			timer: null, x: null, y: null, r: null,
			set: function(x, y, r, interval) {
				THIS.ai.patrol.x = x;
				THIS.ai.patrol.y = y;
				THIS.ai.patrol.r = r;
				THIS.ai.patrol.timer = PH.time.create(false);
				THIS.ai.patrol.timer.start();
				THIS.ai.patrol.callback(interval);
			},
			callback: function(interval) {
				if (typeof THIS !== 'undefined') {
					if (THIS.isAlive == true) {
						var point = gaming.randomPointInCircle(THIS.ai.patrol.x, THIS.ai.patrol.y, THIS.ai.patrol.r);
						THIS.move.toXY_lockAngle(point.x, point.y);
						THIS.ai.patrol.timer.add(gaming.randomFloat(interval*0.2, interval*2.1), function() {THIS.ai.patrol.callback(interval);});
					}
				}
			}
		},
		target: { // angle | rotation
			timer: null, targetUnit: null, reflectionInterval: null, rotationSpeed: null, tween: null,
			set: function(targetUnit, reflectionInterval, rotationSpeed) {
				THIS.ai.target.targetUnit = targetUnit;
				THIS.ai.target.reflectionInterval = reflectionInterval;
				THIS.ai.target.rotationSpeed = rotationSpeed;
				THIS.ai.target.timer = PH.time.create(false);
				THIS.ai.target.timer.start();
				THIS.ai.target.callback(reflectionInterval);
			},
			callback: function(interval) {
				if (typeof THIS !== 'undefined') {
					if (THIS.isAlive == true) {
						var angle = gaming.pointsToAngle(THIS.sprite.x, THIS.sprite.y, THIS.ai.target.targetUnit.sprite.x, THIS.ai.target.targetUnit.sprite.y);
						var randomAngle = gaming.randomFloat(angle*0.85, angle*1.15);//console.log("angle: "+angle+", randomAngle: "+randomAngle);
						THIS.ai.target.tween = PH.add.tween(THIS.sprite).to({rotation:randomAngle}, 400, Phaser.Easing.Linear.None, true);
						var interval = gaming.randomInt(THIS.ai.target.reflectionInterval*0.9, THIS.ai.target.reflectionInterval*1.1);
						THIS.ai.target.timer.add(interval, function() {THIS.ai.target.callback(interval);});
					}
				}
			}
		},
		fire: {
			timer: null, cd: null, missile: null,
			set: function(missile, cd) {
				THIS.ai.fire.cd = cd;
				THIS.ai.fire.missile = missile;
				THIS.ai.fire.timer = PH.time.create(false);
				THIS.ai.fire.timer.start();
				THIS.ai.fire.callback(cd);
			},
			callback: function(interval) {
				if (typeof THIS !== 'undefined') {
					if (THIS.isAlive == true) {
						var missile = game.createMissileForUnit(THIS.ai.fire.missile, THIS.sprite.x, THIS.sprite.y, THIS, THIS.sprite.rotation);
						var interval = gaming.randomFloat(THIS.ai.fire.cd*0.6, THIS.ai.fire.cd*1.4);
						THIS.ai.fire.timer.add(interval, function() {THIS.ai.fire.callback(interval);});
					}
				}
			}
		}
	}
	this.setExpirationTime = function(interval) {
		PH.time.events.add(interval, function() {THIS.remove();});
	}
	this.remove = function() {
		this.bar.graphic.destroy();
		this.bar.innerGraphic.destroy();
		this.nameLabel.text.destroy();
		this.move.stopSprite.destroy();
		this.sprite.destroy();
		var id = game.units.indexOf(this);
		delete game.units[id];
		delete this;
	}
	*/