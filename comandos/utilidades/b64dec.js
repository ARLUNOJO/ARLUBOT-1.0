const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'b64dec',
    description: 'Decodifica un texto encriptado en base64, respondiendo al mensaje ó pasando como argumento el texto codificado',
    args: ["textoBase64"],
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    var txt = "";
    var out = "Error";
    if(args.length > 0)
    {
        txt = args[0];
        subc(msg, txt);
    } 
    else if(msg.reference)
    {
        msg.channel.messages.fetch(msg.reference.messageId)
        .then((message) => 
        {
            txt = message.content;
            if(message.embeds.length > 0){
                txt = message.embeds[0].description;
            }
            subc(msg, txt);
        });
    } 
    else 
    {
        return false;
    }
    return true;
}

function subc(msg, txt){
    out = Buffer.from(txt, 'base64').toString();
    if(!out){
        out = "Error";
    }
    var embed = new MessageEmbed();
    embed.setColor('#7d7d7d');
    embed.setTitle('Decodificador Base64');
    embed.setDescription(out);
    msg.reply({ embeds: [embed] });
}