import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies['access_token'], // Дістаємо токен з request.cookies['access_token'] та валідується
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!, // Перевіряємо токен на валідність і розпаковуємо його (payload)
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username }; // Результат функції validate повертає об'єкт з id та username { id: ..., username: ...}
  }
}
