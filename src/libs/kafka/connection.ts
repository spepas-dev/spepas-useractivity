// import { config } from '@useractivity/config';
import { Kafka } from 'kafkajs';

export const kafkaconnection = new Kafka({
  clientId: 'user-activity-service',
  brokers: ['128.251.117.108:9094', '4.231.138.130:9095', '20.93.57.0:9096']
});
