// import { winstonLogger } from '@josephboadi/joy-jobber-shared';
// import { config } from '@users/config';
import { config } from '@useractivity/config';
import client, { Channel, Connection } from 'amqplib';
// import { Logger } from 'winston';

// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    // log.info('User activity server connected to queue successfully...');
    console.log('User activity server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    // log.log('error', 'UserActivitiesService createConnection() method error:', error);
    console.log(error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
