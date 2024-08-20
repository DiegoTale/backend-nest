import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encript } from 'src/common/utis/bcrypt';

@Injectable()
export class UserService {
  /** Inyeccion de repositorio */
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = encript(createUserDto.password);
    // console.log(password);
    // return createUserDto;
    try {
      const user = this._userRepository.create({
        ...createUserDto,
        password,
      });
      await this._userRepository.save(user);

      return user;
    } catch (error) {
      console.error(
        JSON.stringify({
          date: new Date().toDateString(),
          code: error.code,
          detail: error.detail,
        }),
      );
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      throw new InternalServerErrorException(error.detail);
    }
  }

  async findAll() {
    return await this._userRepository.find();
  }

  async findOne(id: string) {
    const user = await this._userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException(`El usuario con id ${id} no existe`);

    return user;
  }

  async findOneByUsername(username: string) {
    // const user = await this._userRepository.findOneBy({
    //   username,
    // });

    const user = await this._userRepository
      .createQueryBuilder('user')
      .select(['user.username'])
      .addSelect(['user.password'])
      .where({ username })
      .getOne();

    console.log(user);

    if (!user)
      throw new NotFoundException(`El usuario o contrasena incorrecta`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userUpdate = await this._userRepository.preload({
        id,
        ...updateUserDto,
      });

      if (!userUpdate)
        throw new NotFoundException(`El usuario con id ${id} no existe`);

      await this._userRepository.save(userUpdate);

      return userUpdate;
    } catch (error) {}
  }

  async remove(id: string) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException();
    await this._userRepository.remove(user);

    return user;
  }
}
