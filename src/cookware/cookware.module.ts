import { Module } from '@nestjs/common';
import { CookwareService } from './cookware.service';
import { CookwareController } from './cookware.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [CookwareController],
  providers: [CookwareService, DatabaseService],
})
export class CookwareModule {}
