import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    readonly password: string;
}
