const { Message, MessageEmbed, Collection } = require("discord.js");
const limite = 32;
module.exports = {
    name: 'snipe',
    description: 'Muestra el ultimo mensaje eliminado',
    hide: false,
    execute: correr,
    snipe: snipe,
    desnipe: desnipe,
    clsnipe: clsnipe,
    clsnipes: clsnipes
};

let snipes = new Collection();
let des;
let fdes;

/**
 * @param {Message} msg
*/
function snipe(msg){
    if(!msg.content.includes('confess') && Date.now() - fdes > 900){
        let snp = snipes.get(msg.channel.id);
        if(!snp){
            snipes.set(msg.channel.id, []);
            snp = snipes.get(msg.channel.id);
        }
        if(snp.length >= limite){
            snp.pop();
        }
        if(msg.content.length > 1024){
            msg.content = "[Mensaje muy grande para guardar]";
        }
        let svs = msg;
        svs.fecha = Date.now();
        snp.unshift(svs);
    }
}

/**
 * @param {Message} msg
*/
function clsnipes(msg){
    snipes.delete(msg.channel.id);
}

/**
 * @param {Message} msg
*/
function clsnipe(msg){
    snp = snipes.get(msg.channel.id);
    if(snp){
        snp.shift();
    }
}

function desnipe(){
    fdes = Date.now();
}

/**
 * @param {Message} msg
*/
function correr(msg, args, cliente){
    let embed = new MessageEmbed();
    embed.setColor('#7d7d7d');
    let n = 0;
    if(args[0] > 0){
        n = args[0];
    }
    let snp = snipes.get(msg.channel.id);
    if(args[1]){
        snp = snipes.get(args[1]);
    }
    if(!snp || snp.length == 0 || n >= snp.length){
        embed.setDescription("No hay registros");
        msg.channel.send({embeds: [embed]});
        return true;
    }
    embed.setAuthor({
        name: snp[n].author.tag,
        iconURL: snp[n].author.avatarURL()
    });
    embed.setDescription(snp[n].content);
    embed.setTimestamp(snp[n].createdTimestamp);
    let attchs = [];

    snp[n].attachments.forEach((attach) => {
        attchs.push(attach.url);
    });
    msg.channel.send({embeds: [embed], files: attchs});
    return true;
}