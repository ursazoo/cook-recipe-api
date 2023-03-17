import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  // 食材名称
  name: string;
  // 食材所属的二级分类id
  ingredientSubTypeId: number;
  // emoji表情
  emoji?: string;
}
