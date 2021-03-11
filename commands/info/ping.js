module.exports = {
  name: "ping",
  run: async (client, message, args) => {
    message.channel.send(`Finding bot's ping`).then(msg => {
      const ping = msg.createdTimestamp = message.createdTimestamp;
      msg.edit(`Bot's ping is ${ping}ms`)
    })
  }  
}