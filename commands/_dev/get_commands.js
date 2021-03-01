module.exports = {
  name: 'nick',
  category: 'admin',
  aliases: [''],
  description: '',
  run: async (client, message, args) => {
    console.log(client.commands.get())
  }
}