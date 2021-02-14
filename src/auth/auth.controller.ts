import {
  Controller,
  Res,
  Get,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
import { SignInDto, VerificationDto } from './auth.dto';
import { LocalAuthGuard, JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @Post('sign-in')
  async signIn(@Req() { user }: { user: User }): Promise<void> {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('verification')
  async verifyLogin(
    @Body() verificationDto: VerificationDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.verification(verificationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }
}
