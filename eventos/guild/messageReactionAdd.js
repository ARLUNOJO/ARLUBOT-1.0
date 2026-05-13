const { encuestas } = require("../../env");

module.exports = async (cliente, reaction, usuario) => {
    if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
    if(reaction.message.id == cliente.encuesta.msgId && !cliente.encuesta.terminada && !usuario.bot){
        cliente.channels.fetch(encuestas).then(ch => {
            cliente.encuesta.actualizarEncuesta(ch);
        });
    }
}