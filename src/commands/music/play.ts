import { RunFunction } from "../../types/command";
import { youtubeVideo } from '../../include/youtubeconnector';
import ytdl from 'ytdl-core';
const name: string = 'play';
const description: string = 'Play music through bot';
const category: string = 'music';

const run: RunFunction = async(client, message, args) => {
    if(!client.playlist || client.playlist == []) return message.channel.send('No playlist in queue, please add playlist first!');
    if(!client.currentVC) return message.channel.send('There is no vc id stored please setvc first');
    client.currentPlayCount = 1
    try {
        // @ts-ignore
        const connection = await client.channels.cache.get(client.currentVC).join();
        async function player(url) {
            if(!client.playlist[0].videos) return message.channel.send('No playlist queue')
            let basicInfo = await ytdl.getBasicInfo(url);
            if(basicInfo.player_response.playabilityStatus.status == 'UNPLAYABLE') {
                await client.currentPlayCount ++;
                console.log(`Unable to play ${url}`);
                return player(client.playlist[0].videos[client.currentPlayCount - 1]);
            } else {
                client.dispatcher = await connection.play(ytdl(url))
                    .on('finish', () => {
                        if(client.currentPlayCount == client.playlist[0].videos.length) {
                            // console.log(client.currentPlayCount, client.playlist[0].videos.length)
                            client.currentPlayCount = 1;
                        } else {
                            client.currentPlayCount += 1;
                        }
                        player(client.playlist[0].videos[client.currentPlayCount - 1]);
                    })
                    .on('error', console.log);
            }
        }
        player(client.playlist[0].videos[client.currentPlayCount - 1]);
    } catch (error) {
        return message.channel.send(client.embed({ title: '❌ Failed play the playlist' }, message))
        client.logger.error(error);
        throw new Error(error);
    }
}

export { name, description, category, run }