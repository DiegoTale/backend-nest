import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'Tiene que ser una cadena' })
  @MinLength(3, { message: 'Tiene que tener por lo menos una longitud de 3' })
  primerNombre: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Tiene que tener por lo menos una longitud de 3' })
  segundoNombre: string;

  @IsOptional()
  @IsString()
  apellidos: string;

  @IsOptional()
  @IsEmail()
  correo: string;

  @IsOptional()
  @IsNumber({})
  telefono: number;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del rol debe de ser un UUID valido' })
  role: string;
}
