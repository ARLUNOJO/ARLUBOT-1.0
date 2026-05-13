module.exports = {
    name: 'ping',
    description: 'Tiempo de respuesta',
    hide: false,
    async execute(msg, args, cliente, discord){
        msg.channel.send('PONG')
    }
};