var AI = function(unit) {
	GroupChild.call(this);
	var THIS = this;
	this.unit = unit;
	
	this._heroIsAlive = function() {
		if (game.player.unit != null) {
			return game.player.unit.alive;
		} return false;
	};
	this._getHero = function() {
		return game.player.unit;
	};
	
	this.update = function(delta) {
		// timer is updated in game.group_timers group
	};
	
	this.remove = function() {
		this.unit = null;
	}
};
AI.prototype = Object.create(GroupChild.prototype);
AI.prototype.constructor = AI;

AI_StandardShooter = function(unit, circle, rps) {
	AI.call(this, unit);
	var THIS = this;
	
	
	var moveTimer = Timer.timeout(0, function() {
		unit.cast_moveToPoint(g2.rndCirclePoint(circle));
		moveTimer.setCountdown(g2.rndReal(600, 1800));
		moveTimer.restart();
	});
	
	var fireTimer = new Timer();
	fireTimer.setCountdown(0);
	fireTimer.callback = function() {
		var nextInterval = g2.rndReal(700, 1300) / rps;
		unit.spells["fire"].cast(unit);
		fireTimer.setCountdown(nextInterval);
		fireTimer.restart();
	};
	
	var lookTimer = Timer.timeout(0, function() {
		if (THIS._heroIsAlive()) {
			var toheroAngle = g2.pointsAngle(unit.g2Point(), THIS._getHero().g2Point());
			var angleError = Math.PI * 0.15;
			unit.setAngle(g2.rndReal(toheroAngle - angleError, toheroAngle + angleError));
			fireTimer.start();			
		} else {
			fireTimer.stop();
		}
		lookTimer.setCountdown(400);
		lookTimer.restart();
	});
	
	this.update = function(delta) {
		moveTimer.update(delta);
		fireTimer.update(delta);
		lookTimer.update(delta);
	};
};
AI_StandardShooter.prototype = Object.create(AI.prototype);
AI_StandardShooter.prototype.constructor = AI_StandardShooter;