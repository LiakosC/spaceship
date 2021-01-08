var UnitEnemy = function(x, y) {
	Unit.call(this, x, y);
	var THIS = this;
	
	//this.textureSprite.loadTexture("units/earth_aircraft/texture.png");
	this.setScale(1);
	this.setTexture("units/earth_aircraft/texture.png");
	
	this.name = "Enemy";
	this.team = game.TEAM_ENEMY;
	this.hp	= 100;
	this.hpMax = 100;
	this.movementSpeed = 120;
	this.rotationSpeed = 2;
	
	this.mayCollideWorld = false;
	
	this.die = function() {
		Unit.prototype.die.call(this);
		this.removalTimer.restart(1000);
		var enemiesCount = 0;
		for (var key in game.group_units.children) {
			var unit = game.group_units.children[key];
			if (unit.team == game.TEAM_ENEMY && unit.alive)
				enemiesCount++;
		}
		if (enemiesCount == 0) {
			game.victory();	
		}
	};
	
	this.spells["fire"] = new Spell(this);
	this.spells["fire"].cd = 0;
	this.spells["fire"].cdMax = 0;
	this.spells["fire"].onCast = function(unit, x, y) {
		//var x = ph.world.width/2 - THIS.g2Point().x;
		//var y = ph.world.height/2 - THIS.g2Point().y;
		//x = x/100;
		//y = y/100;
		//THIS.blastSound.pos(x, y, 0);
		//THIS.blastSound.play();
		var bullet = new EnemyBullet(THIS);
		bullet.setXY(unit.g2Point().x, unit.g2Point().y);
		bullet.setAngle(unit.getAngle());
		bullet.moveToAngle(bullet.getAngle());
	};
	
	this.remove = function() {
		Unit.prototype.remove.call(this);
		console.log("removing enemy");
	};
};
UnitEnemy.prototype = Object.create(Unit.prototype);
UnitEnemy.prototype.constructor = UnitEnemy;