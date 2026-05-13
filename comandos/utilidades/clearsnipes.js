const { Message, MessageEmbed } = require("discord.js");
const { responder, COMENTARIO } = require("../../frases");

module.exports = {
    name: 'clearsnipes',
    description: 'Elimina el registro de mensajes del comando snipe',
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    if(msg.member.roles.cache.some(role => (role.id == '875975747649568818' || role.id == '875975836254212097'))){
        const snipe = cliente.comandos.get('snipe');
        snipe.clsnipes(msg);
        var embed = new MessageEmbed();
        embed.setColor('#7d7d7d');
        embed.setTitle('Snipe');
        embed.setDescription('Se eliminó el registro de mensajes para este canal');
        msg.reply({ embeds: [embed] });   
    }else{
        msg.reply(responder(COMENTARIO, [msg.author.username, msg.content]));
    }
    return true;
}