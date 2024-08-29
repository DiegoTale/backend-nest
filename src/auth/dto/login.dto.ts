import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5, { message: 'Tiene que tener por lo menos una longitud de 5' })
  password: string;
}
