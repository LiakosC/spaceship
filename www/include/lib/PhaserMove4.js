
/*

1/9/17

var move4 = new PhaserMove4(up, right, down, left); // phaser keyboard
move4.callback = function() {
	// move4.direction == -1 or 0-7
	// move4.deltaX or .deltaY is -1, 0, +1
	// move4.deltaFactor is 0.707 or 1
	// move4.rads is the moving angle. if stopped, it's 0
}
*/

var PhaserMove4 = function(phKey_up, phKey_right, phKey_down, phKey_left) {
	
	var THIS = this;
	
	this.phKey_up = phKey_up;
	this.phKey_right = phKey_right;
	this.phKey_down = phKey_down;
	this.phKey_left = phKey_left;
	
	var SQR2DIV2 = 0.707;
	this.direction = -1; // -1 for stop | 0 to 7 for directions
	this.deltaX = 0;
	this.deltaY = 0;
	this.deltaFactor = 1;
	this.rads = 0; // 0 for stop | rads for moving
	
	this.callback = function() {} // editable callback
	
	this.update = function() {
		var filter = [THIS.phKey_up.isDown, THIS.phKey_right.isDown, THIS.phKey_down.isDown, THIS.phKey_left.isDown];
		if (filter[0] && filter[2]) {
			filter[0] = false;
			filter[2] = false;
		}
		if (filter[1] && filter[3]) {
			filter[1] = false;
			filter[3] = false;
		}
		
		if (filter[0] && filter[1]) {
			THIS.direction = 1;
			THIS.deltaX = +1;
			THIS.deltaY = -1;
			THIS.deltaFactor = SQR2DIV2;
			THIS.rads = -Math.PI/4;
		} else if (filter[1] && filter[2]) {
			THIS.direction = 3;
			THIS.deltaX = +1;
			THIS.deltaY = +1;
			THIS.deltaFactor = SQR2DIV2;
			THIS.rads = +Math.PI/4;
		} else if (filter[2] && filter[3]) {
			THIS.direction = 5;
			THIS.deltaX = -1;
			THIS.deltaY = +1;
			THIS.deltaFactor = SQR2DIV2;
			THIS.rads = +3*Math.PI/4;
		} else if (filter[3] && filter[0]) {
			THIS.direction = 7;
			THIS.deltaX = -1;
			THIS.deltaY = -1;
			THIS.deltaFactor = SQR2DIV2;
			THIS.rads = -3*Math.PI/4;
		} else if (filter[0]) {
			THIS.direction = 0;
			THIS.deltaX = 0;
			THIS.deltaY = -1;
			THIS.deltaFactor = 1;
			THIS.rads = -Math.PI/2;
		} else if (filter[1]) {
			THIS.direction = 2;
			THIS.deltaX = +1;
			THIS.deltaY = 0;
			THIS.deltaFactor = 1;
			THIS.rads = 0;
		} else if (filter[2]) {
			THIS.direction = 4;
			THIS.deltaX = 0;
			THIS.deltaY = +1;
			THIS.deltaFactor = 1;
			THIS.rads = +Math.PI/2;
		} else if (filter[3]) {
			THIS.direction = 6;
			THIS.deltaX = -1;
			THIS.deltaY = 0;
			THIS.deltaFactor = 1;
			THIS.rads = Math.PI;
		} else {
			THIS.direction = -1;
			THIS.deltaX = 0;
			THIS.deltaY = 0;
			THIS.deltaFactor = 1;
			THIS.rads = 0;
		}
		THIS.callback();
	}
	
	this.phKey_up.onDown.add(THIS.update);
	this.phKey_right.onDown.add(this.update);
	this.phKey_down.onDown.add(this.update);
	this.phKey_left.onDown.add(this.update);
	
	this.phKey_up.onUp.add(this.update);
	this.phKey_right.onUp.add(this.update);
	this.phKey_down.onUp.add(this.update);
	this.phKey_left.onUp.add(this.update);
	
	this.destroy = function() {
		THIS.phKey_up.onDown.remove(this.update);
		THIS.phKey_right.onDown.remove(this.update);
		THIS.phKey_down.onDown.remove(this.update);
		THIS.phKey_left.onDown.remove(this.update);
		
		THIS.phKey_up.onUp.remove(this.update);
		THIS.phKey_right.onUp.remove(this.update);
		THIS.phKey_down.onUp.remove(this.update);
		THIS.phKey_left.onUp.remove(this.update);
	}
	
}