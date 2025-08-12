import { NextFunction, Request, Response } from 'express';

// import JWT from 'jsonwebtoken';

import { config } from '@useractivity/config';

import { NotAuthorizedError } from './error-handler';

// const tokens: string[] = ['f6eb7bbd3e18ce28285fdca882f89352', 'ff52aa30645ef142387feab091c2b111', 'e227cbcb520eae5d902862b131141bf6'];

export function verifyGatewayRequest(req: Request, _res: Response, next: NextFunction): void {
  // if (!req.headers?.gatewaytoken) {
  //   throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
  // }
  // const token: string = req.headers?.gatewaytoken as string;
  // if (!token) {
  //   throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
  // }

  if (!req.headers?.token) {
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
  }
  const token: string = req.headers?.token as string;
  if (!token) {
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
  }

  try {
    // const payload: { id: string; iat: number } = JWT.verify(token, '1282722b942e08c8a6cb033aa6ce850e') as { id: string; iat: number };
    // if (!tokens.includes(payload.id)) {
    //   throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
    // }
    if (token !== config.GATEWAY_JWT_TOKEN) {
      throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
    }
  } catch (error) {
    console.log(error);
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
  }
  next();
}
