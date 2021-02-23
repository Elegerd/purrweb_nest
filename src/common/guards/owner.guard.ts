import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    return req.body.ownerId === user.id;
  }
}
