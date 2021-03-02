const  { Client, Collection, MessageEmbed } = require("discord.js")

    module.exports.config = {
      name: "new",
      aliases: ["ticket"]
    }

module.exports.run = async (client, message, args) => {
    const reason = message.content.split(" ").slice(1).join(" ");

    let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");

    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory) {
        SupportCategory = await message.guild.channels.create('Tickets', {
          type: `category`, 
        });
    };


    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory) {
        message.channel.send("Sorry but I do not have permissions to create the category for tickets")
    }

    if (!message.guild.roles.cache.find(role => role.name === "Support Team")) {
        await (message.guild.roles.create({
            name: 'Support Team',
            color: 'BLUE',
        }));
    };

    let supportrole = message.guild.roles.cache.find(role => role.name === "Support Team")
    if (!supportrole) {
        return message.channel.send("Sorry, but there is no support team role in this server. Either create one or give permission to.")
    }

    if (!reason) {
        return message.channel.send("Please specify a ticket subject \n \` g!new {subject}\`")
    }

    const channelName = `ticket-${message.author.username}-${message.author.discriminator}`
    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`)) {
        return message.channel.send("Sorry, but you already have a ticket open!")
    }

    message.guild.channels.create(channelName, { parent: SupportCategory.id, topic: `Ticket Owner: ${message.author.id}` })
        .then(c => {
        const everyone = message.guild.roles.cache.find(role => role.name === "everyone")
        c.updateOverwrite(sr, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
        let CreatedTicketEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("New Support Ticket")
            .setDescription(`<@${message.author.id}> Your support ticket channel is <3${c.id}>`)
            message.channel.send(CreatedTicketEmbed)
            let GreetEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("New Support Ticket")
            .setField("New Support Ticket", `<@${message.author.id}> Thanks formaking a support ticket we will be with you shortly`) 
            c.send(GreetEmbed)
    }).catch(console.error);

}



