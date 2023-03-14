export class CreateIngredientSubTypeDto {
  name: string;

  // 所属的食材一级分类
  ingredientTypeId: number;

  // 包含的食材标签id
  ingredients: number[];
}
