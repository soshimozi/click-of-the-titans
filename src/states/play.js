import Phaser from 'phaser'

export default class extends Phaser.State {
  
  init () {}
  
  preload () {
 
  }

  create () {
      
      this.background = this.game.add.group();

      // setup each of our background layers to take the full screen
      ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
          .forEach((image) => {
              var bg = this.game.add.tileSprite(0, 0, this.game.world.width,
                  this.game.world.height, image, '', this.background);
              bg.tileScale.setTo(4,4);
          });   
          
      // the main player
      this.player = {
          clickDmg: 1,
          gold: 0
      };       
      
      var monsterData = [
          {name: 'Aerocephal',        image: 'aerocephal',        maxHealth: 10},
          {name: 'Arcana Drake',      image: 'arcana_drake',      maxHealth: 20},
          {name: 'Aurum Drakueli',    image: 'aurum-drakueli',    maxHealth: 30},
          {name: 'Bat',               image: 'bat',               maxHealth: 5},
          {name: 'Daemarbora',        image: 'daemarbora',        maxHealth: 10},
          {name: 'Deceleon',          image: 'deceleon',          maxHealth: 10},
          {name: 'Demonic Essence',   image: 'demonic_essence',   maxHealth: 15},
          {name: 'Dune Crawler',      image: 'dune_crawler',      maxHealth: 8},
          {name: 'Green Slime',       image: 'green_slime',       maxHealth: 3},
          {name: 'Nagaruda',          image: 'nagaruda',          maxHealth: 13},
          {name: 'Rat',               image: 'rat',               maxHealth: 2},
          {name: 'Scorpion',          image: 'scorpion',          maxHealth: 2},
          {name: 'Skeleton',          image: 'skeleton',          maxHealth: 6},
          {name: 'Snake',             image: 'snake',             maxHealth: 4},
          {name: 'Spider',            image: 'spider',            maxHealth: 4},
          {name: 'Stygian Lizard',    image: 'stygian_lizard',    maxHealth: 20}
      ];

      this.monsters = this.game.add.group();
      
      var monster;
      monsterData.forEach((data) => {
          // create a sprite for them off screen
          monster = this.monsters.create(2000, this.game.world.centerY, data.image);
          // center anchor
          monster.anchor.setTo(0.5);
          // reference to the database
          monster.details = data;
      
          //enable input so we can click it!
          monster.inputEnabled = true;
          monster.events.onInputDown.add((monster, pointer) => this.onClickMonster(monster, pointer), this);

          monster.frame = 0;

          // use the built in health component
          monster.health = monster.maxHealth = data.maxHealth;
          
          // hook into health and lifecycle events
          monster.events.onKilled.add((monster) => this.onKilledMonster(monster), this);
          monster.events.onRevived.add((monster) => this.onRevivedMonster(monster), this);          
      });         

      this.currentMonster = this.monsters.getRandom();
      this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);    

      this.monsterInfoUI = this.game.add.group();
      this.monsterInfoUI.position.setTo(this.currentMonster.x - 220, this.currentMonster.y + 120);
      this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
          font: '48px Arial Black',
          fill: '#fff',
          strokeThickness: 4
      }));
      this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 80, this.currentMonster.health + ' HP', {
          font: '32px Arial Black',
          fill: '#ff0000',
          strokeThickness: 4
      }));

      this.dmgTextPool = this.add.group();
      var dmgText;
      for (var d=0; d<50; d++) {
          dmgText = this.add.text(0, 0, '1', {
              font: '64px Arial Black',
              fill: '#fff',
              strokeThickness: 4
          });
          // start out not existing, so we don't draw it yet
          dmgText.exists = false;
          dmgText.tween = game.add.tween(dmgText)
              .to({
                  alpha: 0,
                  y: 100,
                  x: this.game.rnd.integerInRange(100, 700)
              }, 1000, Phaser.Easing.Cubic.Out);
      
          dmgText.tween.onComplete.add(function(text, tween) {
              text.kill();
          });

          this.dmgTextPool.add(dmgText);      
      }
  }

  render() {
    game.debug.text(this.currentMonster.details.name,
        this.game.world.centerX - this.currentMonster.width / 2,
        this.game.world.centerY + this.currentMonster.height / 2);  

   // this.add.text(250, 290, 'Adventure Awaits!', { font: '16px', fill: '#fff', align: 'center' })     
  }

  onKilledMonster(monster) {
    // move the monster off screen again
    monster.position.set(1000, this.game.world.centerY);
 
    // pick a new monster
    this.currentMonster = this.monsters.getRandom();
    // make sure they are fully healed
    this.currentMonster.revive(this.currentMonster.maxHealth);
  }

  onRevivedMonster(monster) {
    monster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
    // update the text display
    this.monsterNameText.text = monster.details.name;
    this.monsterHealthText.text = monster.health + 'HP';
  }

  onClickMonster(monster, pointer) {
    // apply click damage to monster
    this.currentMonster.damage(this.player.clickDmg);

    // grab a damage text from the pool to display what happened
    var dmgText = this.dmgTextPool.getFirstExists(false);
    if (dmgText) {
        dmgText.text = this.player.clickDmg;
        dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
        dmgText.alpha = 1;
        dmgText.tween.start();
    }
    // update the health text
    this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';    
  }
}