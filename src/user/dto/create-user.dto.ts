import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({message:"Tiene que ser una cadena"})
    @MinLength(3)
    primerNombre:  string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    segundoNombre: string;

    @IsString()
    apellidos:     string;

    @IsEmail()
    correo:        string;

    @IsNumber({})
    telefono:      number;


    @IsString()
    username:      string;
    
    @IsString()
    @MinLength(5)
    password:      string;
}