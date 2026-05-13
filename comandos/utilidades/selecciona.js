const { Message } = require("discord.js");
const { elemAleatorio } = require("../../arlutils");

module.exports = {
    name: 'selecciona',
    description: 'Selecciona aleatoriamente uno de los elementos que entregas en forma de listado',
    args: ["e1,e2,e3..."],
    hide: false,
    execute: correr,
};

/**
 * @param {Message} msg
 */
function correr(msg, args, cliente){
    if(args.length < 1){
        return false;
    }
    var txt = "";
    for(var i = 0; i < args.length; i++){
        txt += " " + args[i];
    }
    var opcs = txt.split(',');
    
    msg.reply(elemAleatorio(opcs));
    return true;
}