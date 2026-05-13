const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'gearcalc',
    description: 'Calcula los puntos de un gear, a partir del número de mejoras (no es exactamente precisa)',
    args: ["perfectPts", "feverMult", "comboMult", "elementales", "t1e | t5 | t5e | t10 | t10e"],
    hide: false,
    execute: correr,
};

PPTS = [
    200,
    205,
    210,
    215,
    220,
    226,
    231,
    236,
    241,
    245,
    250,
    255,
    259,
    263,
    267,
    271,
    275,
    279,
    283,
    287,
    291,
    294,
    298,
    301,
    305,
    307.57,
    312,
    315,
    318,
    321,
    324,
    327,
    330,
    333,
    336,
    338,
    341,
    343,
    346,
    348,
    350,
    351,
    354,
    357,
    360,
    363,
    366,
    369,
    373,
    376,
    379,
    383,
    386,
    389,
    392,
    395,
    399,
    402,
    405,
    408,
    411,
    414,
    417,
    420,
    423,
    426,
    428,
    431,
    433,
    436,
    438,
    440,
    442,
    444,
    445,
    447,
    448,
    448,
    449,
    449,
    450
];

FMULS = [
    3.000000,
    3.061700,
    3.128633,
    3.190392,
    3.250450,
    3.314013,
    3.372099,
    3.430160,
    3.484101,
    3.535963,
    3.589432,
    3.641491,
    3.691600,
    3.742150,
    3.789900,
    3.838945,
    3.885128,
    3.930200,
    3.977287,
    4.022993,
    4.063661,
    4.108014,
    4.149888,
    4.189400,
    4.229440,
    4.269700,
    4.307801,
    4.345001,
    4.382545,
    4.417600,
    4.454833,
    4.490410,
    4.524999,
    4.556811,
    4.588767,
    4.621953,
    4.650802,
    4.676599,
    4.705721,
    4.730519,
    4.751020,
    4.760919,
    4.774986,
    4.787900,
    4.802733,
    4.819470,
    4.834911,
    4.850383,
    4.866499,
    4.884120,
    4.899308,
    4.911229,
    4.931686,
    4.948637,
    4.964433,
    4.980016,
    4.996222,
    5.011860,
    5.027761,
    5.043788,
    5.058999,
    5.073620,
    5.087601,
    5.102810,
    5.117161,
    5.131370,
    5.144622,
    5.157480,
    5.169102,
    5.181601,
    5.192952,
    5.203090,
    5.212312,
    5.220951,
    5.229252,
    5.235155,
    5.241320,
    5.244380,
    5.248250,
    5.252899,
    5.253400
];

CMULS = [
    2.000000,
    2.005269,
    2.026668,
    2.035827,
    2.055298,
    2.066913,
    2.082192,
    2.097998,
    2.113277,
    2.120979,
    2.129083,
    2.146701,
    2.159642,
    2.168300,
    2.175448,
    2.191271,
    2.201256,
    2.211370,
    2.222812,
    2.233028,
    2.242825,
    2.252371,
    2.261011,
    2.271292,
    2.280740,
    2.289700,
    2.298623,
    2.314542,
    2.323667,
    2.330078,
    2.334943,
    2.338900,
    2.345627,
    2.360906,
    2.362600,
    2.370266,
    2.376185,
    2.383000,
    2.391992,
    2.394908,
    2.399605,
    2.403646,
    2.407271,
    2.414770,
    2.420831,
    2.427300,
    2.433051,
    2.438356,
    2.446357,
    2.453635,
    2.459422,
    2.468915,
    2.472425,
    2.479862,
    2.485250,
    2.491681,
    2.498213,
    2.504298,
    2.510610,
    2.517065,
    2.523054,
    2.528754,
    2.537466,
    2.542560,
    2.546569,
    2.552136,
    2.557377,
    2.562788,
    2.567416,
    2.572200,
    2.576242,
    2.580566,
    2.584460,
    2.587950,
    2.591300,
    2.594055,
    2.595799,
    2.597300,
    2.598450,
    2.599430,
    2.600000
];



function correr(msg, args, cliente){
    if(args.length < 4){
        return false
    }
    var usarSec = args[3].includes('-');
    var embed = new MessageEmbed();
    var titulo = "Calculadora de gear";
    var txt = "";
    var buffp = 0;
    var buffe = 0;
    var buffes = 0;
    var elemPoints = 0;
    var elemSecPoints = 0;
    switch(args[4]){
        case('t1e'):
        titulo = "Calculadora de gear (top 1 elemntal)"
        buffe = 35;
        break;
        case('t5'):
        titulo = "Calculadora de gear (top 5)"
        buffp = 25;
        buffes = 30;
        break;
        case('t5e'):
        titulo = "Calculadora de gear (top 5 elemental)"
        buffp = 25;
        buffe = 30;
        break;
        case('t10'):
        titulo = "Calculadora de gear (top 10)"
        buffp = 20;
        buffes = 25;
        break;
        case('t10e'):
        titulo = "Calculadora de gear (top 10 elemental)"
        buffp = 20;
        buffe = 25;
        break;
    }
    var perfectPoints = PPTS[Math.min(Math.round(args[0]) + buffp, 80)];
    var feverMult = FMULS[Math.min(Math.round(args[1]) , 80)];
    var comboMult = CMULS[Math.min(Math.round(args[2]), 80)];
    var perfects = 0;
    var perfectsCombo = 0;
    var perfectsComboFever = 0;
    if(usarSec){
        var epts = args[3].split('-');
        elemPoints = Math.round(epts[0]) + buffe;
        elemSecPoints = Math.round(epts[1]) + buffes;
        perfects = (perfectPoints + elemSecPoints + (elemPoints * 2)) * (((comboMult - 1) / 100) + 1);
        perfectsCombo = ((elemPoints * 2) + perfectPoints + elemSecPoints) * comboMult;
        perfectsComboFever = ((elemPoints * 2) + perfectPoints + elemSecPoints) * (comboMult * feverMult);
    }else{
        elemPoints = Math.round(args[3]) + buffe;
        perfects = (perfectPoints + (elemPoints * 3)) * (((comboMult - 1) / 100) + 1);
        perfectsCombo = ((elemPoints * 3) + perfectPoints) * comboMult;
        perfectsComboFever = ((elemPoints * 3) + perfectPoints) * (comboMult * feverMult);
    }
    embed.setColor('#001efe');
    embed.setTitle(titulo);
    txt += '**Perfects:**\t\t' + Math.round(perfects) + '\n';
    txt += '**Perfects + Combo:**\t' + Math.round(perfectsCombo) + '\n';
    txt += '**Perfects + Combo + Fever:** ' + Math.round(perfectsComboFever) + '\n';
    embed.setDescription(txt);

    msg.reply({embeds: [embed]});
    return true;
}