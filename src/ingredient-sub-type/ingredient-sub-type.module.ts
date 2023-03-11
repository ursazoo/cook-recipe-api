import { Module } from '@nestjs/common';
import { IngredientSubTypeService } from './ingredient-sub-type.service';
import { IngredientSubTypeController } from './ingredient-sub-type.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [IngredientSubTypeController],
  providers: [IngredientSubTypeService, DatabaseService],
})
export class IngredientSubTypeModule {}
