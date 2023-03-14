import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseService } from '../common/database/database.service';

@Module({
  controllers: [PostController],
  providers: [PostService, DatabaseService],
  exports: [PostService],
})
export class PostModule {}
