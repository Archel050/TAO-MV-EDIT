//=============================================================================
// Linnet Simple ABS (v1.0.3)
// by Fogomax
// License: Attribution-ShareAlike 4.0 International - Creative Commons
//=============================================================================

/*:
	* @author Fogomax
	* @plugindesc A Simple ABS with the player and the enemies working.
	* @help
	===========================================================================
	● Explanation
	===========================================================================
	This is the initial version of my ABS, it is a simple step, but
	It works very well and already has a range of features available.

	===========================================================================
	● Use
	===========================================================================
	The attack button is the S key. It will always use skill 1
	in the database, and it will work if the enemy is facing
	the hero.
	To create an enemy, create an event on the map and enter the
	Comment (preferable as the first command in the event list):

	<NimpleEnemy=x>

	"x" being the enemy ID in the database. If the enemy can walk,
	place the event type as "Approach", so he will walk up to the player.
	Now that the event is set up, we go to the database and will go
	to the enemy ID x we specified as the event. There are some notetags to be
	added in the notes of enemies. They are:

	* <StaticEnemy> - The enemy is static, it will not walk or see the player.
	This is for objects such as bushes or punching bags.

	* <ViewRange=x> - The enemy will look up to x tiles away when a
	enemy player comes into view, an exclamation balloon appears, and his movement
	changes to "Zoom". If not specified, the default value is 2.

	* <Cooldown=x> - The enemy will wait x milliseconds before it can be attacked again.
	It is recommended a number above 100. Recalling that 1000ms = 1s.
	If not specified, the default value is 100.

	===========================================================================
	● Enemy skills
	===========================================================================
	Enemies will use the skills that are listed in its "Standards
	action. "They will follow the condition and ability with the highest rating.
	If you put two abilities with the same R (rating),
	the enemy will have a 50% chance of choosing one (he will be taking turns). IT IS
	important not to put skills that need mana alone, as when the enemy runs out of
	mana, he will have no skills to use, and the game will give an error.
	The damage the ability follows the formula specified in the database in the same way
	the common battle system. If you want the ability more hit
	once (double attack, for example), increases the number of times the
	"Repeat" box in the "Invocation" field. By using this, it is advisable to specify
	how long each will attack using specific notetag for skills.
	They are:

	* <Range=x> - The ability will reach up to x tiles, by default this value is 1.
	When your ability will not have an area larger than this, it is not necessary
	to put this notetag.
	* <RepeatInterval=x> - Time between the continuous attacks if their ability
	does not have the repeated damage, it is not necessary to use this notetag, and if it
	repeat, the default value is 200ms.

	===========================================================================
	● Weapons
	===========================================================================
	You can change the cooldown of the hero's attacks through the weapons he uses,
	i.e., a sword may have a faster strike rate than another.
	To do this, specify the following notetag in the weapon notes:
	* <Cooldown=x> - The player will have a cooldown of x ms between each attack.
	Recalling that 1000ms = 1s. The default value of this note is 100 (thus 100ms)
	if you do not specify its value.

	===========================================================================
	● Credits
	===========================================================================
	English translation of Help by @KlausAidon
*/

/*:pt
  * @author Fogomax
  * @plugindesc ABS simples com o jogador e os inimigos funcionando
  * @help
	===========================================================================
	● Explicação
	===========================================================================
	Essa é a versão inicial do meu ABS, está em uma fase bem simples, porém
	funciona muito bem e já tem uma gama de recursos disponíveis.

	===========================================================================
	● Uso
	===========================================================================
	A tecla de ataque do herói é a tecla S. Ele sempre usará a habilidade nº 1
	no banco de dados, e ela funcionará caso o inimigo esteja de frente para
	o herói.

	Para se criar um inimigo, crie um evento no mapa e coloque o seguinte
	comentário (preferivel que seja o primeiro comando na lista de eventos):

	<NimpleEnemy=x>

	Sendo "x" o ID do inimigo no banco de dados. Caso o inimigo possa andar,
	coloque o tipo do evento como "Aleatório", assim ele irá ficar andando até
	ver o jogador.

	Agora que o evento está configurado, vamos até o banco de dados e iremos até
	o inimigo de ID x que especificamos no evento. Há algumas notetags para serem
	adicionadas nas notas dos inimigos. Seguem elas:

	* <StaticEnemy> - O inimigo é estático, ele não andará nem irá ver o jogador.
	Isso serve para objetos como arbustos ou sacos de pancada.

	* <ViewRange=x> - O inimigo irá encher até x tiles de distância, quando um
	inimigo encherga o jogador, um balão de exclamação aparece e seu movimento
	muda para "Aproximar". Caso não for especificado, o valor será 2.

	* <Cooldown=x> - O inimigo irá esperar x milisegundos para dar seu próximo
	ataque. É recomendável um número acima de 100. Lembrando que 1000ms = 1s.
	Caso não for especificado, o valor será 100.


	===========================================================================
	● Habilidades dos inimigos
	===========================================================================
	Os inimigos irão usar as habilidades que estão listadas em seus "Padrões de
	ação". Elas irão seguir a condição e a habilidade mais adaqueda será
	escolhida. Se você colocar duas habilidades com a mesma R (classificação),
	o inimigo terá 50% de chances entre escolher uma (ele ficará revezando). É
	importante não colocar habilidades de necessitam de mana sozinhas, senão
	quando acabar a mana do inimigo ele não terá outra habilidade para usar, e o
	jogo dará erro.

	O dano da habilidade segue a fórmula especificado no database, da mesma forma
	que o sistema de batalha comum. Caso você queria que a habilidade acerte mais
	de uma vez (um ataque duplo, por exemplo), aumente a quantidade de vezes na
	caixa "Repetir" no campo "Invocação". Ao usar isso, é recomendável especificar
	o tempo que cada ataque levará usando a notetag específica para as habilidades.
	São elas:

	* <Range=x> - A habilidade irá atingir até x tiles, por padrão esse valor é 1,
	então se sua habilidade não vai ter uma área maior que isso não é necessário
	colocar essa notetag.

	* <RepeatInterval=x> - Tempo entre os ataques contínuos, caso sua habilidade
	não tenha o dano repetido, não é necessário usar essa notetag, e se ela
	repetir, o valor padrão é 200ms.


	===========================================================================
	● Armas
	===========================================================================
	É possível alterar o cooldown do herói através das armas que ele utiliza,
	ou seja, uma espada pode ter uma velocidade de ataque mais rápida que a
	outra. Para isso, especifique a seguinte notetag nas notas da arma:

	* <Cooldown=x> - O player irá ter um intervalor de x ms entre cada ataque.
	Lembrando que 1000ms = 1s. O valor padrão dessa nota é 100 (logo, 100ms),
	para caso você não especifique seu valor.
*/

"use strict";

var Imported = Imported || {};
Imported["LinnetABS"] = "1.0.3";

var Linnet = Linnet || {};
Linnet.ABS = {};

(function($) {
	//-----------------------------------------------------------------------------
	// Plugin global variables
	//

	// Game enemies
	$.enemies = [];

	// Damage sprites array
	$.damageSprites = [];

	// Declare attack key
	Input.keyMapper[83] = "S";

	//-----------------------------------------------------------------------------
	// Game_Map
	//

	var _Game_Map_update = Game_Map.prototype.update;

	Game_Map.prototype.update = function(sceneActive) {
		_Game_Map_update.call(this, sceneActive);
		for (var i = 0; i < $.enemies.length; i++) {
			$.enemies[i].update();
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//

	var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;

	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._damageSpriteController = new Damage_Sprite_Controller();
	};

	var _Game_CharacterBase_update = Game_CharacterBase.prototype.update;

	Game_CharacterBase.prototype.update = function() {
		_Game_CharacterBase_update.call(this);
		this._damageSpriteController.update();
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//

	var _Scene_Map_stop = Scene_Map.prototype.stop;

	Scene_Map.prototype.stop = function() {
		_Scene_Map_stop.call(this);
		$gamePlayer._damageSpriteController.removeAll();
	    $gameMap.events().forEach(function(event) {
	        event._damageSpriteController.removeAll();
	    });
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	//

	var _Game_Event_setupPage = Game_Event.prototype.setupPage;

	Game_Event.prototype.setupPage = function() {
		_Game_Event_setupPage.call(this);
		if (!this._erased && this.page()) {
			for (var i = 0; i < this.page().list.length; i++) {
				if (this.page().list[i].code == "108" || this.page().list[i].code == "408") {
					if (/<NimpleEnemy=/.test(this.page().list[i].parameters[0])) {
						var id = parseInt(this.page().list[i].parameters[0].match(/<NimpleEnemy=(\d+)>/)[1]);
						$.enemies.push(new ABS_Enemy(id, this));
					}
				}
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Player
	//

	var _Game_Player_initMembers = Game_Player.prototype.initMembers;

	Game_Player.prototype.initMembers = function() {
		_Game_Player_initMembers.call(this);
		this._cooldown = 0;
	};

	var _Game_Player_update = Game_Player.prototype.update;

	Game_Player.prototype.update = function(sceneActive) {
		_Game_Player_update.call(this, sceneActive);
		if (this._cooldown > 0)
			this._cooldown--;
		this.checkAttackKey();
	};

	Game_Player.prototype.checkAttackKey = function() {
		if (Input.isTriggered('S') && this._cooldown <= 0) {
			var px = this.x;
			var py = this.y;
			for (var i = 0; i < $.enemies.length; i++) {
				var ex = $.enemies[i]._event.x;
				var ey = $.enemies[i]._event.y;

				switch (this._direction) {
					case 2:
						if (px == ex) {
							if (ey >= py && ey <= py + 1)
								$.enemies[i].receiveAttack(1);
						}
					break;
					case 4:
						if (py == ey) {
							if (ex >= px - 1 && ex <= px)
								$.enemies[i].receiveAttack(1);
						}
					break;

					case 6:
						if (py == ey) {
							if (ex >= px && ex <= px + 1)
								$.enemies[i].receiveAttack(1);
						}
					break;

					case 8:
						if (px == ex) {
							if (ey >= py - 1 && ey <= py)
								$.enemies[i].receiveAttack(1);
						}
					break;
				}
			}

			this._cooldown = this.getCooldown();
		}
	};

	Game_Player.prototype.receiveAttack = function(skillId, enemy) {
		var skill = new ABS_Skill(skillId, enemy);
		skill.execute(this);
	};

	Game_Player.prototype.receiveDamage = function(skill, damage) {
		this.requestAnimation((Utils.getAnimationId(skill.animationId)));
		this.hero()._hp -= damage;
		this._damageSpriteController.addDamageSprite(damage, this);
		if (this.hero()._hp <= 0)
			SceneManager.goto(Scene_Gameover);
	};

	Game_Player.prototype.hero = function() {
		return $gameActors.actor(1);
	};

	Game_Player.prototype.getCooldown = function() {
		var note = this.hero().weapons()[0].note;
		if (/<Cooldown=/.test(note))
			return parseInt(note.match(/<Cooldown=(\d+)>/)[1]);
		else
			return 100;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Map
	//

	var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;

	Spriteset_Map.prototype.createLowerLayer = function() {
		_Spriteset_Map_createLowerLayer.call(this);
	};

	var _Spriteset_Map_update = Spriteset_Map.prototype.update;

	Spriteset_Map.prototype.update = function() {
	    _Spriteset_Map_update.call(this);
	};

	Spriteset_Map.prototype.addDamageSprite = function(instance) {
		this._baseSprite.addChild(instance);
	};

	//-----------------------------------------------------------------------------
	// Game_BattlerBase
	//

	Game_BattlerBase.prototype.isOccasionOk = function(item) {
		return item.occasion === 0 || item.occasion === 1;
	};

	//-----------------------------------------------------------------------------
	// Game_Item
	//

	var _Game_Item_setObject = Game_Item.prototype.setObject;

	Game_Item.prototype.setObject = function(item) {
		_Game_Item_setObject.call(this, item);
		if (this.isSkill()) {
			this.object().range = parseInt(Utils.regex(/<Range=/, /<Range=(\d+)>/, this.object().note, 1));
		}
	};

	//-----------------------------------------------------------------------------
	// ABS_Enemy
	//

	function ABS_Enemy() {
		this.initialize.apply(this, arguments);
	};

	ABS_Enemy.prototype = Object.create(Game_Enemy.prototype);
	ABS_Enemy.prototype.constructor = ABS_Enemy;

	ABS_Enemy.prototype.initialize = function(enemyId, event) {
		Game_Enemy.prototype.initialize.call(this, enemyId, 0, 0);
		this._event = event;
		this._dying = false;
		this._died = false;
		this.damageSpritesStack = [];
		this._sawPlayer = this.staticEnemy();
		this._viewRange = this.viewRange();
		this._cooldown = 0;
		this.makeActions();
	};

	ABS_Enemy.prototype.update = function() {
		if (this._dying)
			this.updateDie();

		if (this._died)
			return;

		this.updateSkill();

		if (this._cooldown > 0)
			this._cooldown--;

		if (this._sawPlayer == false && this.staticEnemy() == false)
			this.updateView();

		if (this._sawPlayer && this._cooldown <= 0)
			this.updateAttack();
	};

	ABS_Enemy.prototype.updateSkill = function() {
		this.makeActions();
	};

	ABS_Enemy.prototype.updateView = function() {
		var ex = this._event.x;
		var ey = this._event.y;
		var px = $gamePlayer.x;
		var py = $gamePlayer.y;

		switch (this._event.direction()) {
			case 2:
				if (px == ex) {
					if (py <= ey + this._viewRange && py > ey)
						this.seePlayer();
				}
			break;

			case 4:
				if (py == ey) {
					if (px >= ex + this._viewRange && px < ex)
						this.seePlayer();
				}
			break;

			case 6:
				if (py == ey) {
					if (px <= ex + this._viewRange && px > ex)
						this.seePlayer();
				}
			break;

			case 8:
				if (px == ex) {
					if (py >= ey - this._viewRange && py < ey)
						this.seePlayer();
				}
			break;
		}
	}

	ABS_Enemy.prototype.updateAttack = function() {
		var ex = this._event.x;
		var ey = this._event.y;
		var px = $gamePlayer.x;
		var py = $gamePlayer.y;
		var rg = this.currentAction().item().range;

		switch (this._event.direction()) {
			case 2:
				if (px == ex) {
					if (py >= ey && py <= ey + rg)
						this.attackPlayer();
				}
			break;

			case 4:
				if (py == ey) {
					if (px >= ex - rg && px <= ex)
						this.attackPlayer();
				}
			break;

			case 6:
				if (py == ey) {
					if (px >= ex && px <= ex + rg)
						this.attackPlayer();
				}
			break;

			case 8:
				if (px == ex) {
					if (py >= ey - rg && py <= ey)
						this.attackPlayer();
				}
			break;
		}

		this._cooldown = this.getCooldown();
	};

	ABS_Enemy.prototype.updateDie = function() {
		if (this._event.opacity() > 0) {
			this._event.setOpacity(this._event.opacity() - 10);
		} else {

			this._event.erase();
			this._died = true;
			this._dying = false;
		}
	}

	ABS_Enemy.prototype.attackPlayer = function() {
		var skill = this.currentAction().item();
		$gamePlayer.receiveAttack(skill.id, this);
		this._cooldown = this.getCooldown();
	};

	ABS_Enemy.prototype.receiveAttack = function(skillId) {
		if (!this._sawPlayer && !this.staticEnemy())
			this.seePlayer();

		var skill = new ABS_Skill(skillId, $gamePlayer.hero());
		skill.execute(this);
	};

	ABS_Enemy.prototype.receiveDamage = function(skill, damage) {
		if (this._died || this._dying) 
			return;

		this._hp -= damage;
		this._event._damageSpriteController.addDamageSprite(damage, this._event);

		this._event.turnTowardCharacter($gamePlayer);
		this._event.requestAnimation(Utils.getAnimationId(skill.animationId));

		if (this._hp <= 0) {
			this.giveDrops();
			this.giveExpAndGold();
			this.processDie();
		}
	}

	ABS_Enemy.prototype.seePlayer = function() {
		this._event.requestBalloon(1);
		this._event._moveType = 2;
		this._event.setMoveFrequency(5);
		this._sawPlayer = true;
	};

	ABS_Enemy.prototype.giveDrops = function() {
		var items = this.makeDropItems();
		items.forEach(function(item) {
			$gameParty.gainItem(item, 1);
		});
	};

	ABS_Enemy.prototype.giveExpAndGold = function() {
		$gamePlayer.hero().gainExp(this.exp());
		$gameParty.gainGold(this.gold());
	};

	ABS_Enemy.prototype.isDied = function() {
		return this._died;
	};

	ABS_Enemy.prototype.processDie = function() {
		this._dying = true;
		this._event._moveType = 0;
	};

	ABS_Enemy.prototype.staticEnemy = function() {
		return (this.enemy().note.indexOf("<StaticEnemy>") >= 0);
	};

	ABS_Enemy.prototype.viewRange = function() {
		if (/<ViewRange=/.test(this.enemy().note))
			return parseInt(this.enemy().note.match(/<ViewRange=(\d+)>/)[1]);
		else
			return 2;
	};

	ABS_Enemy.prototype.getCooldown = function() {
		var note = this.enemy().note;
		if (/<Cooldown=/.test(note))
			return parseInt(note.match(/<Cooldown=(\d+)>/)[1]);
		else
			return 100;
	};

	//-----------------------------------------------------------------------------
	// ABS_Skill
	//

	function ABS_Skill() {
		this.initialize.apply(this, arguments);
	};

	ABS_Skill.prototype.initialize = function(skillId, caster) {
		this._skill = $dataSkills[skillId];
		this._caster = caster;
	};

	ABS_Skill.prototype.calculateFormula = function(target) {
	    try {
	        var a = this._caster;
	        var b = target;
	        var v = $gameVariables._data;
	        var sign = ([3, 4].contains(this._skill.damage.type) ? -1 : 1);
	        return Math.max(eval(this._skill.damage.formula), 0) * sign;
	    } catch (e) {
	        return 0;
	    }
	};

	ABS_Skill.prototype.execute = function(target) {
		var targetObject = target;
		target = (target === $gamePlayer) ? ($gamePlayer.hero()) : (target);
		var damage = this.calculateFormula(target);
		var thisSkill = this._skill;
		for (var i = 0; i < this._skill.repeats; i++) {
			if (i == 0)
				targetObject.receiveDamage(this._skill, damage)

			if (i > 0) {
				setTimeout(function() {
					(function(skill, damage) {
						targetObject.receiveDamage(thisSkill, damage);
					})(thisSkill, damage);
				}, this.repeatInterval());
			}
		}
	};

	ABS_Skill.prototype.repeatInterval = function() {
		if (/<RepeatInterval=/.test(this._skill.note))
			return parseInt(this._skill.note.match(/<RepeatInterval=(\d+)>/)[1]);
		else
			return 200;
	};

	//-----------------------------------------------------------------------------
	// Damage_Sprite_Controller
	//

	function Damage_Sprite_Controller() {
		this.initialize.apply(this, arguments);
	};

	Damage_Sprite_Controller.prototype.initialize = function() {
		this._damageSprites = [];
	};

	Damage_Sprite_Controller.prototype.addDamageSprite = function(value, target) {
		if (this._damageSprites.length > 0 && !this._damageSprites[this._damageSprites.length-1].canAdd()) {
			this._damageSprites.forEach(function(damageSprite) {
				damageSprite.forceUp();
			});
		}
		var newDamageSprite = new Damage_Sprite(value, target.screenX(), target.screenY());
		this._damageSprites.push(newDamageSprite);
		SceneManager._scene._spriteset.addDamageSprite(newDamageSprite);
	};

	Damage_Sprite_Controller.prototype.removeDamageSprite = function(damageSprite) {
		this._damageSprites.splice(this._damageSprites.indexOf(damageSprite), 1);
		SceneManager._scene._spriteset._baseSprite.removeChild(damageSprite);
	};

	Damage_Sprite_Controller.prototype.removeAll = function() {
		for (var i = this._damageSprites.length - 1; i >= 0; i--) {
			this.removeDamageSprite(this._damageSprites[i]);
		};
	};

	Damage_Sprite_Controller.prototype.update = function() {
		for (var i = 0; i < this._damageSprites.length; i++) {
			if (this._damageSprites[i].needRemove()) {
				this.removeDamageSprite(this._damageSprites[i]);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Damage_Sprite
	//

	function Damage_Sprite() {
		this.initialize.apply(this, arguments);
	};

	Damage_Sprite.prototype = Object.create(Sprite_Base.prototype);
	Damage_Sprite.prototype.constructor = Damage_Sprite;

	Damage_Sprite.prototype.initialize = function(value, screenX, screenY) {
		Sprite_Base.prototype.initialize.call(this);
		this._value = value + "";
		this.bitmap = new Bitmap(150, 48);
		this.x = screenX - 75;
		this.y = screenY - 48;
		this._count = 40;
		this._oldY = this.y;
		this._canAdd = false;
		this._needRemove = false;
		this.bitmap.drawText(this._value, 0, 0, 150, this.bitmap.fontSize, "center");
	};

	Damage_Sprite.prototype.update = function() {
		if (this._needRemove) return;
		this.y--;
		this._canAdd = (this._oldY - this.y > this.bitmap.fontSize - 11);
		if (this._count > 0)
			this._count--;
		else {
			if (this.opacity > 0) {
				this.opacity -= 5;
			} else {
				this._needRemove = true;
			}
		}
	};

	Damage_Sprite.prototype.canAdd = function() {
		return this._canAdd;
	};

	Damage_Sprite.prototype.forceUp = function() {
		this.y -= this.bitmap.fontSize - 11;
	};

	Damage_Sprite.prototype.needRemove = function() {
		return this._needRemove;
	};

	//-----------------------------------------------------------------------------
	// Utils
	//

	function Utils() {
    	throw new Error('This is a static class');
	};

	Utils.regex = function(test, regex, string, defaultValue) {
		if (test.test(string))
			return string.match(regex)[1];
		else
			return defaultValue;
	};

	Utils.getAnimationId = function(id) {
		return (id == -1) ? (1) : (id);
	};
})(Linnet.ABS);
