import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './common/database/database.service';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

import { AuthModule } from './common/auth/auth.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [AuthModule, UserModule, PostModule, TagModule],
  controllers: [AppController, UserController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
