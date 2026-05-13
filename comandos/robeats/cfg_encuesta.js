const { Message } = require("discord.js");
const { responder, COMENTARIO } = require("../../frases");

module.exports = {
    name: 'cfg_encuesta',
    description: 'Configura la encuesta de votación de elemento',
    args: ["numChill", "numVibe", "numBeat", "numFlow", "numRush", "eventoNombre"],
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    if(args.length < 6){
        return false;
    }
    if(msg.member.roles.cache.some(role => (role.id == '875975747649568818' || role.id == '875975836254212097'))){
        cliente.encuesta.eventoNumChill = args[0];
        cliente.encuesta.eventoNumVibe = args[1];
        cliente.encuesta.eventoNumBeat = args[2];
        cliente.encuesta.eventoNumFlow = args[3];
        cliente.encuesta.eventoNumRush = args[4];
        cliente.encuesta.eventoNombre = args[5];
        for(var i = 6; i < args.length; i++){
            cliente.encuesta.eventoNombre += " " + args[i];
        }
        cliente.encuesta.configurada = true;
        msg.reply(cliente.encuesta.prev());
    }else{
        msg.reply(responder(COMENTARIO, [msg.author.username, msg.content]));
    }
    return true;
}