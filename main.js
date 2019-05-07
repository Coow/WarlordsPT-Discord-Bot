//General setup
console.log("Initilizing");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const {
    token,
    prefix,
    admin
    }
    = require("./config.json")

require('console-stamp')(console, '[HH:MM:ss]');

bot.on("message", message =>{
    if (message.channel.type == "dm") return; //Avoid responding to DMs

    if (message.content.toLowerCase().startsWith(prefix) && (message.channel.name == "bot-commands" || message.channel.name == "bot-testing")){
        const args = message.content.toLowerCase().split(" ");
        console.log(args);

        if((args[1] == "setup") && message.author.id == admin){
            if (!roleExistByName("BotManager")) {
                message.guild.createRole({
                name: "BotManager",
                color: "BLUE",
                permissions: ["MANAGE_CHANNELS", "VIEW_AUDIT_LOG"]
            });}
            //#region Classes
            if (!roleExistByName("cTank")) {
                message.guild.createRole({
                name: "cTank"
            });}
            if (!roleExistByName("cMage")) {
                message.guild.createRole({
                name: "cMage"
            });}
            if (!roleExistByName("cArcher")) {
                message.guild.createRole({
                name: "cArcher"
            });}
            if (!roleExistByName("cHealer")) {
                message.guild.createRole({
                name: "cHealer"
            });}
            //#endregion

            //#region Roles

            //#endregion
        }
        if((args[1] == "begone") && message.author.id == admin){
            bot.destroy();
        }
        if(args[1] == "class"){
            //Clear classes
            if(args[2] == "remove") {
                clearClass();
                return;
            }
            if (!args[2] || !["tank", "mage", "archer", "healer"].includes(args[2].toLowerCase())) {
                return message.channel.send("No such role found :/");
            }
            const roles = {
                tank: "cTank",
                mage: "cMage",
                archer: "cArcher",
                healer: "cHealer"
            }

            const role = message.guild.roles.find(r => r.name === roles[args[2].toLowerCase()])

            if(userHasClass()) {
                message.channel.send("You already have a class. Please do: `" + prefix + " class remove` and try the command again!");
                return;
                console.log("");
            } else {
                message.member.addRole(role.id)
                return message.channel.send(`Class (${roles[args[2].toLowerCase()]}) has been assigned!`)
            }            
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


    //#region Functions that can be called inside on.Message
    /**
     * 
     * @param {String} input Role name to search for
     */
    function roleExistByName(input) {
        if(message.guild.roles.find("name", input)){
            console.log("Role " + input + " exist");
            return true;
        } else {
            console.log("Role " + input + " doesnt exist");
            return false;
        }
    }
    /**
     * This should defently be changed into a for loop, but this is some quick coding to make it work :D
     * Please dont kill me..
     */
    function userHasClass(){
        var tankRole = message.guild.roles.find("name", "cTank");
        var mageRole = message.guild.roles.find("name", "cMage");
        var archerRole = message.guild.roles.find("name", "cArcher");
        var healerRole = message.guild.roles.find("name", "cHealer");

        if(message.member.roles.has(tankRole.id)) {
            console.log("Has tank");
            return true;
        }
        if(message.member.roles.has(mageRole.id)) {
            console.log("Has mage");
            return true;
        }
        if(message.member.roles.has(archerRole.id)) {
            console.log("Has archer");
            return true;
        }
        if(message.member.roles.has(healerRole.id)) {
            console.log("Has healer");
            return true;
        }
        else {
            console.log("User did not have any classes set");
            return false;
        }     
    }

    /**
     * Clears the classes that the user has
     */
    function clearClass(){

        var msg = "Cleared class, you can now get a new one!"

        var tankRole = message.guild.roles.find("name", "cTank");
        var mageRole = message.guild.roles.find("name", "cMage");
        var archerRole = message.guild.roles.find("name", "cArcher");
        var healerRole = message.guild.roles.find("name", "cHealer");

        if(message.member.roles.has(tankRole.id)) {
            message.member.removeRole(tankRole)
            message.channel.send(msg);
            return;
        }
        if(message.member.roles.has(mageRole.id)) {
            message.member.removeRole(mageRole.id)
            message.channel.send(msg);
            return;
        }
        if(message.member.roles.has(archerRole.id)) {
            message.member.removeRole(archerRole.id)
            message.channel.send(msg);
            return;
        }
        if(message.member.roles.has(healerRole.id)) {
            message.member.removeRole(healerRole.id)
            message.channel.send(msg);
            return;
        }
        else {
            message.channel.send("You dont have any classes currently! Please do: `" + prefix + "class <valid class>` too set a role.");
            return false;
        }  
    }
    //#endregion
});

bot.on('guildMemberAdd', member => {
    console.log ("User " + member.user + " has joined the server!");
    var role = member.guild.roles.find("name", "Civilians");
    member.addRole(role.id);
});

bot.login(token);