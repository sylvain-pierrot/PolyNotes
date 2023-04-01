import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString, MaxLength } from 'class-validator';
import { CreatePageDto } from './create-page.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @IsString()
  @MaxLength(50)
  readonly title: string;

  @IsArray()
  readonly blocks: string;
}
