import { Module } from '@nestjs/common';
import { IngredientSubTypeService } from './ingredient-sub-type.service';
import { IngredientSubTypeController } from './ingredient-sub-type.controller';

@Module({
  controllers: [IngredientSubTypeController],
  providers: [IngredientSubTypeService]
})
export class IngredientSubTypeModule {}
