import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService, DatabaseService],
})
export class IngredientModule {}
