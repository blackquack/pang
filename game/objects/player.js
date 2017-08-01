let player = null;

export default {
    create: ({ game }) => {
        player = game.add.sprite(0, 0, 'dude');
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        return player;
    },
    update: ({ game, weapon }) => {
        let input = game.input;
        let move = { x: input.activePointer.x, y: 1000, spd: 300 };

        // movement
        game.physics.arcade.moveToXY(player, move.x, move.y, null, move.spd);

        // fire
        if (input.mousePointer.isDown) {
            weapon.fireAtPointer(input.mousePointer);
            if (!weapon.audio.isPlaying) weapon.audio.play();
        }

        // collision
        // if (game.physics.arcade.overlap(player, monster)) {
        //     console.log("PLAYER HIT")
        // }
    }
}