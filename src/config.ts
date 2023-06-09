import { z } from 'zod';

const envVariables = z.object({
  BOT_TOKEN: z.string(),
  GUILD_ID: z.string(),
  QOTD_CHANNEL_ID: z.string(),
  QOTD_POOL_CHANNEL_ID: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}