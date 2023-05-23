import { 
  ChannelType, 
  Client,
  EmbedBuilder, 
  Message,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import tryToCatch from 'try-to-catch';
import { Command } from '../types';

const pickQotd =  new SlashCommandBuilder()
  .setName('pick')
  .setDescription('Picks a random message from channel');

const fetchChannel = async (client: Client, id: string): Promise<TextChannel> =>
  client.channels.fetch(id)
    .then((channel) => {
      if (!channel || channel.type !== ChannelType.GuildText) {
        throw new Error(
          `The channel with the ID of "${id}"`
          + ' does not exist or is the wrong channel type.'
        );
      }

      return channel;
    });

const fetchRandomMessage = async (channel: TextChannel, limit = 10): Promise<Message> =>
  channel.messages.fetch({ limit })
    .then((messages) => {
      if (messages.size === 0) {
        throw new Error('No message found');
      }

      return messages.random(1)[0];
    });

const generateEmbedMessage = (description = 'No content', imageUrl?: string) => {
  const dateToday = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
  const embed = new EmbedBuilder()
    .setTitle('QOTD for ' + dateToday)
    .setDescription(description);

  if (imageUrl) {
    embed.setImage(imageUrl);
  }

  return embed;
};
  
export const pickQotdCommand: Command = {
  command: pickQotd,
  execute: async (interaction, client) => {
    await interaction.deferReply();

    const fetchChannelById = (id: string) => fetchChannel(client, id);

    const [poolErr, qotdPoolChannel] = await tryToCatch(fetchChannelById, process.env.QOTD_POOL_CHANNEL_ID);

    if (poolErr) {
      await interaction.editReply(poolErr.message);
      return;
    }

    const [messageErr, randomMessage] = await tryToCatch(fetchRandomMessage, qotdPoolChannel);

    if (messageErr) {
      await interaction.editReply(messageErr.message);
      return;
    }

    const [qotdErr, qotdChannel] = await tryToCatch(fetchChannelById, process.env.QOTD_CHANNEL_ID);

    if (qotdErr) {
      await interaction.editReply(qotdErr.message);
      return;
    }

    const image = randomMessage.attachments.size > 0 ? randomMessage.attachments.at(0) : null;

    const embed = generateEmbedMessage(randomMessage.content, image?.url);

    await Promise.all([
      qotdChannel.send({ embeds: [embed] }),
      randomMessage.delete(),
    ]);

    await interaction.editReply('Done posting the QotD');
  },
};