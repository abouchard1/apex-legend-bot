const Discord = require('discord.io');
const fetch = require('node-fetch');

// On récupère des functions qui écrivent dans le tchat
const tools = require('./tools.js');

// Si on passe le token en variable d'environnement
if (process.env.TOKEN){
    auth = {
        "token" : process.env.TOKEN
    }
}
// Sinon récupère le token d'accès stocké dans le fichier
else {
    auth = require('./auth.json');
}

// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', async function (evt) {
    bot.sendMessage({
        to: '550105564336750602',
        message: `Bot connecté, ${s3}`
    });
});


bot.on('message', async function (user, userID, channelID, message, evt) {
    //console.log('test', channelID, message);

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