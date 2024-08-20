import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { comparePwd } from 'src/common/utis/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    private _userService: UserService,
  ) {}
  async login(loginAuthDto: LoginDto) {
    // try {
    const user = await this._userService.findOneByUsername(
      loginAuthDto.username,
    );

    if (!user) throw new UnauthorizedException();

    if (user) {
      const isValid = await comparePwd(loginAuthDto.password, user.password);
      if (isValid) {
        return user;
      }
      console.log(isValid);
      throw new UnauthorizedException(`El usuario o contrasena incorrecta`);
    }
    return user;
    // } catch (error) {
    //   console.log({ message: 'Unauthorized', statusCode: 401 });
    // }
  }
}
