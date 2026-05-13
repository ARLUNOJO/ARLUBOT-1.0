const fs = require('fs');

module.exports = (cliente) => {
    fs.readdirSync(`./comandos/`).forEach((dir) => {
        const comandos = fs.readdirSync(`./comandos/${dir}`).filter((archivo) => archivo.endsWith('.js'));

        for (const arch of comandos) {
            const cmd = require(`../comandos/${dir}/${arch}`);
            cmd.categoria = dir;
            cliente.comandos.set(cmd.name, cmd);
            if(cmd.name){
                console.log(cmd.name);
            }
            else {
                console.log('Error:' + cmd.name);
            }
        }
    })
};