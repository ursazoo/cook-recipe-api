import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './common/database/database.service';
import { AuthModule } from './common/auth/auth.module';
import { CosModule } from './common/cos/cos.module';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { IngredientTypeModule } from './ingredient-type/ingredient-type.module';
import { IngredientSubTypeModule } from './ingredient-sub-type/ingredient-sub-type.module';

import { UserController } from './user/user.controller';
import { getConfig } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [getConfig],
    }),
    CosModule,
    AuthModule,
    UserModule,
    PostModule,
    IngredientModule,
    IngredientTypeModule,
    IngredientSubTypeModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
