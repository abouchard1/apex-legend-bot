# apex-legend-bot
Un bot pour discord qui va vous donner les statistiques du jeu Apex Legends


### Les étapes pour que ça marche

#### Récupération du projet
```
  git clone https://github.com/twinzxr1/apex-legend-bot.git
```

#### Buid le projet
```
npm install
```

#### Lancer le projet
```
DISCORD_TOKEN=xxxxx CHAN_ID=yyyyy node main
```

xxxxx = Votre token discord cf .https://github.com/twinzxr1/apex-legend-bot/blob/master/README.md#r%C3%A9cup%C3%A9rer-son-token-discord

yyyyy = Votre id de channel cf.https://github.com/twinzxr1/apex-legend-bot/blob/master/README.md#r%C3%A9cup%C3%A9rer-son-id-de-channel

#### Créer son bot sur le site Discord
- Aller sur la page d'application https://discordapp.com/developers/applications/
- Créer une nouvelle application
- Aller dans l'onglet **Bot** puis  créer un bot
- Aller sur le site https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot ,
  remplacer le APP_ID par votre Client/Application ID
- Sélectionner votre serveur

#### Récupérer son token discord
- Aller sur la page d'application https://discordapp.com/developers/applications/
- Sélectionner votre application
- Dans l'onglet **Bot** vous pouvez copier le **Token**

#### Récupérer son id de channel
- Sur discord, aller dans vos **Paramètres utilisateur**
- Aller sur l'onglet **Apparence**
- En bas, cocher le **Mode développeur**
- Vous pouvez désormais récupérer votre id de channel en faisant un clic droit sur votre channel puis **Copier l'identifiant**


### Les fonctionnalités

#### Commandes du bot
- !help : Affiche la liste des commandes du bot
- !apex-stats 'pseudo' : Affiche les stats du compte
- !apex-global-stats : Affiche les stats globales des legends
