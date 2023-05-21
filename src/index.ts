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

    await commandHandler(interaction.commandName).execute(interaction);
  });

  client.login(process.env.BOT_TOKEN);
})();