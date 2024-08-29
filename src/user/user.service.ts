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
import { AccessControlService } from 'src/access-control/access-control.service';

@Injectable()
export class UserService {
  /** Inyeccion de repositorio */
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    private _accessControlService: AccessControlService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = encript(createUserDto.password);

    try {
      let role;

      if (createUserDto.role) {
        role = await this.findRole(createUserDto.role);
      }

      const user = this._userRepository.create({
        ...createUserDto,
        password,
        role,
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
    const user = await this._userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username'])
      .addSelect(['user.password'])
      .where({ username })
      .getOne();

    // console.log(user);

    if (!user)
      throw new NotFoundException(`El usuario o contrasena incorrecta`);
    return user;
  }

  async findOneFull(id: string) {
    const user = await this._userRepository.findOne({
      where: { id },
      relations: ['role', 'role.permissions'],
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let role;

      if (updateUserDto.role) {
        role = await this.findRole(updateUserDto.role);
      }

      const userUpdate = await this._userRepository.preload({
        id,
        ...updateUserDto,
        role,
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

  async findRole(id: string) {
    const role = this._accessControlService.findRole(id);

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }
}
