import { Module } from '@nestjs/common';
import { IngredientTypeService } from './ingredient-type.service';
import { IngredientTypeController } from './ingredient-type.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [IngredientTypeController],
  providers: [IngredientTypeService, DatabaseService],
})
export class IngredientTypeModule {}
