import { Module } from '@nestjs/common';
import { IngredientTypeService } from './ingredient-type.service';
import { IngredientTypeController } from './ingredient-type.controller';

@Module({
  controllers: [IngredientTypeController],
  providers: [IngredientTypeService]
})
export class IngredientTypeModule {}
