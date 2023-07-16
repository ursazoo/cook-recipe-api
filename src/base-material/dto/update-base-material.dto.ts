import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseMaterialDto } from './create-base-material.dto';

export class UpdateBaseMaterialDto extends PartialType(CreateBaseMaterialDto) {
  // 食材名称
  name: string;
  // 食材所属的二级分类id
  secondaryMaterialId: number;
  // emoji表情
  emoji?: string;
}
