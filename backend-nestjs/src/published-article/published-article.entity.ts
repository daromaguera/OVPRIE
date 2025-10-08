import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('published_articles')
export class PublishedArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 4 })
  year_pub: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  doi: string;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User, user => user.publishedArticles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
} 