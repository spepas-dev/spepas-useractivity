import { health } from '@useractivity/controllers/health';
import express, { Router } from 'express';

const router: Router = express.Router();

export function healthRoutes(): Router {
  router.get('/useractivity-health', health);

  return router;
}
