game.preload = function() {

	ph.load.image("terrain/stars/texture.png", "include/graphics/terrain/stars/texture.png");
	ph.load.image("units/hero/texture.png", "include/graphics/units/hero/texture.png");
	ph.load.image("units/earth_aircraft/texture.png", "include/graphics/units/earth_aircraft/texture.png");

	ph.load.image("things/missiles/aircraft.png", "include/graphics/things/missiles/aircraft.png");
	ph.load.image("things/missiles/0.png", "include/graphics/things/missiles/0.png");

	ph.load.audio('background_music', ['include/sounds/background_music.mp3', 'include/sounds/background_music.ogg']);
	ph.load.audio('fire', ['include/sounds/fire.mp3', 'include/sounds/fire.ogg']);

	ph.load.spritesheet("effects/explosion/texture.png", "include/graphics/effects/explosion/texture.png", 320/5, 320/5, 23);
	ph.load.spritesheet("things/missiles/red/spritesheet.png", "include/graphics/things/missiles/red/spritesheet.png", 150/3, 92/2, 6);
};