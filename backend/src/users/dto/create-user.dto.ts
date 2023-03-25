import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly password: string;
}
