import { verifyGatewayRequest } from '@useractivity/middleware/gateway-middleware';
import { healthRoutes } from '@useractivity/routes/health';
import { seedRoutes } from '@useractivity/routes/seed';
import { userActivityRoutes } from '@useractivity/routes/useractivity';
import { Application } from 'express';

const BASE_PATH = '/api/v1/useractivity';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
  app.use(BASE_PATH, seedRoutes());

  app.use(BASE_PATH, verifyGatewayRequest, userActivityRoutes());
}
