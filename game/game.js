import player from './objects/player.js';
import weapon from './objects/weapon.js';
import monster from './objects/monster.js';

export default class extends Phaser.State {
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('star', './assets/star.png');
        this.load.spritesheet('dude', './assets/dude.png', 32, 48);
        this.load.image('monster', './assets/orb-green.png');
    }

    create() {
        this.world.setBounds(0, 0, 800, 1000); //camera is 800x600
        this.camera.y = 400;
        this.add.sprite(0, 400, 'sky');

        this.player = player.create({ game: this })
        this.weapon = weapon.create({ game: this })
        this.weapon.trackSprite(this.player);

        this.monsterGroup = this.add.group();
        this.monsterGroup.add(monster.create({ game: this }));

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.up.isDown)
            this.camera.y -= 4;
        else if (this.cursors.down.isDown)
            this.camera.y += 4;

        player.update({ game: this, weapon: this.weapon })
        weapon.update({ game: this, mGroup: this.monsterGroup, weapon: this.weapon })
        this.monsterGroup.forEach(m => monster.update({ monster: m }) );
    }

    render() {
        this.weapon.debug();
    }
}
