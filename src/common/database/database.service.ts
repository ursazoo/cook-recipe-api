import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log("数据库已连接");
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
