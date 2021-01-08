var Timer = function() {
	GroupChild.call(this);
	var THIS = this;
	
	this._cd = 1000;
	this._cdMax = 1000;
	this._on = false;
	
	this.setCountdown = function(cd) {
		this._cd = cd;
		this._cdMax = cd;
		//console.log("countdown", cd);
	};
	this.start = function() {
		this._on = true;
	};
	this.stop = function() {
		this._on = false;
		this._cd = this._cdMax;
	};
	this.pause = function() {
		this._on = false;
	};
	this.isRunning = function() {
		return this._on;
	};
	this.restart = function() {
		this._on = true;
		this._cd = this._cdMax;
		//console.log("restart", this._cd, this._on);
	};
	
	this.callback = function() {};
	
	this.update = function(ms) {
		if (this._on) {
			this._cd -= ms;
			if (this._cd < 0) {
				this._on = false;
				this.callback();
			}
		}
	};
	
	this.remove = function() {
		this.group_remove();
	};
	
	//game.group_timers.add(this);
};
Timer.prototype = Object.create(GroupChild.prototype);
Timer.prototype.constructor = Timer;

Timer.timeout = function(ms, callback) {
	var tmr = new Timer();
	tmr.setCountdown(ms);
	tmr.start();
	tmr.callback = function() {
		callback();
	};
	return tmr;
};