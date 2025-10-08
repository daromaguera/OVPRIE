import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublishedArticle } from './published-article.entity';

@Injectable()
export class PublishedArticleService {
  constructor(
    @InjectRepository(PublishedArticle)
    private publishedArticleRepository: Repository<PublishedArticle>,
  ) {}

  async create(articleData: Partial<PublishedArticle>): Promise<PublishedArticle> {
    const article = this.publishedArticleRepository.create(articleData);
    return await this.publishedArticleRepository.save(article);
  }

  async findAll(): Promise<PublishedArticle[]> {
    return await this.publishedArticleRepository.find({
      order: { year: 'DESC', created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<PublishedArticle | null> {
    return await this.publishedArticleRepository.findOne({ where: { article_id: id } });
  }

  async findByYear(year: number): Promise<PublishedArticle[]> {
    return await this.publishedArticleRepository.find({
      where: { year },
      order: { created_at: 'DESC' },
    });
  }

  async findByDoi(doi: string): Promise<PublishedArticle | null> {
    return await this.publishedArticleRepository.findOne({ where: { doi } });
  }

  async update(id: number, articleData: Partial<PublishedArticle>): Promise<PublishedArticle | null> {
    await this.publishedArticleRepository.update(id, articleData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.publishedArticleRepository.delete(id);
  }

  async getStats(): Promise<{
    total: number;
    byYear: Record<number, number>;
    byStatus: Record<string, number>;
  }> {
    const articles = await this.findAll();
    const byYear: Record<number, number> = {};
    const byStatus: Record<string, number> = {};

    articles.forEach(article => {
      byYear[article.year] = (byYear[article.year] || 0) + 1;
      byStatus[article.status] = (byStatus[article.status] || 0) + 1;
    });

    return {
      total: articles.length,
      byYear,
      byStatus,
    };
  }
} 