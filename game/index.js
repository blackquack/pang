import _ from 'lodash'
import Phaser from 'Phaser'
import gameState from './game.js'

let config = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
}

let game = new Phaser.Game(config)
game.state.add('gameState', gameState)
game.state.start('gameState')
