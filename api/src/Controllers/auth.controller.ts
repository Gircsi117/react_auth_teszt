/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { email, pass } = body;

    if (email != 'admin@admin.hu' || pass != 'alma') {
      return res.send({
        success: false,
        error: ['A felhasználó nem található'],
      });
    }

    const accessToken = await jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: '1m',
    });
    const refreshToken = await jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: '31d',
    });

    return res
      .set({ refreshtoken: refreshToken })
      .send({ success: true, accessToken: accessToken });
  }

  @Get('checkAuth')
  checkout(@Headers() header, @Res() res: Response) {
    const { refreshtoken } = header;
    try {
      const token = jwt.verify(refreshtoken, process.env.TOKEN_KEY);
      const accessToken = jwt.sign(
        { email: token.email },
        process.env.TOKEN_KEY,
        { expiresIn: '1m' },
      );

      //setTimeout(() => {
        return res.send({ success: true, accessToken: accessToken });
      //}, 0);
      
    } catch (error) {
      return res.send({ success: false });
    }
  }
}
