import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PublishedArticle } from '../published-article/published-article.entity';
import * as bcrypt from 'bcryptjs';

export interface CreateUserDto {
  email: string;
  salutation: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  website: string;
  publishedArticles: Array<{
    title: string;
    yearPub: string;
    doi: string;
  }>;
  institution: string;
  department: string;
  researchCenterOffice: number;
  otherResearchCenter?: string;
  contactNo?: string;
  highestDegree: number;
  otherDegree?: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PublishedArticle)
    private publishedArticleRepository: Repository<PublishedArticle>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Create new user
    const user = this.userRepository.create({
      email: createUserDto.email,
      salutation: createUserDto.salutation,
      first_name: createUserDto.firstName,
      middle_name: createUserDto.middleInitial || null,
      last_name: createUserDto.lastName,
      website: createUserDto.website,
      institution: createUserDto.institution,
      department: createUserDto.department,
      research_center_office: createUserDto.researchCenterOffice,
      other_research_center: createUserDto.otherResearchCenter || null,
      contact_no: createUserDto.contactNo || null,
      highest_degree: createUserDto.highestDegree,
      other_degree: createUserDto.otherDegree || null,
      password: hashedPassword,
      user_type: 1, // Default to researcher
      photo_name: 'default.jpg',
      photo_path: '/uploads/default.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedUser = await this.userRepository.save(user);

    // Save published articles if any
    if (createUserDto.publishedArticles && createUserDto.publishedArticles.length > 0) {
      const articlesToSave = createUserDto.publishedArticles
        .filter(article => article.title.trim() !== '') // Only save articles with titles
        .map(article => 
          this.publishedArticleRepository.create({
            title: article.title,
            year_pub: article.yearPub,
            doi: article.doi || null,
            user_id: savedUser.user_id,
            created_at: new Date(),
            updated_at: new Date(),
          })
        );

      if (articlesToSave.length > 0) {
        await this.publishedArticleRepository.save(articlesToSave);
      }
    }

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, {
      ...updateData,
      updated_at: new Date(),
    });
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
