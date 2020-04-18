const fs = require("fs")

const Discord = require("discord.js");
const {prefix, token} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

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
    if(!message.content.startsWith(prefix.toLowerCase())){return}

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    console.log(`${commandName} ${args}`);

    if(!client.commands.has(commandName)){return}

    const command = client.commands.get(commandName);

    try{
        command.execute(message, args);
        console.log(`${command.name} ${command.description}`)
    }
    catch(e){
        console.error(e);
    }

})

client.login(token)