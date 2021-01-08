// UnitHero extends Unit

var UnitHero = function(x, y) {
	Unit.call(this, x, y);
	var THIS = this;
	
	this.setScale(1);
	this.setTexture("units/hero/texture.png");
	
	this.name = "Hero";
	this.team = game.TEAM_ALLY;
	this.hp	= 100;
	this.hpMax = 100;
	this.movementSpeed = 250;
	this.rotationSpeed = 2;
	
	this.collidesWorld = function() {
		return true;
	}
	
	if (game.player.unit != null)
		game.player.unit.remove();
	game.player.unit = this;
	ph.camera.follow(this.pointSprite);
	
	this.die = function() {
		Unit.prototype.die.call(this);
		game.defeat();
	};
	
	this.anims["die"] = function() {
		/*
		*/
		var tween = ph.add.tween(THIS.textureSprite).to({alpha:0}, game.tweenFixedDuration(1000));
		var tween2 = ph.add.tween(THIS.textureSprite.scale).to({x:0.5, y:0.5}, game.tweenFixedDuration(1000));
		THIS.animTweens.push(tween);
		THIS.animTweens.push(tween2);
		tween.start();
		tween2.start();
		THIS.fallSound.play();
		tween.onComplete.addOnce(function() {
			THIS.textureSprite.loadTexture("effects/explosion/texture.png");
			THIS.textureSprite.animations.add(0);
			THIS.textureSprite.animations.play(0, 30, false, true);
			THIS.textureSprite.alpha = 1;
			THIS.fallSound.stop();
			THIS.explosionSound.play();
		});
		tween2.onComplete.addOnce(function() {
			THIS.textureSprite.scale.setTo(1.2, 1.2);
		});
	};
	
	this.blastSound = new Howl({
		src: sp.fireSound
	});
	this.fallSound = new Howl({
		src: sp.heroFall
	});
	this.explosionSound = new Howl({
		src: sp.heroExplosion,
		volume: 0.3
	});
	//this.blastSound.pos(100,0,0);
	
	this.spells["fire"] = new Spell(this);
	this.spells["fire"].cd = 200;
	this.spells["fire"].cdMax = 100;
	this.spells["fire"].onCast = function(unit, x, y) {
		//var x = ph.world.width/2 - THIS.g2Point().x;
		//var y = ph.world.height/2 - THIS.g2Point().y;
		//x = x/100;
		//y = y/100;
		//THIS.blastSound.pos(x, y, 0);
		THIS.blastSound.play();
		var frontVector = g2.Vector_PAS(THIS.g2Point(), THIS.getAngle(), 30);
		var left = g2.Vector_PAS(frontVector.p2(), frontVector.angle - Math.PI/2, 20);
		var right = g2.Vector_PAS(frontVector.p2(), frontVector.angle + Math.PI/2, 20);
		var leftBullet = new HeroBullet(THIS);
		leftBullet.setXY(left.p2().x, left.p2().y);
		leftBullet.setAngle(THIS.getAngle());
		leftBullet.moveToAngle(THIS.getAngle());
		var rightBullet = new HeroBullet(THIS);
		rightBullet.setXY(right.p2().x, right.p2().y);
		rightBullet.setAngle(THIS.getAngle());
		rightBullet.moveToAngle(THIS.getAngle());
		//bullet.movementSpeed = 500;
	};
	
	this.remove = function() {
		Unit.prototype.remove.call(this);
		game.player.unit = null;
		console.log("removing hero");
	};
};
UnitHero.prototype = Object.create(Unit.prototype);
UnitHero.prototype.constructor = UnitHero;