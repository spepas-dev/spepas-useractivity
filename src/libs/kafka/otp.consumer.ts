// import prisma from '../prisma';

// import { kafkaconnection } from './connection';

// const consumer = kafkaconnection.consumer({ groupId: 'otp-service' });

// const runOtpConsumer = async () => {
//   try {
//     await consumer.connect();
//     await consumer.subscribe({
//       topics: ['otp-service'],
//       fromBeginning: false
//     });

//     await consumer.run({
//       eachMessage: async ({ message }) => {
//         const value = message?.value?.toString();
//         if (value) {
//           const data = JSON.parse(value);

//           try {
//             await prisma.userActivity.create({ data });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default runOtpConsumer;
