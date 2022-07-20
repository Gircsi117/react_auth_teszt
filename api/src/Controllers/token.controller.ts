/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('token')
export class TokenController {
  @Get('getNewAccessToken')
  newToken(@Headers() header, @Res() res: Response) {
    const { refreshtoken } = header;

    try {
      const token = jwt.verify(refreshtoken, process.env.TOKEN_KEY);

      const accessToken = jwt.sign(
        { email: token.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '1m',
        },
      );
      console.log("new token");
      
      return res.send({ success: true, accessToken: accessToken });

    } catch (err) {

      console.log(err);
      return res
        .status(403)
        .send({ success: false });
    }
  }
}
