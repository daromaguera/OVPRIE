import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { HighestDegreeService } from './highest-degree.service';
import { HighestDegree } from './highest-degree.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('highest-degrees')
export class HighestDegreeController {
  constructor(private readonly highestDegreeService: HighestDegreeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<HighestDegree[]> {
    return this.highestDegreeService.findAll();
  }

  @Get('active')
  async findActiveDegrees(): Promise<HighestDegree[]> {
    return this.highestDegreeService.findActiveDegrees();
  }

  @Get('ongoing')
  @UseGuards(JwtAuthGuard)
  async findOngoingDegrees(): Promise<HighestDegree[]> {
    return this.highestDegreeService.findOngoingDegrees();
  }

  @Get('level/:level')
  @UseGuards(JwtAuthGuard)
  async findByLevel(@Param('level') level: string): Promise<HighestDegree[]> {
    return this.highestDegreeService.findByLevel(+level);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<HighestDegree | null> {
    return this.highestDegreeService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() highestDegreeData: Partial<HighestDegree>): Promise<HighestDegree> {
    return this.highestDegreeService.create(highestDegreeData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() highestDegreeData: Partial<HighestDegree>,
  ): Promise<HighestDegree | null> {
    return this.highestDegreeService.update(+id, highestDegreeData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.highestDegreeService.remove(+id);
  }
} 