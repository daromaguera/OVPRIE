import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResearchCenter } from './research-center.entity';

@Injectable()
export class ResearchCenterService {
  constructor(
    @InjectRepository(ResearchCenter)
    private researchCenterRepository: Repository<ResearchCenter>,
  ) {}

  async findAll(): Promise<ResearchCenter[]> {
    return this.researchCenterRepository.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ResearchCenter | null> {
    return this.researchCenterRepository.findOne({
      where: { id, is_active: true },
    });
  }

  async create(researchCenterData: Partial<ResearchCenter>): Promise<ResearchCenter> {
    const researchCenter = this.researchCenterRepository.create(researchCenterData);
    return this.researchCenterRepository.save(researchCenter);
  }

  async update(id: number, researchCenterData: Partial<ResearchCenter>): Promise<ResearchCenter | null> {
    await this.researchCenterRepository.update(id, researchCenterData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.researchCenterRepository.update(id, { is_active: false });
  }

  async findActiveCenters(): Promise<ResearchCenter[]> {
    return this.researchCenterRepository.find({
      where: { is_active: true },
      select: ['id', 'name'],
      order: { name: 'ASC' },
    });
  }
} 