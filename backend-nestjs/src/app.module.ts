import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { PublishedArticleModule } from './published-article/published-article.module';
import { ResearchCenterModule } from './research-center/research-center.module';
import { HighestDegreeModule } from './highest-degree/highest-degree.module';
import { User } from './user/user.entity';
import { PublishedArticle } from './published-article/published-article.entity';
import { ResearchCenterService } from './research-center/research-center.service';
import { HighestDegreeService } from './highest-degree/highest-degree.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',           // your MySQL user
      password: '',   // your MySQL password
      database: 'ovprdie',         // your DB name
      entities: [
        __dirname + '/**/*.entity{.ts,.js}', 
        User,
        PublishedArticle],
      synchronize: true,          // use only in dev not in production
    }),
    UserModule,
    AuthModule,
    SeedModule,
    PublishedArticleModule,
    ResearchCenterModule,
    HighestDegreeModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResearchCenterService, HighestDegreeService],
})
export class AppModule {}
