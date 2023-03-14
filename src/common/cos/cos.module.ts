// src/logical/auth/auth.module.ts
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CosService } from './cos.service';
import { CosController } from './cos.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CosController],
  providers: [CosService], // LocalStrategy
  exports: [CosService],
})
export class CosModule {}
