import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HighestDegree } from './highest-degree.entity';

@Injectable()
export class HighestDegreeService {
  constructor(
    @InjectRepository(HighestDegree)
    private highestDegreeRepository: Repository<HighestDegree>,
  ) {}

  async findAll(): Promise<HighestDegree[]> {
    return this.highestDegreeRepository.find({
      where: { is_active: true },
      order: { level: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<HighestDegree | null> {
    return this.highestDegreeRepository.findOne({
      where: { id, is_active: true },
    });
  }

  async create(highestDegreeData: Partial<HighestDegree>): Promise<HighestDegree> {
    const highestDegree = this.highestDegreeRepository.create(highestDegreeData);
    return this.highestDegreeRepository.save(highestDegree);
  }

  async update(id: number, highestDegreeData: Partial<HighestDegree>): Promise<HighestDegree | null> {
    await this.highestDegreeRepository.update(id, highestDegreeData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.highestDegreeRepository.update(id, { is_active: false });
  }

  async findActiveDegrees(): Promise<HighestDegree[]> {
    return this.highestDegreeRepository.find({
      where: { is_active: true },
      select: ['id', 'name', 'abbreviation', 'level', 'is_ongoing'],
      order: { level: 'ASC', name: 'ASC' },
    });
  }

  async findByLevel(level: number): Promise<HighestDegree[]> {
    return this.highestDegreeRepository.find({
      where: { level, is_active: true },
      order: { name: 'ASC' },
    });
  }

  async findOngoingDegrees(): Promise<HighestDegree[]> {
    return this.highestDegreeRepository.find({
      where: { is_ongoing: true, is_active: true },
      order: { level: 'ASC', name: 'ASC' },
    });
  }
} 