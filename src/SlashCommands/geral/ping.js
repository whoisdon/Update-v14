const { EmbedBuilder } = require('discord.js'); 
const Discord = require("discord.js")

module.exports =  {
    name: "ping", 
    description: "Veja meu ping.", 
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {

        let don = new EmbedBuilder() 
        .setColor("#36393e") // Cor invisivel
        .setDescription(`Meu ping atual encontra-se em \`${client.ws.ping}ms\`.`);

        interaction.reply({ embeds: [don], ephemeral: true })

    } 
} 
