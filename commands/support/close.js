const { Message, Client, MessageAttachment } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'close',
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message) => {
    if (message.channel.parentID !== '816328167626768406') return message.channel.send('You can only use this command in a ticket!');
    const transcriptChannel = message.guild.channels.cache.get('689584207114272768');
    message.channel.send('Deleting ticket in 5 seconds.....');
    setTimeout(() => {
      message.channel.delete().then(async (ch) => {
        // This line has error which I guess is being thrown below
        client.ticketTranscript.findOne({ Channel: ch.id }, async (err, data) => {
          //
          if (err) throw err;
          if (data) {
            const channel = (channel = client.channels.cache.get('817124584729346049'));
            channel.send(ch.id);
            fs.writeFileSync(`../${ch.id}.txt`, data.Content.join('\n\n'));
            transcriptChannel.send(`${message.guild.members.cache.get(ch.name).user.username}'s ticket have been closed.`);
            await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
            client.ticketTranscript.findOneAndDelete({ Channel: ch.id });
          }
        });
      });
    }, 5000);
  },
};
