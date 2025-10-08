import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PublishedArticleService } from './published-article.service';
import { PublishedArticle } from './published-article.entity';

@Controller('published-articles')
export class PublishedArticleController {
  constructor(private readonly publishedArticleService: PublishedArticleService) {}

  @Post()
  async create(@Body() createArticleDto: Partial<PublishedArticle>) {
    try {
      // Validate required fields
      if (!createArticleDto.title || !createArticleDto.year || !createArticleDto.doi) {
        throw new HttpException(
          'Title, year, and DOI are required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Validate year
      const currentYear = new Date().getFullYear();
      if (createArticleDto.year < 1900 || createArticleDto.year > currentYear + 1) {
        throw new HttpException(
          `Year must be between 1900 and ${currentYear + 1}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Check if DOI already exists
      const existingArticle = await this.publishedArticleService.findByDoi(createArticleDto.doi);
      if (existingArticle) {
        throw new HttpException(
          'An article with this DOI already exists',
          HttpStatus.CONFLICT,
        );
      }

      // Set timestamps
      const now = new Date();
      createArticleDto.created_at = now;
      createArticleDto.updated_at = now;

      return {
        status: 'success',
        message: 'Article created successfully',
        data: await this.publishedArticleService.create(createArticleDto),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query('year') year?: string, @Query('status') status?: string) {
    try {
      let articles: PublishedArticle[];

      if (year) {
        const yearNum = parseInt(year, 10);
        if (isNaN(yearNum)) {
          throw new HttpException('Invalid year parameter', HttpStatus.BAD_REQUEST);
        }
        articles = await this.publishedArticleService.findByYear(yearNum);
      } else {
        articles = await this.publishedArticleService.findAll();
      }

      // Filter by status if provided
      if (status) {
        articles = articles.filter(article => article.status === status);
      }

      return {
        status: 'success',
        message: 'Articles retrieved successfully',
        data: articles,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve articles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getStats() {
    try {
      return {
        status: 'success',
        message: 'Statistics retrieved successfully',
        data: await this.publishedArticleService.getStats(),
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const article = await this.publishedArticleService.findOne(+id);
      if (!article) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: 'success',
        message: 'Article retrieved successfully',
        data: article,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: Partial<PublishedArticle>) {
    try {
      const existingArticle = await this.publishedArticleService.findOne(+id);
      if (!existingArticle) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      // Validate year if provided
      if (updateArticleDto.year) {
        const currentYear = new Date().getFullYear();
        if (updateArticleDto.year < 1900 || updateArticleDto.year > currentYear + 1) {
          throw new HttpException(
            `Year must be between 1900 and ${currentYear + 1}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Check if DOI already exists (if changing DOI)
      if (updateArticleDto.doi && updateArticleDto.doi !== existingArticle.doi) {
        const articleWithDoi = await this.publishedArticleService.findByDoi(updateArticleDto.doi);
        if (articleWithDoi) {
          throw new HttpException(
            'An article with this DOI already exists',
            HttpStatus.CONFLICT,
          );
        }
      }

      // Update timestamp
      updateArticleDto.updated_at = new Date();

      return {
        status: 'success',
        message: 'Article updated successfully',
        data: await this.publishedArticleService.update(+id, updateArticleDto),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const existingArticle = await this.publishedArticleService.findOne(+id);
      if (!existingArticle) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }

      await this.publishedArticleService.remove(+id);

      return {
        status: 'success',
        message: 'Article deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 