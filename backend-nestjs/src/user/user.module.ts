import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { PublishedArticle } from '../published-article/published-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PublishedArticle])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
