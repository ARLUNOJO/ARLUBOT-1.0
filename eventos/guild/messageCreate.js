const { Message } = require('discord.js');
const { PREFIJO, encuestas, media} = require('../../env.js');
const { SALUDOS, FRASES, COMENTARIO, RESPUESTA, responder } = require('../../frases.js');
const { elemAleatorio } = require('../../arlutils.js');
const { contar, contando } = require('../../contando.js');
const saludos = ['hola', 'oli', 'hol', ':ola:', ':hola:', 'saludos', 'holis', ':oli:'];

var ultHola = 0;

/**
 * @param {Message} msg
 */
module.exports = (cliente, msg) => {
    console.log(msg.author.username + ": " + msg.content);

    if(checkIfMedia(msg.channelId)){
        if(msg.attachments.size > 0 || msg.content.startsWith('http')){
            msg.startThread({
                name: msg.author.username,
                autoArchiveDuration: 60,
                reason: msg.author.createdTimestamp,
            });
        }else{
            try {
                msg.delete();
            } catch (error) {
                console.error('fallo eliminar mensaje:', error);
            }
        }
    }

    if(msg.channelId == contando){
        contar(msg);
    }

    if(msg.author.bot){
        const snipe = cliente.comandos.get('snipe');
        snipe.desnipe();
        return;
    }

    if(!msg.content.startsWith(PREFIJO) && msg.mentions.has(cliente.user)){
        let txt = msg.content.toLowerCase();
        let resp;
        let tipo;
        if((txt.includes("?") || txt.includes("¿")) && !(txt.includes("porque") || txt.includes("por que") || txt.includes ("como") || txt.includes("cómo") || txt.includes("que") || txt.includes("qué"))){
            tipo = RESPUESTA;
        }else{
            tipo = COMENTARIO;
        }
        resp = responder(tipo, [msg.author.username, msg.content]);
        if(resp == 'bot.dox'){
            resp =
            msg.author.avatarURL() + '\n' + 
            msg.author.id + '\n' + 
            msg.author.createdTimestamp + '\n' + 
            msg.createdTimestamp + '\n' + 
            msg.id;
        }
        if(resp == 'bot.derneychiquito'){
            resp = {files: ["https://cdn.discordapp.com/attachments/957608141275672618/959516201074196480/x83nm9o4df.png"]};
        }

        msg.reply(resp);
    }

    if(ultHola < Date.now() && msg.content.length <= 64){
        var txts = msg.content.toLowerCase().split(' ');
        for (var i = 0; i < txts.length; i++){
            var txt = txts[i];
            for (var c = 0; c < saludos.length; c++){
                var caso = saludos[c];
                if(txt == caso){
                    msg.channel.send(elemAleatorio(SALUDOS));
                    ultHola = Date.now() + 1800000;
                    break;
                }
            }
            break;
        }
    }

    if(msg.content.startsWith(PREFIJO)){
        const args = msg.content.slice(PREFIJO.length).split(' ');
        const comando = args.shift().toLowerCase();

        const cmd = cliente.comandos.get(comando);

        if(cmd && cmd.name && !cmd.hide){
            if(!cmd.execute(msg, args, cliente)){
                var uso = `${cmd.description} \nUso a!${cmd.name} `;
                cmd.args.forEach(strarg => {
                    uso += `<${strarg}> `;
                });
                msg.reply(uso);
            };
        }else{
            msg.reply('Este comando no existe');
        }
    }
};

function checkIfMedia(str){
    for(var i = 0; i < media.length; i++){
        if(media[i] == str){
            return true;
        }
    }
    return false;
}