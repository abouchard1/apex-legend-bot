const Discord = require('discord.io');
const fetch = require('node-fetch');

const tools = require('./tools.js');

// On récupère les variables d'environnement
if (process.env.DISCORD_TOKEN && process.env.CHAN_ID){
    DISCORD_TOKEN = process.env.DISCORD_TOKEN
    CHAN_ID = process.env.CHAN_ID
}
// elles sont obligatoires
else return



// Initialize Discord Bot
const bot = new Discord.Client({
   token: DISCORD_TOKEN,
   autorun: true
});

bot.on('ready', async function (evt) {
    bot.sendMessage({
        to: CHAN_ID,
        message: `Bot connecté`
    });
});


bot.on('message', async function (user, userID, channelID, message, evt) {
    // on écoute uniquement le channel que l'on à configurer dans les variables d'environnements
    if (channelID != CHAN_ID) return

    if (message.substring(0, 1) == '!') {
        args = message.substring(1).split(' ');

        cmd = args[0];

        switch(cmd) {
            case 'help':
                tools.showCommandBot(bot, channelID)
            break;

            case 'apex-global-stats':
                tools.apexGlobalStats(bot, channelID)
            break;

            case 'apex-stats':
                pseudo = args[1];
                tools.apexPseudoStats(bot, channelID, pseudo)
            default:
                tools.sendError(bot, channelID, 16741235, "Commande inconnu, taper !help pour voir la liste des commandes.")
            break;
         }
     }
});