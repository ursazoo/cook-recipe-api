import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      id: payload.id,
      account: payload.account,
      name: payload.name,
      role: payload.role,
      createdTime: payload.createdTime,
    };
  }
}
