/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { accesstoken } = req.headers;

    try {
      const token = jwt.verify(accesstoken, process.env.TOKEN_KEY)

      req.body.user = token.email;

      next();
    } catch (err) {
      return res.status(403).send({ success: false, error: [err] });
    }
  }
}
