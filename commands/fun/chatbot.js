const { chatBot } = require('reconlx') 

module.exports = {
    name : 'chatbot',
    category: "fun",
    description: "Chats with the bot",
    usage: "chatbot <message>",

    run : async(client, message, args) => {
      
        chatBot(message, args.join(" "))
    }
}