const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    user: String,
    coins: Number
});

module.exports = mongoose.model('economy', guildSchema);