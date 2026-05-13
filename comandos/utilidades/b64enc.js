const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'b64enc',
    description: 'Encripta un texto a base64',
    args: ["texto"],
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    var txt = "";
    var out = "";
    if(args.length < 1){
        return false;
    }
    args.forEach(e => {
        txt += e;
        if(args[args.length - 1] != e){
            txt += ' ';
        }
    });
    out = Buffer.from(txt).toString('base64');
    var embed = new MessageEmbed();
    embed.setColor('#7d7d7d');
    embed.setTitle('Codificador Base64')
    embed.setDescription(out);
    msg.reply({embeds: [embed] });
    return true;
}