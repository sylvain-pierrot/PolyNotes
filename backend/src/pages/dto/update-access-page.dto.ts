import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePageDto } from './create-page.dto';

export class UpdateAccessPageDto extends PartialType(CreatePageDto) {
  @IsString()
  @IsNotEmpty()
  readonly access: string;

  @IsString()
  @IsOptional()
  readonly roleAccess: string;
}
