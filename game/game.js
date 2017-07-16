export default class extends Phaser.State {
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('star', './assets/star.png');
        this.load.spritesheet('dude', './assets/dude.png', 32, 48);
        this.load.spritesheet('monster', './assets/orb-green.png');
    }

    create() {
        this.add.sprite(0, 0, 'sky');

        this.player = this.add.sprite(32, this.world.height - 150, 'dude');
        this.physics.enable(this.player);
        this.player.body.collideWorldBounds = true;

        this.weapon = this.game.add.weapon(30, 'star');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 1000;
        this.weapon.fireRate = 120;
        this.weapon.bulletAngleVariance = 2;
        this.weapon.trackSprite(this.player);

        this.monster = this.add.sprite(32, 0, 'monster')
        this.monster.health = 10;
        this.physics.enable(this.monster)
        this.monster.body.gravity.y = 500;
        this.monster.body.collideWorldBounds = true;
        this.monster.body.bounce.set(1);
        this.monster.body.velocity.set(200, 60);
    }

    update() {
        let mouseX = this.input.activePointer.x;
        this.physics.arcade.moveToXY(this.player, mouseX, 800, 600, 300);
        if (this.input.mousePointer.isDown) {
            this.weapon.fireAtPointer(this.input.mousePointer);
        }

        if (this.physics.arcade.overlap(this.player, this.monster)) {
            console.log("PLAYER HIT")
        }

        this.physics.arcade.overlap(this.monster, this.weapon.bullets, (m, b) => {
            m.tint = 0xff0000;
            setTimeout(() => {
                m.tint = 0xffffff;
            }, 50);

            b.kill()

            m.health -= 2;
            console.log(m.health)

            if (m.health === 0) {
                m.kill()
            }
        })

    }

    render() {
        this.weapon.debug();
    }
}