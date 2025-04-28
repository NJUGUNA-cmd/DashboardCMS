import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';
import { Robot } from "./robot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Robot])],
  controllers: [RobotsController],
  providers: [RobotsService]
})
export class RobotsModule {}
