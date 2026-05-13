const fs = require('fs');

module.exports = (cliente) => {
    fs.readdirSync('./eventos/').forEach((dir) => {
        const eventos = fs.readdirSync(`./eventos/${dir}`).filter((archivo) => archivo.endsWith('.js'));
        for (const archivo of eventos) {
            let evento = require(`../eventos/${dir}/${archivo}`);

            if(evento.evento && typeof evento.evento != 'string'){
                console.log('Error: ' + archivo);
                continue;
            }

            evento.evento = evento.evento || archivo.replace('.js', '');

            cliente.on(evento.evento, evento.bind(null, cliente));

            console.log('Evento cargado: ' + evento.evento);
        }
    });
};