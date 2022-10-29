const { Client, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Replies with time that client runs for.'),
	async execute(interaction) {
		await interaction.reply(`The bot is up for **${Math.round(interaction.client.uptime / 60000)}** hours.`);
	},
};