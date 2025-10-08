import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SeedService } from './src/seed/seed.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  
  console.log('🌱 Starting database seeding...');
  
  try {
    await seedService.seedUsers();
    await seedService.seedHighestDegrees();
    await seedService.seedResearchCenters();
    console.log('✅ All seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await app.close();
  }
}

seed(); 