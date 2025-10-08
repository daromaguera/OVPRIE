import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource } from 'typeorm';

async function migrateOtherFields() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  
  console.log('🔄 Starting migration for other fields...');
  
  try {
    // Check if the user table exists
    const tableExists = await dataSource.query(
      "SHOW TABLES LIKE 'user'"
    );
    
    if (tableExists.length > 0) {
      // Check if other_research_center column exists
      const columns = await dataSource.query(
        "SHOW COLUMNS FROM user LIKE 'other_research_center'"
      );
      
      if (columns.length === 0) {
        console.log('📝 Adding other_research_center column...');
        
        // Add the new column
        await dataSource.query(
          "ALTER TABLE user ADD COLUMN other_research_center VARCHAR(255) NULL"
        );
        
        console.log('✅ other_research_center column added successfully!');
      } else {
        console.log('ℹ️ other_research_center column already exists!');
      }

      // Check if other_degree column exists (should already exist)
      const degreeColumns = await dataSource.query(
        "SHOW COLUMNS FROM user LIKE 'other_degree'"
      );
      
      if (degreeColumns.length === 0) {
        console.log('📝 Adding other_degree column...');
        
        // Add the other_degree column if it doesn't exist
        await dataSource.query(
          "ALTER TABLE user ADD COLUMN other_degree VARCHAR(255) NULL"
        );
        
        console.log('✅ other_degree column added successfully!');
      } else {
        console.log('ℹ️ other_degree column already exists!');
      }
    } else {
      console.log('⚠️ User table does not exist, it will be created when synchronize is enabled');
    }
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await app.close();
  }
}

migrateOtherFields(); 