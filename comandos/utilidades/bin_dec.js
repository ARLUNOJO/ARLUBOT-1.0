const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bin_dec',
    description: 'Convierte binario a texto, respondiendo al mensaje ó pasando como argumento el texto codificado',
    args: ["textoBinario"],
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
        args.forEach(arg => {
            txt += arg;
            if(args[args.length - 1] != arg){
                txt += ' ';
            }
        });
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
    out = binarioTxt(txt);
    if(!out){
        out = "Error";
    }
    var embed = new MessageEmbed();
    embed.setColor('#7d7d7d');
    embed.setTitle('Binario a Texto');
    embed.setDescription(out);
    msg.reply({ embeds: [embed] });
}

function binarioTxt(bin){
    try {
        var out = '';
        var cs = bin.split(' ');
        cs.forEach(c => {
            var dec = parseInt(c, 2);
            out += String.fromCharCode(dec);
        });
    } catch (error) {
        out = "Error"
    }
    return out;
}