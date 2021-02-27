import { Glob } from 'glob';
import consola, { Consola } from 'consola';
import { promisify } from 'util';
import { Client, Message, Collection, Intents, MessageEmbed, MessageEmbedOptions, StreamDispatcher } from 'discord.js';
import { Config } from './types/config';
import { Command } from './types/command';
import { Event } from './types/event';

const globPromise = promisify(Glob);

class Bot extends Client {
    public Config: Config;
    public logger: Consola = consola;
    public currentVC: string;
    public playlist: any[];
    public dispatcher: StreamDispatcher;
    public currentPlayCount: number;
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public constructor() {
        super({ ws: { intents: Intents.ALL } })
    }
    public async start(config: Config): Promise<void> {
        this.Config = config;
        this.login(config.token);
        // this.on('debug', console.log);
        const commandFiles: string[] = await globPromise(`${__dirname}/commands/**/*{.ts,.js}`);
        commandFiles.map(async(value: string) => {
            const file: Command = await import(value);
            this.commands.set(file.name, file);
            this.logger.info(`Loaded command ${file.name}`);
        });
        const eventFiles: string[] = await globPromise(`${__dirname}/events/**/*{.ts,.js}`);
        eventFiles.map(async(value: string) => {
            const file: Event = await import(value);
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
        });
    }
    public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
        return new MessageEmbed({ ...options, color: 'RANDOM' }).setTimestamp().setFooter(this.user.username);
    }
}

export { Bot }