import { RunFunction } from '../../types/command';
import { config } from 'dotenv';
import { ytplaylistvideo } from '../../include/youtubeconnector';

config()

const name: string = 'setplaylist';
const description: string = 'Set the playlist';
const category: string = 'music';
const run: RunFunction = async(client, message, args) => {
    try {
        const data = await ytplaylistvideo(args[0]);
        client.playlist = [];
        client.playlist.push(data);
        return message.channel.send(client.embed({ title: '✅ Success set playlist', description: `**Title**: ${data.title}\n**Videos**:${data.videos.length} videos` }, message))
    } catch (error) {
        return message.channel.send(client.embed({ title: '❌ Failed set playlist' }, message))
        client.logger.error(error);
        throw new Error(error);
    }
    
}

export { name, description, category, run }
