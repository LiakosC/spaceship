game.update = function(delta) {
	
	/* units */
	for (var key in game.group_units.children) {
		var unit = game.group_units.children[key];
		unit.update(delta);
	}
	
	/* missiles */
		
	for (var key in game.group_missiles.children) {
		var missile = game.group_missiles.children[key];
		missile.update(delta);
	}
	
	
	/* input */
	if (game.player.unit != null) {
			var mouseAngle = g2.pointsAngle(game.player.unit.g2Point(), g2.P(ph.input.worldX, ph.input.worldY));
			game.player.unit.cast_turn(mouseAngle);
			//game.player.unit.rotateToAngle(mouseAngle);
		if (ph.input.activePointer.leftButton.isDown) {
			game.player.unit.spells["fire"].cast(game.player.unit, ph.input.mouse.worldX, ph.input.mouse.worldY);
		}
	}
	
	//console.log(mouseAngle, game.player.unit.getAngle());
};