module.exports = {
    name: "ready",
    once: true,
    execute(client) {

        const activities_list = [ 
            `${client.commands.size} Commands`,
            `${client.guilds.cache.size} guilds`
            ];
            
            const index = Math.floor(Math.random() * activities_list.length);

            console.log(`${client.user.tag} successfully logged in`)

            setInterval(() => {
                const index = Math.floor(Math.random() * (activities_list.length));
                client.user.setActivity(`>>help - ` + activities_list[index]);
            }, 10000);
    }
}