const { Client, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with time that took to route data between API and client.'),
	async execute(interaction) {
		await interaction.reply(`Pong! Route latency is **${interaction.client.ws.ping}ms**!`);
	},
};