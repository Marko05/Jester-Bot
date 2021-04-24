const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    category: "fun",
    description: "Play some TicTacToe",
    usage: "tictactoe <@user>",
    
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}