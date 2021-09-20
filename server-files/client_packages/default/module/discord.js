mp.events.add('setDiscordStatus', (serverName, status) => {
    mp.discord.update(serverName,status)
});