import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ExternalService } from "./services/external.service";
import { ExternalController } from "./controller/external.controller";

@Module({
    imports: [HttpModule],
    controllers: [ExternalController],
    providers: [ExternalService],
    exports: [ExternalService]
  })
  export class ExternalModule {}