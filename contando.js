exports.contando = '1071167765785874522';
exports.contandomsgid = '1071169788010840084';
exports.contandomsg = null;
exports.conteo = 0;

exports.contar = async function(msg){
    if(exports.contandomsg == null){
        await msg.channel.messages.fetch(exports.contandomsgid)
        .then((message) => 
        {
            exports.contandomsg = message;
            console.log(message.content);
        });
        if(exports.contandomsg.content.includes('ola')){
            await exports.contandomsg.edit('0');
        }
        exports.conteo = parseInt(exports.contandomsg.content);
        console.log(`Numero actual: ${exports.conteo}`);
    }
    porcConteo(msg);
}

function porcConteo(msg){
    if(msg.content.includes('\n') || Number(msg.content) != exports.conteo + 1){
        msg.delete();
    }else{
        exports.conteo ++;
        exports.contandomsg.edit(`${exports.conteo}`);
    }
}

function procDesconteo(msg){

}