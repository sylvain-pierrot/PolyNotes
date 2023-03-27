import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @MaxLength(50)
  readonly title: string;

  @IsArray()
  @IsOptional()
  readonly blocks: string;
}
