import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighestDegree } from './highest-degree.entity';
import { HighestDegreeService } from './highest-degree.service';
import { HighestDegreeController } from './highest-degree.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HighestDegree])],
  providers: [HighestDegreeService],
  controllers: [HighestDegreeController],
  exports: [HighestDegreeService],
})
export class HighestDegreeModule {} 