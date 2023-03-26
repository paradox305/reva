const passport = require('passport');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async googleAuthRedirect(req, res) {
    try {
      await passport.authenticate('google', {
        failureRedirect: '/failed',
        // successRedirect: `${process.env.SUCCESS_REDIRECT}?access_token=${req.user.access_token}`
      });

      //   Finding existing user
      let user = await this.prisma.user.findUnique({
        where: { USER_EMAIL: req.user.email },
      });

      // Register user if not registered
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            USER_EMAIL: req.user.email,
            USER_NAME: `${req.user.firstName} ${req.user.lastName}`,
          },
        });
      }

      // Generate JWT access_token
      const token = await this.jwtService.signAsync(
        { email: req.user.email, user_uuid: user.USER_UUID },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      );
      console.log(token);
      res.redirect(`${process.env.SUCCESS_REDIRECT}?jwt_token=${token}`);
    } catch (error) {
      console.error(error);
      throw new Error('Login Failed');
    }
  }
}
