module.exports = {
  name: 'cmds',
  category: 'dev',
  aliases: [''],
  description: '',
  run: async (client, message, args) => {
    console.log(client.commands.get())
  }
}