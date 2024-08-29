import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  readonly permissionIds: string[];
}
