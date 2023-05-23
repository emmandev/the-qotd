import { Command } from '../types';
import { pickQotdCommand } from './pick-qotd';
import { pingCommand } from './ping';

export const COMMANDS = {
  [pickQotdCommand.command.name]: pickQotdCommand,
  [pingCommand.command.name]: pingCommand,
};

const handler = (commands: Record<string, Command>) => (name: string): Command => {
  if (!commands[name]) {
    throw new Error('Command not found');
  }

  return commands[name];
};

export const commandHandler = handler(COMMANDS);