import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishedArticleService } from './published-article.service';
import { PublishedArticleController } from './published-article.controller';
import { PublishedArticle } from './published-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublishedArticle])],
  controllers: [PublishedArticleController],
  providers: [PublishedArticleService],
  exports: [PublishedArticleService],
})
export class PublishedArticleModule {} 