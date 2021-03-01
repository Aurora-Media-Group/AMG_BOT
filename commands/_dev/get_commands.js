const Discord = require('discord.js'); 
const fs = require("fs");

module.exports = {
    name: 'cmds',
    description: 'Lists available commands',
    cateegory: 'dev'

    run: async (client, message, args, con) {
        fs.readdir("./commands/", (err, files) => {
            if(err) console.error(err);
    
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if(jsfiles.length <= 0) {
                console.log("No commands to load!");
                return;
            }
            
            var namelist = "";
            var desclist = "";
            
            let result = jsfiles.forEach((f, i) => {
                let props = require(`./${f}`);
                namelist = props.name;
                desclist = props.description;
                message.author.send(`**${namelist}** \n${desclist} \n`);
            });
     

     
        });
    }