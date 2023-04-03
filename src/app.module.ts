import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './common/database/database.service';
import { AuthModule } from './common/auth/auth.module';
import { CosModule } from './common/cos/cos.module';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CookwareModule } from './cookware/cookware.module';
import { BaseMaterialModule } from './base-material/base-material.module';
import { PrimaryMaterialModule } from './primary-material/primary-material.module';
import { SecondaryMaterialModule } from './secondary-material/secondary-material.module';

import { UserController } from './user/user.controller';
import { getConfig } from './utils';
import { RequestIpService } from './common/request-ip/request-ip.service';

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
    CookwareModule,
    BaseMaterialModule,
    PrimaryMaterialModule,
    SecondaryMaterialModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, DatabaseService, RequestIpService],
})
export class AppModule {}
