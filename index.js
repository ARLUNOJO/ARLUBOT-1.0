const { TOKEN, encuestas } = require('./env.js');
const {Client, Intents, Collection} = require('discord.js');
const cliente = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
cliente.encuesta = require("./encuesta.js");
cliente.cumples = require("./cumples.js");
cliente.comandos = new Collection();
cliente.eventos = new Collection();

['adminEventos', 'adminComandos'].forEach((archivo) => {
    require(`./admins/${archivo}.js`)(cliente);
});

cliente.login(TOKEN);

setInterval(tick, 30000);

function tick(){
    var fecha = new Date(Date.now());
    var fechaCreaEncuesta = cliente.encuesta.AcomFecha();
    if(cliente.encuesta.terminada && fecha.getTime() > fechaCreaEncuesta.getTime() - 338400000 && fecha.getTime() < fechaCreaEncuesta.getTime()){
        console.log('Creando encuesta');
        cliente.channels.fetch(encuestas).then(ch => {
            //cliente.encuesta.actualizarEncuesta(ch, true).then(()=>{
                cliente.encuesta.crearEncuesta(ch);
            //});
        });
    }
    if(!cliente.encuesta.terminada && fecha.getTime() > fechaCreaEncuesta.getTime()){
        console.log('terminando encuesta');
        cliente.channels.fetch(encuestas).then(ch => {
            //cliente.encuesta.actualizarEncuesta(ch, true).then(()=>{
                cliente.encuesta.terminaEncuesta(ch);
            //});
        });
    }
    cliente.cumples.tick(cliente, fecha);
}