import { faker } from '@faker-js/faker';
import prisma from '@useractivity/libs/prisma/index';
import { UserActivity } from '@useractivity/libs/prisma/type';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sample } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export async function create(req: Request, res: Response): Promise<void> {
  const { count } = req.params;

  const Channel = ['USSD', 'MOBILE', 'WEBAPP', 'WEBADMIN', 'GATEWAY'];
  const Title = ['Sign In', 'Accept Bid', 'Create Request', 'Browse Product'];
  const Action = ['Sign_In', 'Accept_Bid', 'Create_Request', 'Browse_Product'];
  const Verb = ['POST', 'PUT', 'GET', ''];
  const ip = ['52.155.95.103', '10.0.86.66', '10.0.83.180', '10.0.65.14'];
  const Os = ['Macbook', 'Windows', 'Adroid', 'IOS'];
  const Type = ['Desktop', 'Mobile'];
  const Browser = ['Chrome', 'Safari', 'Firefox', 'Edge'];

  for (let i = 0; i < parseInt(count, 10); i++) {
    const userId = uuidV4();
    const channel = sample(Channel);
    const title = sample(Title);
    const description = 'randomCharacters';
    const action = sample(Action);
    const verb = sample(Verb);
    const endpoint = 'http://api.spepas.com';
    const requestBody = {};
    const statusCode = 200;
    const country = faker.location.country();
    const city = faker.location.city();
    const deviceIpAddress = sample(ip);
    const deviceOs = sample(Os);
    const deviceType = sample(Type);
    const browserName = sample(Browser);

    const activityData: UserActivity = {
      userId,
      channel,
      title,
      description,
      action,
      verb,
      endpoint,
      requestBody,
      statusCode,
      country,
      city,
      deviceIpAddress,
      deviceOs,
      deviceType,
      browserName
    } as UserActivity;
    await prisma.userActivity.createMany({ data: activityData });
  }
  res.status(StatusCodes.OK).json({ message: 'Seed user activity logged successfully.' });
}
