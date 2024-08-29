import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Post('permission')
  createPermission(@Body() createPermission: CreatePermissionDto) {
    return this.accessControlService.createPermission(createPermission);
  }

  @Get('permission')
  findAllPermission() {
    return this.accessControlService.findAllPermission();
  }

  @Post('role')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.accessControlService.createRole(createRoleDto);
  }

  @Get('role')
  findAllRole() {
    return this.accessControlService.findAllRole();
  }
}
