export default class extends Phaser.State {
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('star', './assets/star.png');
        this.load.spritesheet('dude', './assets/dude.png', 32, 48);
    }

    create() {
        this.add.sprite(0, 0, 'sky');

        this.player = this.add.sprite(32, this.world.height - 150, 'dude');
        this.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;

        this.player.anchor.setTo(0.5, 0.5);
    }

    update() {

        // this.physics.arcade.moveToPointer(this.player, 60, this.input.activePointer, 300);
        this.player.rotation = this.physics.arcade.moveToPointer(this.player, 60, this.input.activePointer, 500);

    }
}