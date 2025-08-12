import { UserActivity } from '@useractivity/controllers/useractivitylog';
import express, { Router } from 'express';

const router: Router = express.Router();

export function userActivityRoutes(): Router {
  router.get('/user-activity-logs', UserActivity.prototype.getAllUserActivity);
  router.get('/user-activity-logs-by-id/:userId', UserActivity.prototype.getAllUserActivityById);

  return router;
}
