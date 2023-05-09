import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any, done: VerifiedCallback) {
    let userFound = await this.prisma.user.findUnique({
      where: { USER_EMAIL: payload.email },
    });
    let user = null;
    if (userFound) {
      user = {
        user_uuid: userFound.USER_UUID,
        email: userFound.USER_EMAIL,
        name: userFound.USER_NAME,
        admin: userFound.USER_EMAIL == process.env.ADMIN ? true : false,
      };
    }

    done(null, user);
  }
}
