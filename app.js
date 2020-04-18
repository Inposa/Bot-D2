const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const variables = require("./variables.json");


client.on("ready", ()=>{
    console.log(`[${variables.application_name}] Je suis prêt !`)
})

client.on('error',(error)=>{
    console.error(`Une erreur est survenue :\n${error}`)
})

client.on('guildMemberAdd', (member) =>{
    console.log(`${member} vient de rejoindre la guilde ${member.guild}.`)
})

client.on('message', (message)=>{
    if(!message.guild || message.author.bot){return}

    
    console.log(message.content)
})

client.login(config.token)