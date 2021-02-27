import { RunFunction } from '../../types/command';
import { config } from 'dotenv';
config()

const name: string = 'clearplaylist';
const description: string = 'Clear the playlist';
const category: string = 'music';
const run: RunFunction = async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) message.channel.send('You need at least manage channels permission');
    try {
        client.dispatcher.pause()
        client.playlist = [];
        return message.channel.send(client.embed({ title: '✅ Success clear playlist' }, message))
    } catch (error) {
        return message.channel.send(client.embed({ title: '❌ Failed clear playlist' }, message))
        client.logger.error(error);
        throw new Error(error);
    }
    
}

export { name, description, category, run }