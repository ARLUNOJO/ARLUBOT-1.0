const { Client } = require("discord.js");

exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.elemAleatorio = function(palabras){
    if(palabras.length == 1){
        return palabras[0];
    }
    return palabras[exports.getRandomInt(0, palabras.length)];
}
/**
 * @param {Client} client
 */
exports.miembroAleatorio = function(client, guildid, usr){
    const guild = client.guilds.cache.get(guildid);
    const members = guild.members.cache.filter(member => member.user.tag != usr);
    return members.random();
}

exports.format = function (str, args) {
    return str.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] == 'undefined' ? match : args[index];
    });
  };