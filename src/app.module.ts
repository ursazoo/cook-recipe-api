import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
