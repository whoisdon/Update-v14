const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const chalk = require("chalk");

module.exports = async (client) => {
    
   const slashCommands = await globPromise(
        `${process.cwd()}/src/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);

    });
  
    const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
    eventFiles.map((value) => require(value)
    );

    process.on("shardError", (reason, p) => {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
           chalk.white("["),
           chalk.red.bold("AntiCrash"),
           chalk.white("]"),
           chalk.gray(" : "),
           chalk.white.bold("Unhandled Rejection/Catch")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(reason, p);
     });
    process.on("uncaughtException", (err, origin) => {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
           chalk.white("["),
           chalk.red.bold("AntiCrash"),
           chalk.white("]"),
           chalk.gray(" : "),
           chalk.white.bold("Uncaught Exception/Catch")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(err, origin);
     });
};
