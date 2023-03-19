import { Module } from '@nestjs/common';
import { PrimaryMaterialService } from './primary-material.service';
import { PrimaryMaterialController } from './primary-material.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [PrimaryMaterialController],
  providers: [PrimaryMaterialService, DatabaseService],
})
export class PrimaryMaterialModule {}
