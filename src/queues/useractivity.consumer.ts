import prisma from '@useractivity/libs/prisma';
import { Channel, ConsumeMessage, Replies } from 'amqplib';

import { createConnection } from './connection';
// import { Logger } from 'winston';

// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersServiceConsumer', 'debug');

const consumeUserActivityDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'spepas-usera-ctivity-create';
    const routingKey = 'user-activity-log';
    const queueName = 'user-activity-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const spepasQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(spepasQueue.queue, exchangeName, routingKey);
    channel.consume(spepasQueue.queue, async (msg: ConsumeMessage | null) => {
      const data = JSON.parse(msg!.content.toString());
      try {
        await prisma.userActivity.create({ data });
      } catch (error) {
        console.log(error);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    // log.log('error', 'UsersService UserConsumer consumeBuyerDirectMessage() method error:', error);
    console.log(error);
  }
};

export { consumeUserActivityDirectMessage };
