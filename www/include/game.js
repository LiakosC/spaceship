var game = {
	start: function() {
		console.log("game.start()");
		window.addEventListener("keydown", game.keydown);
		//game.phaserGroup_terrain = ph.add.tileSprite(0, 0, ph.world.width, ph.world.height, "terrain/stars/texture.png");
		//game.phaserGroup_terrain = ph.add.group();
		game.terrain = ph.add.tileSprite(0, 0, ph.world.width, ph.world.height, "terrain/stars/texture.png");
		game.keys = {
			up: ph.input.keyboard.addKey(Phaser.Keyboard.W),
			right: ph.input.keyboard.addKey(Phaser.Keyboard.D),
			down: ph.input.keyboard.addKey(Phaser.Keyboard.S),
			left: ph.input.keyboard.addKey(Phaser.Keyboard.A)
		};
		game.player = {
			unit: null,
			move4: new PhaserMove4(game.keys.up, game.keys.right, game.keys.down, game.keys.left)
		};
		game.player.move4.callback = function() {
			if (game.player.unit != null) {
				if (game.player.move4.direction == -1) {
					game.player.unit.stopMoving();
				} else {
					game.player.unit.cast_moveToAngle(game.player.move4.rads);
				}
			}
		};
		game.group_units = new Group();
		game.group_missiles = new Group();
	},
	clear: function() {
		console.log("game.clear()");
		window.removeEventListener("keydown", game.keydown);
		game.terrain.destroy();
		for (var key in game.group_units.children) {
			game.group_units.children[key].remove();
		}
		for (var key in game.group_missiles.children) {
			game.group_missiles.children[key].remove();
		}
		game.player.unit = null;
	},
	
	keydown: function(e) {
		//console.log(e);
		if (e.code == "Space") {
			
		}
	}
};

game.tweenFixedDuration = function(duration) {
	return duration * ph.time.desiredFps / 60;
};

game.TEAM_NEUTRAL = 0;
game.TEAM_ALLY = 1;
game.TEAM_ENEMY = 2;

game.MenuWindow = function() {
	var THIS = this;
	this.box = $("<div/>", {
		html:'\
		<div class="title">Select Mission</div>\
		<div><button>1</button>\
		<div><button>2</button>\
		<div><button>3</button>\
		<div><button>4</button>\
		<div><button>5</button>\
	'	, class: "menu main"
	}).appendTo(win.element)[0];
	var buttons = this.box.querySelectorAll("button");
	var startMission = function(number) {
		if (game.missions[number] != null) {
			THIS.destroy();
			game.clear();
			game.start();
			game.missions[number]();
		}
	};
	this.box.querySelectorAll("button")[0].onclick = function() {startMission(1);};
	this.box.querySelectorAll("button")[1].onclick = function() {startMission(2);};
	this.box.querySelectorAll("button")[2].onclick = function() {startMission(3);};
	this.box.querySelectorAll("button")[3].onclick = function() {startMission(4);};
	this.box.querySelectorAll("button")[4].onclick = function() {startMission(5);};
	
	this.destroy = function() {
		this.box.parentNode.removeChild(this.box);
	};
};

game.VictoryWindow = function() {
	var THIS = this;
	this.box = $("<div>", {
		html: '\
		<div class="title">Victory!</div>\
		<div><button>Main Menu</button></div>\
		', class: "menu victory"
	}).appendTo(win.element)[0];	
	
	this.box.querySelector("button").onclick = function() {
		THIS.destroy();
		new game.MenuWindow();
	};
	
	this.destroy = function() {
		this.box.parentNode.removeChild(this.box);
	};
};

game.DefeatWindow = function() {
	var THIS = this;
	this.box = $("<div>", {
		html: '\
		<div class="title">Defeat!</div>\
		<div><button>Main Menu</button></div>\
		', class: "menu defeat"
	}).appendTo(win.element)[0];
	this.box.querySelector("button").onclick = function() {
		THIS.destroy();
		new game.MenuWindow();
	};
	this.destroy = function() {
		this.box.parentNode.removeChild(this.box);
	};
};

game.victory = function() {
	//ph.paused = true;
	//game.clear();
	new game.VictoryWindow();
};
game.defeat = function() {
	//ph.paused = true;
	//game.clear();
	new game.DefeatWindow();
};

game.missions = {};

game.missions[1] = function() {
	
	hero = new UnitHero(ph.world.width/2, ph.world.height*0.8);
	
	
	var r = 120;
	var rps = 2;
	
	var enemy = new UnitEnemy(ph.world.width*0.2, 450);
	enemy.ai = new AI_StandardShooter(enemy, g2.Circle(enemy.g2Point(), r), rps);
	
	var enemy = new UnitEnemy(ph.world.width*0.5, 300);
	enemy.ai = new AI_StandardShooter(enemy, g2.Circle(enemy.g2Point(), r), rps);
	
	var enemy = new UnitEnemy(ph.world.width*0.8, 450);
	enemy.ai = new AI_StandardShooter(enemy, g2.Circle(enemy.g2Point(), r), rps);
};