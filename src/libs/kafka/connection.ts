import { config } from '@useractivity/config';
import { Kafka } from 'kafkajs';

export const kafkaconnection = new Kafka({
  clientId: 'user-activity-service',
  brokers: [config.BROKER1_URL!, config.BROKER2_URL!, config.BROKER3_URL!]
});
