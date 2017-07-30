let monster = null;
export default {
    create: ({ game, x = _.random(0, 600), y = 0, lives = 3 }) => {
        //visual
        monster = game.add.sprite(x, y, 'blob')
        monster.scale.setTo(lives);
        monster.animations.add('go_up', [0, 1, 2], );
        monster.animations.play('go_up', 15);

        //audio
        monster.audio = {
            pop: game.add.audio('pop'),
            bounce: game.add.audio('bounce')
        }

        // game
        monster.lives = lives; // lives indicated their size/level
        monster.health = 10 * monster.lives;
        monster.targetVelocity = ((-1 / (lives + 2)) + 1) * 450;  // a limit function for max height

        // physics
        game.physics.enable(monster);
        monster.body.setSize(24, 30, 30, 25);
        monster.body.gravity.y = 250;
        monster.body.collideWorldBounds = true;
        monster.body.bounce.set(1);
        monster.body.maxVelocity.set(monster.targetVelocity); // set a max velocity to limit max bounce height

        let xVelocity = _.shuffle([200, -200])[0];
        let yVelocity = monster.targetVelocity;
        monster.body.velocity.set(xVelocity, -yVelocity);

        return monster;
    },
    update: ({ monster }) => {
        if (monster.body.onFloor()) {
            // always bounce to right height
            monster.body.velocity.set(monster.body.velocity.x, -monster.targetVelocity);

            // visual
            monster.animations.play('go_up', 15);

            // audio
            monster.audio.bounce.play();
        }
    }
}