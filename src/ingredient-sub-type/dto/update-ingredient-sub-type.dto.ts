import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientSubTypeDto } from './create-ingredient-sub-type.dto';

export class UpdateIngredientSubTypeDto extends PartialType(
  CreateIngredientSubTypeDto,
) {
  name: string;
  ingredients: number[];
}
