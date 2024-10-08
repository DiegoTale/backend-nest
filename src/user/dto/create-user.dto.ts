import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tiene que ser una cadena' })
  @MinLength(3, { message: 'Tiene que tener por lo menos una longitud de 3' })
  primerNombre: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Tiene que tener por lo menos una longitud de 3' })
  segundoNombre: string;

  @IsString()
  apellidos: string;

  @IsEmail()
  correo: string;

  @IsNumber({})
  telefono: number;

  @IsString()
  username: string;

  @IsString()
  @MinLength(5, { message: 'Tiene que tener por lo menos una longitud de 5' })
  password: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del rol debe de ser un UUID valido' })
  role: string;
}
