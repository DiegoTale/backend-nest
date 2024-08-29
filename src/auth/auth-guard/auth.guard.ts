import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: JwtService,
    private _userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException();
    try {
      // console.log(token);
      // console.log({ secret: '3StaE$L^lL^a3PRinC!^>Al' });
      const payload = await this._jwtService.verifyAsync(token, {
        secret: '3StaE$L^lL^a3PRinC!^>Al',
      });

      const user = await this._userService.findOneFull(payload.sub);

      request.user = user;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private getToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
