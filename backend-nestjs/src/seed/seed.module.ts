import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../user/user.entity';
import { HighestDegree } from '../highest-degree/highest-degree.entity';
import { ResearchCenter } from '../research-center/research-center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HighestDegree, ResearchCenter])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {} 