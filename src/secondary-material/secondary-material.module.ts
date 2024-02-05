import { Module } from "@nestjs/common";
import { SecondaryMaterialService } from "./secondary-material.service";
import { SecondaryMaterialController } from "./secondary-material.controller";
import { DatabaseService } from "../common/database/database.service";

@Module({
  controllers: [SecondaryMaterialController],
  providers: [SecondaryMaterialService, DatabaseService]
})
export class SecondaryMaterialModule {
}
