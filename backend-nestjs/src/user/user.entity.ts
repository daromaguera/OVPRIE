import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PublishedArticle } from '../published-article/published-article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'int', comment: '1 - researcher, 2 - Research Director and Vice President, 3 - Staff/Clerk, 3 - Center Heads and Project Leaders, 4 - TTLO Director, 5 - Extension Coordinator,  32 - admin' })
  user_type: number;  // 1 - researcher, 2 - Research Director and Vice President, 3 - Staff/Clerk, 3 - Center Heads and Project Leaders, 4 - TTLO Director, 5 - Extension Coordinator,  32 - admin

  @Column({ type: 'varchar' })
  salutation: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  middle_name: string | null;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  website: string;

  @Column({ type: 'varchar', nullable: true })
  institution: string;

  @Column({ type: 'varchar', nullable: true })
  department: string;

  @Column({ type: 'int', nullable: true })
  research_center_office: number | null;

  @Column({ type: 'varchar', nullable: true })
  other_research_center: string | null;

  @Column({ type: 'varchar', nullable: true })
  contact_no: string | null;

  @Column({ type: 'int', comment: '1 - Bachelor, 2 - Master, 3 - Doctoral, 4 - Professional Degree (MD, JD, etc.), 5 - Vocational /Technical Certificate, 6 - Other', nullable: true })
  highest_degree: number | null;

  @Column({ type: 'varchar', nullable: true })
  other_degree: string | null;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  token: string | null;

  @Column({ type: 'varchar', nullable: true })
  verification_code: string | null;

  @Column({ type: 'varchar' })
  photo_name: string;

  @Column({ type: 'varchar' })
  photo_path: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => PublishedArticle, publishedArticle => publishedArticle.user)
  publishedArticles: PublishedArticle[];
}