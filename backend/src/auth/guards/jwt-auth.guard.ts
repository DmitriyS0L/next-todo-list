import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // Коли приходить запит на сервер,  викликається JwtAuthGuard який зупиняє ще до того як від потрапить до конртоллера.
