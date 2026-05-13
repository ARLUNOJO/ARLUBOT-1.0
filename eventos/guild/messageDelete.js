const { Message } = require("discord.js");

/**
 * @param {Message} msg
 */
module.exports = (cliente, msg) => {
    if(msg.author){
        console.log("[BORRADO] " + msg.author.tag + ": " + msg.content);
        const snipe = cliente.comandos.get('snipe');
        snipe.snipe(msg);
    }
};