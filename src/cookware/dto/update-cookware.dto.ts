import { PartialType } from '@nestjs/mapped-types';
import { CreateCookwareDto } from './create-cookware.dto';

export class UpdateCookwareDto extends PartialType(
  CreateCookwareDto,
) {
  // name: string;

  secondaryMaterialIds?: string[];
}
