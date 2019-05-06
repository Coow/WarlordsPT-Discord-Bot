//General setup
console.log("Initilizing");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const {
    token,
    prefix
    }
    = require("./config.json")

require('console-stamp')(console, '[HH:MM:ss]');

bot.on("message", message =>{
    if (message.channel.type == "dm") return; //Avoid responding to DMs

    if (message.content.toLowerCase().startsWith(prefix) && message.channel.name == "other-botcommands"){
        const args = message.content.toLowerCase().split(" ");
        console.log(args);
    }
    

    else if (message.isMentioned(bot.user)){
        message.reply("Hello, is it me you're looking for?");
    }

    //Else it crashes at times... its stupid like that 
    else {
        return;
    }
});

bot.login(token);