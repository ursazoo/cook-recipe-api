export class CreateIngredientTypeDto {
  // 食材一级分类名称
  name: string;

  // 包含的食材二级分类id
  ingredientSubTypeIds?: number[];
}
