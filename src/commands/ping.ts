import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

const ping =  new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Ping the bot');

export const pingCommand: Command = {
  command: ping,
  execute: async (interaction) => {
    await interaction.reply('PONG!');
  },
};