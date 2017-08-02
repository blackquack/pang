let player = null;

export default {
    create: ({ game }) => {
        //visual
        player = game.add.sprite(0, 0, 'cat');
        player.scale.setTo(2);
        player.animations.add('shoot', _.range(7).concat([0]), 40);
        player.events
        player.anchor.setTo(0.5, 0.5);


        //physics
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
            player.play('shoot');
            // player.scale.x = -player.scale.x;
        }

        // visual
        if (player.body.velocity.x > 0) { //right
            player.scale.x = Math.abs(player.scale.x);
        } else if (player.body.velocity.x < 0) { //left
            player.scale.x = -Math.abs(player.scale.x);
        }


        // collision
        // if (game.physics.arcade.overlap(player, monster)) {
        //     console.log("PLAYER HIT")
        // }
    }
}