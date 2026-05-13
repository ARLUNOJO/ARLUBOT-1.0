const { Channel, Message, TextChannel, MessageEmbed } = require('discord.js');

exports.msgId = "1130408555036561418";
exports.indicador = "《《《";
exports.eventoNombre = "Sin Configurar";
exports.eventoNumChill = 0;
exports.eventoNumVibe = 0;
exports.eventoNumBeat = 0;
exports.eventoNumFlow = 0;
exports.eventoNumRush = 0;
exports.emojiChill = "<:chill:876798808397320202>";
exports.emojiVibe = "<:vibe:876798787048329257>";
exports.emojiBeat = "<:beat:876798749832269835>";
exports.emojiFlow = "<:flow:876798621545291807>";
exports.emojiRush = "<:rush:876798569212944405>";
exports.desactivado = 5;
exports.terminada = false;
exports.configurada = false;

 /**
 * @param {TextChannel} channel
 */
exports.actualizarEncuesta = async function(channel, terminar){
    let embed = new MessageEmbed();
    let empates = 0;
    let msg;
    let resetReacts = false;
    await channel.messages.fetch(exports.msgId).then((m) => {msg = m;});
    let chills = 0;
    if(exports.desactivado != 1){
        const chillsRes = msg.reactions.resolve('876798808397320202');
        if(chillsRes){
            chills = chillsRes.count - 1;
        }
        else{
            resetReacts = true;
        }
    }
    let vibes = 0;
    if(exports.desactivado != 2){
        const vibesRes = msg.reactions.resolve('876798787048329257');
        if(vibesRes){
            vibes = vibesRes.count - 1;
        }
        else{
            resetReacts = true;
        }
    }
    let beats = 0;
    if(exports.desactivado != 3){
        const beatsRes = msg.reactions.resolve('876798749832269835');
        if(beatsRes){
            beats = beatsRes.count - 1;
        }
        else{
            resetReacts = true;
        }
    }
    let flows = 0;
    if(exports.desactivado != 4){
        const flowsRes = msg.reactions.resolve('876798621545291807');
        if(flowsRes){
            flows = flowsRes.count - 1;
        }
        else{
            resetReacts = true;
        }
    }
    let rushs = 0;
    if(exports.desactivado != 5){
        const rushsRes = msg.reactions.resolve('876798569212944405');
        if(rushsRes){
            rushs = rushsRes.count - 1;
        }
        else{
            resetReacts = true;
        }
    }
    if (resetReacts){
        await msg.reactions.removeAll();
        await reacciones(msg);
        return;
    }
    const mayor = Math.max(chills, vibes, beats, flows, rushs);
    let txt = "";
    embed.setTitle("¿Cual creen que debería ser el color/elemento del equipo la siguiente semana?");
    if(!terminar){
        txt += "**(Vence <t:" + (exports.fecha.getTime()/1000) + ":R>)**\n";
    }else{
        txt += "**(Venció <t:" + (exports.fecha.getTime()/1000) + ":R>)**\n";
    }
    if(exports.desactivado != 1){
        txt += exports.emojiChill + " Chill";
        if(chills == mayor && mayor > 1){
            txt += exports.indicador + ` (${chills})`;
            embed.setColor('#1c1cff');
            empates++;
        }
    }
    if(exports.desactivado != 2){
        txt += "\n" + exports.emojiVibe + " Vibe";
        if(vibes == mayor && mayor > 1){
            txt += exports.indicador + ` (${vibes})`;
            embed.setColor('#1cff20');
            empates++;
        }
    }
    if(exports.desactivado != 3){
        txt += "\n" + exports.emojiBeat + " Beat";
        if(beats == mayor && mayor > 1){
            txt += exports.indicador + ` (${beats})`;
            embed.setColor('#ff681c');
            empates++;
        }
    }
    if(exports.desactivado != 4){
        txt += "\n" + exports.emojiFlow + " Flow";
        if(flows == mayor && mayor > 1){
            txt += exports.indicador + ` (${flows})`;
            embed.setColor('#731cff');
            empates++;
        }
    }
    if(exports.desactivado != 5){
        txt += "\n" + exports.emojiRush + " Rush";
        if(rushs == mayor && mayor > 1){
            txt += exports.indicador + ` (${rushs})`;
            embed.setColor('#ff1c1c');
            empates++;
        }
    }
    if(empates > 1){
        embed.setColor('#828282');
    }
    embed.setDescription(txt);
    msg.edit({content: "<@&875975593278189600>", embeds: [embed]});
}

exports.terminaEncuesta = function(channel){
    exports.terminada = true;
    exports.configurada = false;
    exports.actualizarEncuesta(channel, true);
}
/**
 * @param {TextChannel} channel
 */
exports.crearEncuesta = function(channel){
    let embed = new MessageEmbed();
    exports.fecha = exports.AcomFecha();
    exports.terminada = false;
    embed.setTitle("¿Cual creen que debería ser el color/elemento del equipo la siguiente semana?");
    embed.setDescription(
        "**(Vence <t:" + (exports.fecha.getTime()/1000) + ":R>)**\n"+
        exports.emojiChill + " Chill\n" +
        exports.emojiVibe + " Vibe\n" +
        exports.emojiBeat + " Beat\n" +
        exports.emojiFlow + " Flow\n" +
        exports.emojiRush + " Rush\n\n"
    );

    channel.send({content: "<@&875975593278189600>", embeds: [embed]})
    .then(reacciones);
}

exports.AcomFecha = function(){
    var ahora = new Date(Date.now());
    var vence = new Date(ahora.getTime());
    vence.setUTCHours(8,0,0,0);
    vence.setUTCDate((ahora.getUTCDate() - ahora.getUTCDay()));
    vence.setTime(vence.getTime() + 424800000);
    return vence;
}

exports.fecha = exports.AcomFecha();

exports.prev = function(){
    var txt = "Configurado Evento " + exports.eventoNombre + "\n" +
    exports.emojiChill + " × " + exports.eventoNumChill + "\n" +
    exports.emojiVibe + " × " + exports.eventoNumVibe + "\n" +
    exports.emojiBeat + " × " + exports.eventoNumBeat + "\n" +
    exports.emojiFlow + " × " + exports.eventoNumFlow + "\n" +
    exports.emojiRush + " × " + exports.eventoNumRush + "\n";
    return txt;
}

/**
 * @param {Message} msg
 */
async function reacciones(msg){
    exports.msgId = `${msg.id}`;
    console.log("encuesta id: " + exports.msgId);
    try {
        if(exports.desactivado != 1)
        await msg.react(exports.emojiChill);
        if(exports.desactivado != 2)
        await msg.react(exports.emojiVibe);
        if(exports.desactivado != 3)
        await msg.react(exports.emojiBeat);
        if(exports.desactivado != 4)
        await msg.react(exports.emojiFlow);
        if(exports.desactivado != 5)
        await msg.react(exports.emojiRush);
    } catch (error) {
        console.error('fallo una reacción:', error);
    }
}