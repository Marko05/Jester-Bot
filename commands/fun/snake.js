const { SnakeCord } = require('reconlx') 

module.exports = {
    name : 'snake',
    category: "fun",
    description: "Plays the snake game",
    usage: "snake",
    aliases: [],

    run : async(client, message, args) => {

    const snakeGame = new SnakeCord({
    title: 'Snake Game',
    color: "RED",
    timestamp: false,
    gameOverTitle: "You lost!"

    })

    snakeGame.newGame(message)
    }
}