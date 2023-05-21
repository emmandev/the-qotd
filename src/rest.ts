import { Client, REST } from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { COMMANDS } from './commands';

export const setup = async (client: Client) => {
  if (!client.user) {
    throw new Error('Client is not ready');
  }

  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      client.user.id,
      process.env.GUILD_ID
    ),
    {
      body: Object.values(COMMANDS).map((command) => command.command.toJSON()),
    }
  )
};