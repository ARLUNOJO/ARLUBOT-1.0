
CUMPLES = [
    ['346723055260925953',  'Cherwus',      new Date(2003, 02, 13, 8, 0, 0), ["https://cdn.discordapp.com/attachments/1010658165311938580/1070940935128625213/Slung.png"]],
    ['956956220659486730',  'arlubot',      new Date(2022, 02, 25, 8, 0, 0), ["https://cdn.discordapp.com/attachments/901730319445655553/983988867210293268/images_1.jpeg"]],
    ['639608451185639495',  'maurovc777',   new Date(2000, 03, 07, 4, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1081272156324892753/106155_cumpleanosmauro_EDV.png"]],
    ['728450145934639177',  'Yampi',        new Date(2000, 03, 10, 5, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1071166218343567360/EXhb5rhXgAEeEf6.png"]],
    ['750122202502004896',  'Star',         new Date(2000, 04, 18, 6, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1102004028742844446/FB_IMG_1682630610443.png"]],
    ['339885464381161472',  'ARLUNOJO',     new Date(1999, 05, 08, 8, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1071167084937105540/20221117_232913.jpg"]],
    ['558534047316443159',  'Gminis',       new Date(2003, 05, 21, 6, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/971364466170142750/unknown.png"]],
    ['826821685780676683',  'Cuy',          new Date(2007, 05, 25, 5, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1102394618055757905/8504883177_758532aa39_b.png"]],
    ['408051906464972820',  'MarthaV',      new Date(2003, 06, 30, 5, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1120040578000879798/7c528107-345a-4072-b5cc-b5d7c1aeb9d9.png"]],
    ['787489907920076850',  'Rie',          new Date(2007, 07, 17, 7, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1005593981658333244/unknown.png"]],
    ['591497753339625482',  'GamerfireXD',  new Date(2008, 08, 04, 7, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1005592165642141757/unknown.png"]],
    ['294942208333971458',  'Renzo',        new Date(2004, 09, 24, 5, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1018015716747788308/unknown.png"]],
    ['500365628457353219',  'Milo',         new Date(2004, 09, 25, 5, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1102393631358333029/images_7.jpg"]],
    ['643530588682453012',  'Ukal',         new Date(2009, 10, 07, 7, 0, 0), ["https://cdn.discordapp.com/attachments/957608141275672618/1120044921634693293/a46cb98b-c6fe-41b9-b988-8d55be010894.png"]]
];

exports.CANAL = '901730319445655553';

exports.porximo = proxCumple();

function proxCumple(){
    let test = ['0', 'NULL', new Date(Date.now())];
    let cumple = test;
    let tmp;
    for (let i = 0; i < CUMPLES.length; i++){
        let c = CUMPLES[i];
        c[2].setFullYear(test[2].getFullYear());
        let d = c[2].getTime() - test[2].getTime();
        if (d > 0){
            cumple = CUMPLES[i];
            break;
        }
        else
        {
            CUMPLES[0][2].setFullYear(test[2].getFullYear()+1);
            cumple = CUMPLES[0];
        }
    }
    console.log('Proximo cumpleaños: ' + cumple[1] + " : " + cumple[2]);
    return cumple;
}

let disp = false;

exports.tick = function(cliente, fecha){
    if(exports.porximo[2].getTime() <= fecha.getTime()){
        console.log('Felicitando cumpleaños');
        cliente.channels.fetch(exports.CANAL).then(ch => {
            let msg = {
                content: 'Feliz Cumpleaños a <@' + exports.porximo[0] + '> <:arluf_lite:917169150890229780>🎈🎉💪',
                files: exports.porximo[3]
            };
            ch.send(msg);
            exports.porximo = proxCumple();
        });
    }
}