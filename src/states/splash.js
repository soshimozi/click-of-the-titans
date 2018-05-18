import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}

  preload () {
    this.stage.backgroundColor = '#000000'

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')

    this.loaderBg.anchor.setTo(0.5, 0.5)
    this.loaderBar.anchor.setTo(0.5, 0.5)

    this.load.setPreloadSprite(this.loaderBar)

    let text = this.add.text(this.world.centerX, this.world.centerY - 24, 'Loading Textures ...', {font: '16px Libre Franklin', fill: '#ffffff', align: 'center'})
    text.anchor.setTo(0.5, 0.5)
  
    this.game.load.spritesheet('aerocephal', require('../assets/images/enemies/aerocephal.png'), 192, 192);
    this.game.load.spritesheet('arcana_drake', require('../assets/images/enemies/arcana_drake.png'), 192, 256);
    this.game.load.spritesheet('aurum-drakueli', require('../assets/images/enemies/aurum-drakueli.png'), 320, 256);
    this.game.load.spritesheet('bat', require('../assets/images/enemies/bat.png'), 128, 128);
    this.game.load.spritesheet('daemarbora', require('../assets/images/enemies/daemarbora.png'), 128, 128);
    this.game.load.spritesheet('deceleon', require('../assets/images/enemies/deceleon.png'), 256, 256);
    this.game.load.spritesheet('demonic_essence', require('../assets/images/enemies/demonic_essence.png'), 128, 192);
    this.game.load.spritesheet('dune_crawler', require('../assets/images/enemies/dune_crawler.png'), 64, 64);
    this.game.load.spritesheet('green_slime', require('../assets/images/enemies/green_slime.png'), 64, 64);
    this.game.load.spritesheet('nagaruda', require('../assets/images/enemies/nagaruda.png'), 192, 256);
    this.game.load.spritesheet('rat', require('../assets/images/enemies/rat.png'), 64, 64);
    this.game.load.spritesheet('scorpion', require('../assets/images/enemies/scorpion.png'), 64, 64);
    this.game.load.spritesheet('skeleton', require('../assets/images/enemies/skeleton.png'), 64, 128);
    this.game.load.spritesheet('snake', require('../assets/images/enemies/snake.png'), 128, 64);
    this.game.load.spritesheet('spider', require('../assets/images/enemies/spider.png'), 64, 64);
    this.game.load.spritesheet('stygian_lizard', require('../assets/images/enemies/stygian_lizard.png'), 192, 192);    

    this.game.load.image('forest-front', require('../assets/images/parallax_forest_pack/layers/parallax-forest-front-trees.png'));
    this.game.load.image('forest-back', require('../assets/images/parallax_forest_pack/layers/parallax-forest-back-trees.png'));
    this.game.load.image('forest-lights', require('../assets/images/parallax_forest_pack/layers/parallax-forest-lights.png'));
    this.game.load.image('forest-middle', require('../assets/images/parallax_forest_pack/layers/parallax-forest-middle-trees.png'));    
  }

  create () {
    this.state.start('Play')
  }
}
