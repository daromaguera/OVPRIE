import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService, LoginCredentials } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return this.authService.logout(req.user.user_id);
  }

  // TODO: Add password reset endpoints if needed
  // @Post('forgot-password')
  // async forgotPassword(@Body() body: { email: string }) {
  //   return this.authService.forgotPassword(body.email);
  // }

  // @Post('reset-password')
  // async resetPassword(@Body() body: { token: string; password: string }) {
  //   return this.authService.resetPassword(body.token, body.password);
  // }
} 