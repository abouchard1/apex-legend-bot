const fetch = require('node-fetch');


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
    else {
        return sendError(bot, channelID, 16741235, "Problème de récupération des données...")
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
        return toto
    }
    else {
        return sendError(bot, channelID, 16741235, "Problème de récupération des données...")
    }
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
    else {
        return sendError(bot, channelID, 16741235, "Problème de récupération des données...")
    }
}

module.exports = {
    sendError: function sendError(bot, channelID, color, message){
        bot.sendMessage({
            to: channelID,
            message: '',
            embed: {
                color: color,
                title: message
            }
        })
    },
    showCommandBot: function showCommandBot(bot, channelID){
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
                        name : "!apex-global-stats",
                        value : 'Affiche les stats globales des legends',
                        inline: false
                    }
                ]    
            
            }
        });
    },

    apexGlobalStats: async function apexGlobalStats(bot, channelID){
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
    },

    apexPseudoStats: async function apexPseudoStats(bot, channelID, pseudo){
        if (!pseudo) {
            return sendError(bot, channelID, 16741235, "Le pseudo est requis, exemple: !apex-stats Fr0nde")
        }
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
    }
}