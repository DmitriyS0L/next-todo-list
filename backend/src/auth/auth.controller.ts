import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { map, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/user.decorators';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() input: SignInDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn$(input.email, input.password).pipe(
      map((data) => {
        const token = data.access_token;
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
        });

        return { message: 'Success' };
      })
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() input: SignUpDto) {
    return this.authService.signUp$(input.name, input.email, input.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthUser('id') userId: string) {
    return this.userService.findById(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    });
    return { message: 'Logged out' };
  }
}
