import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource } from 'typeorm';

async function migrateColumn() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  
  console.log('🔄 Starting column migration...');
  
  try {
    // Check if the old column exists
    const tableExists = await dataSource.query(
      "SHOW TABLES LIKE 'user'"
    );
    
    if (tableExists.length > 0) {
      // Check if higest_degree column exists
      const columns = await dataSource.query(
        "SHOW COLUMNS FROM user LIKE 'higest_degree'"
      );
      
      if (columns.length > 0) {
        console.log('📝 Renaming higest_degree to highest_degree...');
        
        // Rename the column
        await dataSource.query(
          "ALTER TABLE user CHANGE higest_degree highest_degree INT NULL COMMENT '1 - Bachelor, 2 - Master, 3 - Doctoral, 4 - Professional Degree (MD, JD, etc.), 5 - Vocational /Technical Certificate, 6 - Other'"
        );
        
        console.log('✅ Column renamed successfully!');
      } else {
        console.log('ℹ️ Column higest_degree does not exist, checking for highest_degree...');
        
        const newColumns = await dataSource.query(
          "SHOW COLUMNS FROM user LIKE 'highest_degree'"
        );
        
        if (newColumns.length > 0) {
          console.log('✅ Column highest_degree already exists!');
        } else {
          console.log('⚠️ Neither column exists, creating highest_degree...');
          await dataSource.query(
            "ALTER TABLE user ADD COLUMN highest_degree INT NULL COMMENT '1 - Bachelor, 2 - Master, 3 - Doctoral, 4 - Professional Degree (MD, JD, etc.), 5 - Vocational /Technical Certificate, 6 - Other'"
          );
          console.log('✅ Column highest_degree created successfully!');
        }
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

migrateColumn(); 