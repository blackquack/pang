let monster = null;

export default {
    create: ({ game, x = 32, y = 600, lives = 3 }) => {
        //visual
        monster = game.add.sprite(x, y, 'monster')
        monster.scale.setTo(lives, lives);

        // game
        monster.lives = lives; // lives indicated their size/level
        monster.health = 10 * monster.lives;

        // physics
        game.physics.enable(monster)
        monster.body.gravity.y = 500;
        monster.body.collideWorldBounds = true;
        monster.body.bounce.set(1);
        monster.body.velocity.set(200, 60);

        return monster;
    }
}