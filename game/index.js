import _ from 'lodash'
import Phaser from 'Phaser'
import gameState from './game.js'

let config = {
}

let game = new Phaser.Game(config)
game.state.add('gameState', gameState)
game.state.start('gameState')
