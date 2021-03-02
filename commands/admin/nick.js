const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nick',
    category: 'admin',
    aliases: [''],
    description: '',
    run: async (client, message, args) => {
      user = message.mentions.users.first()
      user.setNickname(message.content.replace('g!nick ', ''));
    }
  }