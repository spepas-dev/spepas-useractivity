import express, { Express } from 'express';

import { start } from './server';

const initialize = (): void => {
  const app: Express = express();
  start(app);
};

initialize();
