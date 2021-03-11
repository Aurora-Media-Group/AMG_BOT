const { MessageEmbed } = require('discord.js')

module.exports = {
    name:'say',
    category: 'fun',
    aliases: [''],
    description: '',
    run: async(client, message, args) => {
       message.delete()
       message.channel.send(" ".join(args))
    }
}