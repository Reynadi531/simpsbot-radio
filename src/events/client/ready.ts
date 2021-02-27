import { RunFunction } from '../../types/event';
import { Bot } from '../../client';
import { config } from 'dotenv';
config();
const name: string = 'ready';
const run: RunFunction = async(client: Bot) => {
    client.user.setActivity(process.env.status)
    client.logger.success(`Logged in as ${client.user.tag}`);
}

export {
    name,
    run
}