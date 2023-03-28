import { IsNotEmpty } from 'class-validator';
import { Node } from '../types/interfaces';

export class UpdateFileSystemDto {
  @IsNotEmpty()
  readonly nodeRoot: Node;
}
