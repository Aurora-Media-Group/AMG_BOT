const {Client, Collection, MessageEmbed} = require('discord.js');
const {token, prefix} = require('./config.json');
const client = new Client({ disableMentions: "everyone" });

const fs = require('fs');
const command = require('./handlers/command');

var token = process.env.TOKEN;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
  console.log('The client is ready!')

  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })
})


client.on('message', async message => {
if(!message.guild){
    let args = message.content.trim().split(/ +/g);
    let msg = args.join(" ")
    client.channels.fetch("709551785261400095",false).then(channel => {
      let fembed = new MessageEmbed()
          .setTitle("New Direct Message")
          .setColor("#0477C2")
          .addFields(
              {name: "***User Name:***", value:`User tag: ${message.author.tag}\nUser Id: ${message.author.id}`},
              {name: "***Message:***", value:`${msg}`}
          )
      channel.send(fembed)
  })
  }
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLocaleLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args)
});


client.on('ready', () => {
  client.user.setActivity('www.auroramediagroup.xyz')

  .then(Presence => console.log(`Activity set to ${Presence.activities[0].name}`))

  .catch(console.error);
});


client.on(`message`, message => {
  let args = message.content.substring(prefix.length).split(" ");

  if(message.content.startsWith(`${prefix}avatar`)){
    client.commands.get('avatar').execute(message, args);
  }
})





client.on('guildBanAdd', async (guild, user) => {
	console.log(`${user.tag} got rekt from ${guild.name}.`);
});

client.on("guildMemberAdd", async (member) => {
    member.guild.systemChannel.send(`Welcome ${member.mention}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    return
});



client.login(token);