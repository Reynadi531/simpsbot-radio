import { RunFunction } from '../../types/command';
import { config } from 'dotenv';
config();

const name: string = 'setvc';
const description: string = 'Set the voice channel';
const category: string = 'music';
const run: RunFunction = async(client, message, args) => {
    if(!args[0] && isNaN(Number(args[0]))) return message.channel.send(`Require arguments | ${client.Config.prefix}${name} <voice channel id>`);
    try {
        const channel = client.channels.cache.get(args[0]) || await client.channels.fetch(args[0]);
        // @ts-ignore
        await channel.join();
        client.currentVC = args[0]
        message.channel.send(client.embed({ title: '✅ Success join voice channel' }, message))
    } catch (error) {
        return message.channel.send(client.embed({ title: '❌ Failed join voice channel' }, message))
        client.logger.error(error);
        throw new Error(error);
    }
}

export { name, description, category, run }
