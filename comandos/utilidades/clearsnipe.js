const { Message } = require("discord.js");
const { responder, COMENTARIO } = require("../../frases");

module.exports = {
    name: 'clearsnipe',
    description: 'Elimina el registro del último mensaje del comando snipe',
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    if(msg.member.roles.cache.some(role => (role.id == '875975747649568818' || role.id == '875975836254212097'))){
        const snipe = cliente.comandos.get('snipe');
        snipe.clsnipe(msg);
        msg.react('✅');
    }else{
        msg.reply(responder(COMENTARIO, [msg.author.username, msg.content]));
    }
    return true;
}