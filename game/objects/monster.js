let monster = null;
export default {
    create: ({ game, x = _.random(0, 600), y = 0, lives = 3 }) => {
        //visual
        monster = game.add.sprite(x, y, 'slime')
        monster.scale.setTo(lives * 2);
        // monster.anchor.set(0.5);
        monster.animations.add('spin', _.range(11, 20));
        monster.animations.play('spin', 10, true);

        // game
        monster.lives = lives; // lives indicated their size/level
        monster.health = 10 * monster.lives;
        monster.targetVelocity = ((-1 / (lives + 2)) + 1) * 750;  // a limit function for max height

        // physics
        game.physics.enable(monster);
        monster.body.setSize(lives,lives)
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
        // visual
        // monster.angle += 1;

        // always bounce to right height
        if (monster.body.onFloor()) {
            let diffVelocity = Math.floor(monster.targetVelocity - Math.abs(monster.body.velocity.y));
            monster.body.velocity.set(monster.body.velocity.x, monster.body.velocity.y - diffVelocity);
        }
    }
}