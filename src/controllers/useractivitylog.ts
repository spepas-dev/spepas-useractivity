import { getAllUserActivities, getAllUserActivitiesById } from '@useractivity/services/useractivity.service';
import { Request, Response } from 'express';

export class UserActivity {
  public async getAllUserActivity(req: Request, res: Response): Promise<void> {
    await getAllUserActivities(req, res);
  }

  public async getAllUserActivityById(req: Request, res: Response): Promise<void> {
    await getAllUserActivitiesById(req, res);
  }
}
