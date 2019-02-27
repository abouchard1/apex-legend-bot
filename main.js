const Discord = require('discord.io');
const fetch = require('node-fetch');

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

function getCharacterNameByID(id){
    switch(id) {
        case 1:
        return 'Wraith'
        case 2:
        return 'Bangalore'
        case 3:
        return 'Caustic'
        case 4:
        return 'Mirage'
        case 5:
        return 'Bloodhound'
        case 6:
        return 'Gibraltar'
        case 7:
        return 'Lifeline'
        case 8:
        return 'Pathfinder'
        default:
        return 'error'
    }
};

async function getInsightsLegends(){
    response = await fetch(
        `https://apex.tracker.gg/api/v1/insights/legends`,
        {headers: {"TRN-Api-Key": "7bada327-2be7-49f7-ab01-758ee3fce98e"}}
        )
    
    if (response.ok){
        json_result = await response.json();
        return json_result.map(x => {
            x.name = getCharacterNameByID(x.level)
            x.id = x.level
            delete x['level']
            return x
        })
    }
}

async function getInsightsLegendsKpm(){
    response = await fetch(
        `https://apex.tracker.gg/api/v1/insights/legendskpm`,
        {headers: {"TRN-Api-Key": "7bada327-2be7-49f7-ab01-758ee3fce98e"}}
        )
    
    if (response.ok){
        json_result = await response.json();
        toto = json_result.map(x => {
            x.name = getCharacterNameByID(x.id)
            return x
        })
        console.log('toto', toto)
        return toto
    }
    else {
        console.error('error', response)
    }
}

async function getAllInsightsLegends(){
    toto =  {
        'played': await getInsightsLegends(),
        "kpm": await getInsightsLegendsKpm()
    }
    console.log('debug', toto)
    return toto
}

async function getStatsByPseudo(pseudo){
    plateform = 5 // pc
    response = await fetch(
        `https://apex.tracker.gg/api/v1/standard/profile/${plateform}/${pseudo}`,
        {headers: {"TRN-Api-Key": "7bada327-2be7-49f7-ab01-758ee3fce98e"}}
        )
    
    if (response.ok){
        json_result = await response.json();
        stats = json_result.data.stats
        level = stats.find(x => x.metadata.key == 'Level')
        kill = stats.find(x => x.metadata.key == 'Kills')
        return {nom: pseudo, level: level.value, kills: kill.value}
    }
}

bot.on('message', async function (user, userID, channelID, message, evt) {
    console.log('test', channelID, message);

    if (message.substring(0, 1) == '!') {
        args = message.substring(1).split(' ');
        cmd = args[0];
        pseudo = args[1];

        switch(cmd) {
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: '',
                    embed: {
                        color: 3447003,
                        title: 'Commandes du bot',
                        fields: [
                            {
                                name : "!apex-stats 'pseudo'",
                                value : "Affiche les stats du compte",
                                inline: false
                            },
                            {
                                name : "!apex-legends",
                                value : 'Affiche les stats globales des legends',
                                inline: false
                            },
                            {
                                name : "!help",
                                value : 'Affiche ce que tu vois en ce moment 😁',
                                inline: false
                            },
                            {
                                name : "!fan",
                                value : 'Commande bonus',
                                inline: false
                            }
                        ]    
                     
                    }
                });
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
            case 'apex-legends':
                played = await getInsightsLegends()
                kpm = await getInsightsLegendsKpm()
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
                fields_kpm = []
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
                        title: 'Utilisation des legends',
                        fields: fields_played,
                    }
                });
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
            case 'apex-stats':
                stats = await getStatsByPseudo(pseudo)
                bot.sendMessage({
                    to: channelID,
                    message: '',
                    embed: {
                        color: 3447003,
                        fields: [
                            {
                                name : "Nom",
                                value : pseudo,
                                inline: true
                            },
                            {
                                name : "Level",
                                value : `${stats.level} (5%)`,
                                inline: true
                            },
                            {
                                name : "Kills",
                                value : `${stats.kills}`,
                                inline: true
                            }
                        ]    
                     
                    }
                });
            break;
            case 'fan':
            bot.sendMessage({
                to: channelID,
                message: 'Neimad est fan de Fronde.'})
            break;
         }
     }
});