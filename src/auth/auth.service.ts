import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { comparePwd } from 'src/common/utis/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginUserDto) {
    const user = await this._userService.findOneByUsername(
      loginAuthDto.username,
    );

    if (!user) throw new UnauthorizedException();
    // console.log(user);

    if (user) {
      const isValid = comparePwd(loginAuthDto.password, user.password);

      if (isValid) {
        const payload = { sub: user.id };

        const token = await this.getToken(payload);

        return {
          access_token: token,
        };
      }
      console.log(isValid);
      throw new UnauthorizedException(`El usuario o contrasena incorrecta`);
    }
    return user;
  }

  getToken(payload: any) {
    const token = this._jwtService.signAsync(payload);
    return token;
  }
}
