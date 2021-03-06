const { Client, Message } = require('discord.js')

module.exports = {
    name : 'ticket',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        message.delete()
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return ch.send(`${message.author}, You already have a ticket open.`)
        message.guild.channels.create(`${message.author.id}`, {
            type : 'text',
            parent : '816328167626768406',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            //message.reply(`click <#${channel.id}> to view your ticket`)
            channel.send(`${message.author}, welcome to your ticket! We will be with you soon. In order to close the ticket, you need to type g!close`)
        })
    }
}