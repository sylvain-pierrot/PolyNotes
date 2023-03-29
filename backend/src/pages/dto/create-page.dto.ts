import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;
}
