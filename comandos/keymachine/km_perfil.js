const { MessageEmbed } = require('discord.js');
const plataformas = ['❔', '<:windows:959594455395082240>', '<:android:959594477595549736>'];
module.exports = {
    name: 'km_perfil',
    description: 'Consulta un perfil de nuestro juego Key Machine',
    hide: true,
    args: ['<usuario:texto>'],
    execute: correr
};

async function correr(msg, args, cliente, discord){
    const http = require('https');
    const opc = {
        host: 'km2dserver.000webhostapp.com',
        port: 443,
        path: '/app/ObtPerfil.php',
        method: 'POST'
    };
    var str = '';

    http.request(opc, (respuesta) => {
        var str = '';
    respuesta.on('data', (trozo) => {
        str += trozo;
    });

    respuesta.on('end', () => {
        var txt = str.split('|');
        var top = JSON.parse(txt[2]);
        var embed = new MessageEmbed();
        var no = 1;
        var desc = '';
        embed.setColor('#7d7d7d');
        embed.setAuthor({
            name: txt[1],
            iconURL: "https://cdn.discordapp.com/attachments/957608141275672618/959582694008819772/512.png",
            url: "https://play.google.com/store/apps/details?id=com.arlunojo.km2d"
        });
        top.recs.forEach(tabla => {
            desc += '`';
            for(var x=`${no}`.length; x < 2; x++){
                desc += ' ';
            }
            desc += no;
            desc += '` ';
            desc += '`';
            for(var x=`${tabla.puntaje}`.length; x < 3; x++){
                desc += ' ';
            }
            desc += tabla.puntaje;
            desc += '` | ';
            desc += plataformas[tabla.plataforma] + ' **' + tabla.usuario + '**' + '\n';
            no++;
        });
        embed.setDescription(desc);
        embed.setTimestamp();
        embed.setFooter({
            text: 'Key machine leaderboard top'
        });
        msg.channel.send({embeds: [embed]})
    })
    });
    http.write(`{usuario: ${args[0]}}`);
    http.end();
}