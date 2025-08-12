import prisma from '../prisma';

import { kafkaconnection } from './connection';

const consumer = kafkaconnection.consumer({ groupId: 'product-service' });

const runProductConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topics: ['product-service'],
      fromBeginning: false
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message?.value?.toString();
        if (value) {
          const data = JSON.parse(value);

          try {
            await prisma.userActivity.create({ data });
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default runProductConsumer;
