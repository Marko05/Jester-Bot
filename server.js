const express = require('express');
const server = express();

module.exports = keepAlive;

server.all('/', (req, res)=>{
    res.send('Jester is Online!\nConnected to Servers!');
}); 


function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}
