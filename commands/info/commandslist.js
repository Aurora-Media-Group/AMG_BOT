const { MessageEmbed } = require('discord.js')

module.exports = {
    name:'commands',
    category: 'info',
    aliases: [''],
    description: '',
    run: async(client, message, args) => {
        let myEmbed = new MessageEmbed()
        .setColor('#0477C2')
    .setTitle('')
    .addFields(
        { name: 'Commands', value: 'g!help,g!userinfo,g!hug @someone,g!cool @someone,g!avatar @someone (you can type it without mention and with mention),g!ticket (reason)'})
    .setTimestamp()
        message.channel.send(myEmbed);
        console.log()
    }
}