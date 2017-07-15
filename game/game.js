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

        this.weapon = this.game.add.weapon(30, 'star');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 400;
        this.weapon.fireRate = 120;
        this.weapon.bulletAngleVariance = 2;
        this.weapon.trackSprite(this.player);
    }

    update() {

        let mouseX = this.input.activePointer.x;
        this.physics.arcade.moveToXY(this.player, mouseX, 800, 600, 300);
        if (this.input.mousePointer.isDown) {
            this.weapon.fireAtPointer(this.input.mousePointer);
        }
    }

    render() {
        this.weapon.debug();
    }
}