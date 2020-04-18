module.exports = {
    name: 'ping',
    description: "Renvoit Pong !",
    execute(message, args) {
        message.reply("Pong !");
    },
}