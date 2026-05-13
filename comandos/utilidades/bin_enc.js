const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bin_enc',
    description: 'Convierte un texto a binario',
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
        if(args[0] != e){
            txt += ' ';
        }
        txt += e;
    });
    out = txtBinario(txt);
    var embed = new MessageEmbed();
    embed.setColor('#7d7d7d');
    embed.setTitle('Texto a binario')
    embed.setDescription(out);
    msg.reply({embeds: [embed] });
    return true;
}

function txtBinario(txt){
    var out = "";
    for (var i = 0; i < txt.length; i++) {
        out += txt[i].charCodeAt(0).toString(2) + " ";
    }
    return out;
}