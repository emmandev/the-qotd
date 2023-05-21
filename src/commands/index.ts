import { Command } from '../types';
import { pingCommand } from './ping';

export const COMMANDS = {
  [pingCommand.command.name]: pingCommand,
};

const handler = (commands: Record<string, Command>) => (name: string): Command => {
  if (!commands[name]) {
    throw new Error('Command not found');
  }

  return commands[name];
};

export const commandHandler = handler(COMMANDS);