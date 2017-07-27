let monster = null;
export default {
    create: ({ game, x = _.random(0, 600), y = 0, lives = 3 }) => {
        //visual
        monster = game.add.sprite(x, y, 'monster')
        monster.scale.setTo(lives, lives);

        // game
        monster.lives = lives; // lives indicated their size/level
        monster.health = 10 * monster.lives;
        monster.maxVelocity = ((-1 / (lives + 2)) + 1) * 750;  // a limit function

        // physics
        game.physics.enable(monster)
        monster.body.gravity.y = 500;
        monster.body.collideWorldBounds = true;
        monster.body.bounce.set(1);
        monster.body.maxVelocity.set(monster.maxVelocity); // set a max velocity to limit max bounce height

        let xVelocity = _.shuffle([200, 100, -100, -200])[0];
        let yVelocity = monster.maxVelocity;
        monster.body.velocity.set(xVelocity, -yVelocity);

        return monster;
    }
}