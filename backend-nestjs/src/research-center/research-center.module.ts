import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchCenter } from './research-center.entity';
import { ResearchCenterService } from './research-center.service';
import { ResearchCenterController } from './research-center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ResearchCenter])],
  providers: [ResearchCenterService],
  controllers: [ResearchCenterController],
  exports: [ResearchCenterService],
})
export class ResearchCenterModule {} 