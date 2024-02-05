import { Module } from "@nestjs/common";
import { BaseMaterialService } from "./base-material.service";
import { BaseMaterialController } from "./base-material.controller";
import { DatabaseService } from "../common/database/database.service";

@Module({
  controllers: [BaseMaterialController],
  providers: [BaseMaterialService, DatabaseService]
})
export class BaseMaterialModule {
}
