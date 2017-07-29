let monster = null;
export default {
    create: ({ game, x = _.random(0, 600), y = 0, lives = 3 }) => {
        //visual
        monster = game.add.sprite(x, y, 'blob')
        monster.scale.setTo(lives);
        monster.animations.add('go_up', [0, 2, 3]);
        monster.animations.add('go_down', _.range(4, 8));
        monster.animations.play('go_down', 10);

        // game
        monster.lives = lives; // lives indicated their size/level
        monster.health = 10 * monster.lives;
        monster.targetVelocity = ((-1 / (lives + 2)) + 1) * 750;  // a limit function for max height

        // physics
        game.physics.enable(monster);
        monster.body.setSize(24, 30, 30, 25);
        monster.body.gravity.y = 500;
        monster.body.collideWorldBounds = true;
        monster.body.bounce.set(1);
        monster.body.maxVelocity.set(monster.targetVelocity); // set a max velocity to limit max bounce height

        let xVelocity = _.shuffle([200, 100, -100, -200])[0];
        let yVelocity = monster.targetVelocity;
        monster.body.velocity.set(xVelocity, -yVelocity);

        return monster;
    },
    update: ({ monster }) => {
        if (monster.body.onFloor()) {
            // always bounce to right height
            let diffVelocity = Math.floor(monster.targetVelocity - Math.abs(monster.body.velocity.y));
            monster.body.velocity.set(monster.body.velocity.x, monster.body.velocity.y - diffVelocity);

            // visual
            monster.animations.play('go_up', 15);
        }

        // visual
        if (_.inRange(monster.body.deltaY(), -1, 0)) {
            monster.animations.play('go_down', 5);
        }
    }
}