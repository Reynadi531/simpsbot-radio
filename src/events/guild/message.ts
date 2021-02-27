import { RunFunction } from '../../types/event';
import { Command } from '../../types/command';

const name: string = 'message';
const isArgs: boolean = false;
const run: RunFunction = async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(!message.content.startsWith(client.Config.prefix)) return
    const args: string[] = message.content.slice(client.Config.prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift();

    const command: Command = client.commands.get(cmd);
    if(!command) return;
    command.run(client, message, args).catch((reason: any) => {
        message.channel.send(client.embed({ description: String(reason), title: '❌ Erorr ocure' }, message));
        client.logger.error(reason);
    })
}

export { name, run, isArgs }