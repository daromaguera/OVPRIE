import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { HighestDegree } from '../highest-degree/highest-degree.entity';
import { ResearchCenter } from '../research-center/research-center.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(HighestDegree)
    private highestDegreeRepository: Repository<HighestDegree>,
    @InjectRepository(ResearchCenter)
    private researchCenterRepository: Repository<ResearchCenter>,
  ) {}

  async seedUsers() {
    try {
      // Check if admin user already exists
      const existingAdmin = await this.userRepository.findOne({
        where: { email: 'admin@ovprdie.com' },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const adminUser = this.userRepository.create({
          user_type: 32, // admin
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@ovprdie.com',
          password: hashedPassword,
          token: null,
          photo_name: 'default.jpg',
          photo_path: '/uploads/default.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        });

        await this.userRepository.save(adminUser);
        console.log('✅ Admin user created successfully');
      } else {
        console.log('ℹ️ Admin user already exists');
      }

      // Check if test researcher exists
      const existingResearcher = await this.userRepository.findOne({
        where: { email: 'researcher@ovprdie.com' },
      });

      if (!existingResearcher) {
        const hashedPassword = await bcrypt.hash('researcher123', 10);
        
        const researcherUser = this.userRepository.create({
          user_type: 1, // researcher
          first_name: 'Test',
          last_name: 'Researcher',
          email: 'researcher@ovprdie.com',
          password: hashedPassword,
          token: null,
          photo_name: 'default.jpg',
          photo_path: '/uploads/default.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        });

        await this.userRepository.save(researcherUser);
        console.log('✅ Test researcher created successfully');
      } else {
        console.log('ℹ️ Test researcher already exists');
      }

      console.log('🎉 User seeding completed successfully!');
      console.log('📧 Test credentials:');
      console.log('   Admin: admin@ovprdie.com / admin123');
      console.log('   Researcher: researcher@ovprdie.com / researcher123');
      
    } catch (error) {
      console.error('❌ Error seeding users:', error);
    }
  }

  async seedHighestDegrees() {
    try {
      const degrees = [
        {
          name: 'Bachelor of Science',
          abbreviation: 'BS',
          description: 'Undergraduate degree in science',
          level: 1,
          is_ongoing: false,
        },
        {
          name: 'Bachelor of Arts',
          abbreviation: 'BA',
          description: 'Undergraduate degree in arts',
          level: 1,
          is_ongoing: false,
        },
        {
          name: 'Bachelor of Engineering',
          abbreviation: 'BEng',
          description: 'Undergraduate degree in engineering',
          level: 1,
          is_ongoing: false,
        },
        {
          name: 'Master of Science',
          abbreviation: 'MS',
          description: 'Graduate degree in science',
          level: 2,
          is_ongoing: false,
        },
        {
          name: 'Master of Arts',
          abbreviation: 'MA',
          description: 'Graduate degree in arts',
          level: 2,
          is_ongoing: false,
        },
        {
          name: 'Master of Business Administration',
          abbreviation: 'MBA',
          description: 'Graduate degree in business administration',
          level: 2,
          is_ongoing: false,
        },
        {
          name: 'Doctor of Philosophy',
          abbreviation: 'PhD',
          description: 'Doctoral degree in philosophy',
          level: 3,
          is_ongoing: false,
        },
        {
          name: 'Doctor of Science',
          abbreviation: 'DSc',
          description: 'Doctoral degree in science',
          level: 3,
          is_ongoing: false,
        },
        {
          name: 'Doctor of Medicine',
          abbreviation: 'MD',
          description: 'Professional degree in medicine',
          level: 3,
          is_ongoing: false,
        },
        {
          name: 'Post-Doctoral Fellowship',
          abbreviation: 'PostDoc',
          description: 'Post-doctoral research fellowship',
          level: 4,
          is_ongoing: false,
        },
        {
          name: 'Currently Pursuing Bachelor\'s',
          abbreviation: 'BS (Ongoing)',
          description: 'Currently pursuing bachelor\'s degree',
          level: 1,
          is_ongoing: true,
        },
        {
          name: 'Currently Pursuing Master\'s',
          abbreviation: 'MS (Ongoing)',
          description: 'Currently pursuing master\'s degree',
          level: 2,
          is_ongoing: true,
        },
        {
          name: 'Currently Pursuing PhD',
          abbreviation: 'PhD (Ongoing)',
          description: 'Currently pursuing doctoral degree',
          level: 3,
          is_ongoing: true,
        },
        {
          name: 'Other',
          abbreviation: 'Other',
          description: 'Other degree or qualification',
          level: 1,
          is_ongoing: false,
        },
      ];

      for (const degreeData of degrees) {
        const existingDegree = await this.highestDegreeRepository.findOne({
          where: { name: degreeData.name },
        });

        if (!existingDegree) {
          const degree = this.highestDegreeRepository.create(degreeData);
          await this.highestDegreeRepository.save(degree);
          console.log(`✅ Created degree: ${degreeData.name}`);
        } else {
          console.log(`ℹ️ Degree already exists: ${degreeData.name}`);
        }
      }

      console.log('🎉 Highest degrees seeding completed successfully!');
      
    } catch (error) {
      console.error('❌ Error seeding highest degrees:', error);
    }
  }

  async seedResearchCenters() {
    try {
      const centers = [
        {
          name: 'Research and Development Center',
          description: 'Main research and development facility',
          location: 'Main Campus',
          director: 'Dr. Research Director',
          contact_email: 'rdc@csu.edu.ph',
          contact_phone: '+63 123 456 7890',
        },
        {
          name: 'Extension Office',
          description: 'Community extension and outreach services',
          location: 'Extension Building',
          director: 'Dr. Extension Director',
          contact_email: 'extension@csu.edu.ph',
          contact_phone: '+63 123 456 7891',
        },
        {
          name: 'Academic Affairs Office',
          description: 'Academic programs and curriculum development',
          location: 'Administration Building',
          director: 'Dr. Academic Director',
          contact_email: 'academic@csu.edu.ph',
          contact_phone: '+63 123 456 7892',
        },
        {
          name: 'Student Affairs Office',
          description: 'Student services and activities',
          location: 'Student Center',
          director: 'Dr. Student Affairs Director',
          contact_email: 'studentaffairs@csu.edu.ph',
          contact_phone: '+63 123 456 7893',
        },
        {
          name: 'Administrative Office',
          description: 'General administrative services',
          location: 'Administration Building',
          director: 'Dr. Admin Director',
          contact_email: 'admin@csu.edu.ph',
          contact_phone: '+63 123 456 7894',
        },
        {
          name: 'Technology Transfer and Licensing Office',
          description: 'Technology transfer and intellectual property management',
          location: 'Innovation Center',
          director: 'Dr. TTLO Director',
          contact_email: 'ttlo@csu.edu.ph',
          contact_phone: '+63 123 456 7895',
        },
        {
          name: 'Other',
          description: 'Other research center or office',
          location: 'Various',
          director: 'Various',
          contact_email: 'other@csu.edu.ph',
          contact_phone: '+63 123 456 7896',
        },
      ];

      for (const centerData of centers) {
        const existingCenter = await this.researchCenterRepository.findOne({
          where: { name: centerData.name },
        });

        if (!existingCenter) {
          const center = this.researchCenterRepository.create(centerData);
          await this.researchCenterRepository.save(center);
          console.log(`✅ Created research center: ${centerData.name}`);
        } else {
          console.log(`ℹ️ Research center already exists: ${centerData.name}`);
        }
      }

      console.log('🎉 Research centers seeding completed successfully!');
      
    } catch (error) {
      console.error('❌ Error seeding research centers:', error);
    }
  }
} 