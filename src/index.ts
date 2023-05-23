import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commandHandler } from './commands';
import { setup } from './rest';

(async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildMessages,
    ]
  });

  client.once(Events.ClientReady, async () => {
    await setup(client);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = commandHandler(interaction.commandName);

    await command.execute(interaction, client)
      .catch(console.error);
  });

  client.login(process.env.BOT_TOKEN);
})();