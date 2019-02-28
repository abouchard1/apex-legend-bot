# apex-legend-bot
Un bot pour Discord qui va vous donner les statistiques du jeu Apex Legends

## Les fonctionnalités

### Commandes du bot
- !apex-stats 'pseudo' : Affiche les stats du compte
- !apex-global-stats : Affiche les stats globales des legends
- !help : Affiche la liste des commandes du bot

## Les étapes

### Récupération du projet
```
  git clone https://github.com/twinzxr1/apex-legend-bot.git
```

### Construire le projet
```
npm install
```

### Lancer le projet
```
DISCORD_TOKEN=xxxxx CHAN_ID=yyyyy node main
```

xxxxx = Votre token Discord [Tuto](#récupérer-son-token-discord)

yyyyy = Votre ID de channel [Tuto](#récupérer-son-id-de-channel)

### Créer son bot sur le site Discord
- Aller sur la page d'application https://discordapp.com/developers/applications/
- Créer une nouvelle application
- Aller dans l'onglet **Bot** puis créer un bot
- Aller sur le site https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot,
  remplacer le APP_ID par votre Client/Application ID
- Sélectionner votre serveur

### Récupérer son token Discord

- Aller sur la page d'application https://discordapp.com/developers/applications/
- Sélectionner votre application
- Dans l'onglet **Bot**, vous pouvez copier le **Token**

### Récupérer son ID de channel

- Sur Discord, aller dans vos **Paramètres utilisateur**
- Aller sur l'onglet **Apparence**
- En bas, cocher le **Mode développeur**
- Vous pouvez désormais récupérer votre ID de channel en faisant un clic droit sur votre channel puis **Copier l'identifiant**


