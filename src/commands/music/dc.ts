import { RunFunction } from '../../types/command';
import { config } from 'dotenv';
import { GuildChannel, VoiceChannel } from 'discord.js';

const name: string = 'dc';
const description: string = 'Disconnect from voice channel';
const category: string = 'music';
const run: RunFunction = async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You need at least manage channels permission');
    if(!client.currentVC) return message.channel.send('There is no vc id stored please setvc first');
    try {
        const channel = client.channels.cache.get(client.currentVC) || await client.channels.fetch(client.currentVC);
        // @ts-ignore
        await channel.leave();
        client.currentVC = null;
        return message.channel.send(client.embed({ title: '✅ Success leaving the voice channel' }, message))
    } catch (error) {
        return message.channel.send(client.embed({ title: '❌ Failed leaving the voice channel' }, message))
        client.logger.error(error);
        throw new Error(error);
    }
}

export { name, description, category, run }