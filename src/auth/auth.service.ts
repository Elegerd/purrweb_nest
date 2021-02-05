import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: User['email'],
    password: User['password'],
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(String(password), user.password);
    if (isValid) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
