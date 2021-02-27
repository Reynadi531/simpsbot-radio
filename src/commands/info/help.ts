import { Command, RunFunction } from '../../types/command';

const name: string = 'help';
const description: string = 'Tell you available commands';
const category: string = 'info';
let usage: string;
const run: RunFunction = async(client, message, args) => {
    const listcommandsname: string[] = (client.commands).map(a => a.name);
    if(!args || !listcommandsname.includes(args[0])) {
        const listcommandsend: string[] = listcommandsname.map(a => `${"``"}${client.Config.prefix}${a}${"``"}`); 
        message.channel.send(client.embed({ title: 'Help',  description: "Here's command you can try\n" + listcommandsend.join('  ')}, message))
    } else {
        const commandobj: any = client.commands.get(args[0]) 
        message.channel.send(client.embed({ title: `${commandobj.name} command`, description: `**Name**: ${commandobj.name}\n**Description**: ${commandobj.description}\n**Category**: ${commandobj.category}\n**Usage:** ${client.Config.prefix}${commandobj.name}\n` }, message))
    }
}

export { name, description, usage, run, category }