import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { Role } from './entities/role.entitiy';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Permission)
    private _permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private _roleRepository: Repository<Role>,
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const newPermission =
      this._permissionRepository.create(createPermissionDto);
    try {
      const permission = await this._permissionRepository.save(newPermission);
      return permission;
    } catch (error) {
      console.error(error);
    }
  }

  async findAllPermission() {
    return await this._permissionRepository.find();
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const permissions = await this._permissionRepository.findByIds(
      createRoleDto.permissionIds,
    );
    const role = await this._roleRepository.create({
      ...createRoleDto,
      permissions,
    });

    await this._roleRepository.save(role);
    return role;
  }

  async findRole(id: string) {
    const role = await this._roleRepository.findOneBy({ id });
    return role;
  }

  async findAllRole() {
    return await this._roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .select([
        'role.id',
        'role.name',
        'role.description',
        'role.isActive',
        'permission.name',
        'permission.description',
      ])
      .getMany();
  }
}
