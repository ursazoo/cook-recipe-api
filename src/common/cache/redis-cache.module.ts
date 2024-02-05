// import { getConfig } from '@/utils';
import { Module } from "@nestjs/common";
import { RedisCacheService } from "./redis-cache.service";

@Module({
  // imports: [
  //   CacheModule.registerAsync({
  //     isGlobal: true,
  //     useFactory: async () => {
  //       return {
  //         store: redisStore as any,
  //         host: 'localhost',
  //         port: '6379',
  //         db: 'db', //目标库,
  //         auth_pass: 'auth', // 密码,没有可以不写
  //         // host: getConfig('REDIS_CONFIG').host,
  //         // port: getConfig('REDIS_CONFIG').port,
  //         // db: getConfig('REDIS_CONFIG').db, //目标库,
  //         // auth_pass: getConfig('REDIS_CONFIG').auth, // 密码,没有可以不写
  //       };
  //     },
  //   }),
  // ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {
}
