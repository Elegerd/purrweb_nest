import {
  Controller,
  Res,
  Get,
  Post,
  UseGuards,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInDto } from './auth.dto';
import { LocalAuthGuard, JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }
}
