import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type Command = {
  command: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};