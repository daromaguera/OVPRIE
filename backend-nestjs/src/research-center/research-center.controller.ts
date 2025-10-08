import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ResearchCenterService } from './research-center.service';
import { ResearchCenter } from './research-center.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('research-centers')
export class ResearchCenterController {
  constructor(private readonly researchCenterService: ResearchCenterService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ResearchCenter[]> {
    return this.researchCenterService.findAll();
  }

  @Get('active')
  async findActiveCenters(): Promise<ResearchCenter[]> {
    return this.researchCenterService.findActiveCenters();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ResearchCenter | null> {
    return this.researchCenterService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() researchCenterData: Partial<ResearchCenter>): Promise<ResearchCenter> {
    return this.researchCenterService.create(researchCenterData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() researchCenterData: Partial<ResearchCenter>,
  ): Promise<ResearchCenter | null> {
    return this.researchCenterService.update(+id, researchCenterData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.researchCenterService.remove(+id);
  }
} 