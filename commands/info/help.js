const { MessageEmbed } = require('discord.js')

module.exports = {
    name:'help',
    category: 'info',
    aliases: [''],
    description: '',
    run: async(client, message, args) => {
        let myEmbed = new MessageEmbed()
        .setColor('#0477C2')
    .setTitle('')
    .addFields(
        { name: 'How to use the bot', value: 'Every command needs to start with g!'},
        { name: 'Information', value: 'You can check our website. (https://www.auroramediagroup.xyz) If you want to check the commands do g!commands.Have a question?Need support?Use g!ticket (reason)'},
)
    .setTimestamp()
        message.channel.send(myEmbed);
    }
}