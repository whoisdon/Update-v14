const client = require('../../index')

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({ content: "Opss... Algo de errado não está certo, tente novamente!", ephemeral: true });
   //  await interaction.deferReply({ ephemeral: false }).catch((err) => { console.log(err) });
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction, args);
  }

  if (interaction.isContextMenuCommand()) {
  //  await interaction.deferReply({ ephemeral: false }).catch((err) => { console.log(err) });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});