const { Client, channel, SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const client = new Client({ intents: [] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Makes the bot join a voice chat you are on.'),
	async execute(interaction) {
		const connection = joinVoiceChannel({
			channelId: interaction.channel.id,
			guildId: interaction.channel.guild.id,
			adapterCreator: interaction.channel.guild.voiceAdapterCreator,
		});
		await interaction.reply(`!`);
	},
};