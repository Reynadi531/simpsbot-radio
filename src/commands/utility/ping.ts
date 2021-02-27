import { RunFunction } from '../../types/command';

const name: string = 'ping';
const description: string = 'Return ping value to the bot';
const category: string = 'utility';
const run: RunFunction = (client, message) => {
    return message.channel.send('Pinging...').then(sent => {
        sent.edit(client.embed({ title: `✅ Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms\n✅ WebSocket: ${client.ws.ping}ms` }, message));
    });
}

export { name, description, category, run }