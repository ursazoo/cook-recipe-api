import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { BaseMaterialController } from './base-material.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [BaseMaterialController],
  providers: [IngredientService, DatabaseService],
})
export class IngredientModule {}
