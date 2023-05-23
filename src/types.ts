import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type Command = {
  command: SlashCommandBuilder;
  execute: (interaction: CommandInteraction, client: Client) => Promise<void>;
};