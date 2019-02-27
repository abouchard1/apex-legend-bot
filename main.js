const Discord = require('discord.io');
const fetch = require('node-fetch');

// On récupère des functions qui écrivent dans le tchat
const tools = require('./tools.js');

//On récupère le token d'accès stocké dans le fichier
const auth = require('./auth.json');

// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', async function (evt) {
    console.log('Connected');
});


bot.on('message', async function (user, userID, channelID, message, evt) {
    console.log('test', channelID, message);

    if (message.substring(0, 1) == '!') {
        args = message.substring(1).split(' ');
        cmd = args[0];
        pseudo = args[1];

        switch(cmd) {
            case 'help':
                tools.showCommandBot(bot, channelID)
            break;
            case 'apex-legends-play':
                played = await getInsightsLegends()
                fields_played = []
                if (played) {
                    played.forEach(element => {
                        fields_played.push({
                            name : element.name,
                            value : `${element.percentage}%`,
                            inline: true
                        })
                    });
                }
                bot.sendMessage({
                    to: channelID,
                    message: '',
                    embed: {
                        color: 3447003,
                        title: 'Utilisation des legends',
                        fields: fields_played,
                    }
                });
            break;
            case 'apex-legends-kpm':
                fields_kpm = []
                kpm = await getInsightsLegendsKpm()
                if (kpm){
                    kpm.forEach(element => {
                        fields_kpm.push({
                            name : element.name,
                            value : `${element.value}`,
                            inline: true
                        }) 
                    });
                }
                bot.sendMessage({
                    to: channelID,
                    message: '',
                    embed: {
                        color: 3447003,
                        title: 'Moyenne des kills par match',
                        fields: fields_kpm,
                    }
                });
            break;
            case 'apex-global-stats':
                tools.apexGlobalStats(bot, channelID)
            break;
            case 'apex-stats':
                tools.apexPseudoStats(bot, channelID, pseudo)
            break;
            case 'fan':
            bot.sendMessage({
                to: channelID,
                message: 'Neimad est fan de Fronde.'})
            break;
         }
     }
});