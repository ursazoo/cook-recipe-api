import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './common/database/database.service';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [UserModule, PostModule, TagModule],
  controllers: [AppController, TagController],
  providers: [AppService, DatabaseService, TagService],
})
export class AppModule {}
