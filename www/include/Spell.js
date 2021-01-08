var Spell = function(casterUnit) {
	this.unit = casterUnit;
	this.cd = 1000;
	this.cdMax = 1000;
	this.update = function(ms) {
		this.cd -= ms;
	};
	this.onCast = function(x, y) {
		
	};
	this.cast = function(x, y) {
		if (this.unit.alive && this.cd <= 0) {
			this.onCast(x, y);
			this.cd = this.cdMax;
		}
	};
};