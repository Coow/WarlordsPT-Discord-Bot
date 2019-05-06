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

    if (message.content.toLowerCase().startsWith(prefix + "pt") && (message.channel.name == "bot-commands" || message.channel.name == "bot-testing")){
        const args = message.content.toLowerCase().split(" ");
        console.log(args);

        if((args[1] == "setup") && message.author.id == admin){
            message.guild.createRole({
                name: "BotManager",
                color: "BLUE",
                permissions: ["MANAGE_CHANNELS", "VIEW_AUDIT_LOG"]
            });
        }
    }
    
    //TODO Sync https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/understanding/roles.md#get-all-members-that-have-a-role
    else if (message.isMentioned(bot.user)){
        message.reply("Hello, is it me you're looking for?");
    }

    //Else it crashes at times... its stupid like that 
    else {
        return;
    }
});

bot.on('guildMemberAdd', member => {
    console.log ("User " + member.user + " has joined the server!");
    var role = member.guild.roles.find("name", "Civilians");
    member.addRole(role.id);
});

bot.login(token);