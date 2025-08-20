import http from 'http';

import { config } from '@useractivity/config';
// import runAuthConsumer from '@useractivity/libs/kafka/auth.consumer';
// import runOrderConsumer from '@useractivity/libs/kafka/order.consumer';
// import runOtpConsumer from '@useractivity/libs/kafka/otp.consumer';
// import runProductConsumer from '@useractivity/libs/kafka/product.consumer';
// import runUserConsumer from '@useractivity/libs/kafka/user.consumer';
import { CustomError, IErrorResponse } from '@useractivity/middleware/error-handler';
import { createConnection } from '@useractivity/queues/connection';
import { consumeUserActivityDirectMessage } from '@useractivity/queues/useractivity.consumer';
import { appRoutes } from '@useractivity/routes';
import { Channel } from 'amqplib';
import compression from 'compression';
import cors from 'cors';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import hpp from 'hpp';

const SERVER_PORT = 4010;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueues();
  // startConsumers();
  userActivitiesErrorHandler(app);
  startServer(app);
}

function securityMiddleware(app: Application): void {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
  );
}

function standardMiddleware(app: Application): void {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

// async function startConsumers(): Promise<void> {
//   runAuthConsumer();
//   runOrderConsumer();
//   runOtpConsumer();
//   runProductConsumer();
//   runUserConsumer();
// }

const startQueues = async (): Promise<void> => {
  const userActivityChannel: Channel = (await createConnection()) as Channel;
  await consumeUserActivityDirectMessage(userActivityChannel);
};

function userActivitiesErrorHandler(app: Application): void {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    console.log('error', `UserActivityLog ${error.comingFrom}:`, error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.info(`Activity log server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.info(`Activity log server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log('error', 'Activity log startServer() method error:', error);
  }
}
