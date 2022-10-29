const { Client, Collection, GatewayIntentBits, Events,} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./client-config.json');

client.commands = new Collection();

const { exec } = require('child_process');
exec('node deploy-commands.js', (err, stdout, stderr) => {
	if (err) {
		console.log(`[ERROR] Couldn't deploy slash commands.`);
		console.log(`[ERROR] stderr -> ${stderr}`);
	  return;
	}
	console.log(stdout);
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const activities_list = [
    " ", 
    " ",
    " ", 
    " "
    ];

client.on('ready', () => {
  console.log('[INFO] Commands found -> ' + commandFiles)
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
        console.log(`[INFO] Status updated -> ` + activities_list[index]);
    }, 10000);
  console.log(`[INFO] Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);