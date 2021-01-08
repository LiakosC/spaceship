var Missile = function(unit) {
	Entity.call(this);
	var THIS = this;
	this.setScale(0.4);
	this.setTexture("things/missiles/0.png");
	
	this.unit = unit;
	this.movementSpeed = 1000;
	this.active = true;
	this.damage = 10;
	
	this.g2Sector = function() {
		//console.log(THIS.textureSprite.width, THIS.textureSprite.height);	
		var upperVector = g2.Vector_PAS(THIS.g2Point(), THIS.getAngle(), THIS.textureSprite.width/2);
		//console.log(upperVector);
		var downVector = g2.Vector_PAS(THIS.g2Point(), THIS.getAngle() + Math.PI, THIS.textureSprite.width/2);
		var vector = g2.Vector_PP(downVector.p2(), upperVector.p2());
		return vector;
	};
	
	game.group_missiles.add(this);
	
	this.anims["explosion"] = function() {
		THIS.textureSprite.scale.setTo(0.8);
		THIS.textureSprite.loadTexture("effects/explosion/texture.png");
		THIS.textureSprite.animations.add(0);
		THIS.textureSprite.animations.play(0, 40, false, true);
	};
	
	this.sounds["impact"] = function() {
		THIS.impactSound.play();
	};
	
	this.impactSound = new Howl({
		src: sp.missileExplosion
	});
	
	
	this._getValidTarget = function() {
		for (var unitKey in game.group_units.children) {
			var unit = game.group_units.children[unitKey];
			if (unit != this.unit) { // if target is not the owner
				if (g2.pointOverRect(this.g2Point(), unit.g2Rect())) {
					return unit;
				}
			}
		} return null;
	};
	
	this.removalTimer = new Timer();
	this.removalTimer.callback = function() {
		//THIS.remove();
	};
	
	this._impactUpdate = function(delta) {
		if (this.active == true) { // when it explodes to a unit, active == false
			var target = this._getValidTarget();
			if (target != null) {
				if (target.alive) {
					target.setHP(target.hp - this.damage);
					if (target.hp <= 0)
						target.die();
					this.active = false;
					this.stopMoving();
					this.playSound("impact");
					this.playAnim("explosion");
				}
			}
		}	
	};
	
	this.update = function(delta) {
		Entity.prototype.update.call(this, delta);
		this._impactUpdate(delta);
		this.removalTimer.update(delta);
	};
};
Missile.prototype = Object.create(Entity.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.remove = function() {
	Entity.prototype.remove.call(this);
	console.log("removing missile");
	this.group_remove();
	this.unit = null;
};


var HeroBullet = function(unit) {
	Missile.call(this, unit);
	var THIS = this;
	
	this.damage = 10;
	this.movementSpeed = 400;
};

HeroBullet.prototype = Object.create(Missile.prototype);
HeroBullet.prototype.constructor = HeroBullet;

var EnemyBullet = function(unit) {
	Missile.call(this, unit);
	var THIS = this;

	this.setTexture("things/missiles/red/spritesheet.png");
	this.textureSprite.animations.add(0);
	this.textureSprite.animations.play(0, 20, true);
	
	this.damage = 10;
	this.movementSpeed = 250;
};

EnemyBullet.prototype = Object.create(Missile.prototype);
EnemyBullet.prototype.constructor = EnemyBullet;