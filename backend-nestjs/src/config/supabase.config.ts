import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';

@Injectable()
export class SupabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const useSupabase = this.configService.get('USE_SUPABASE') === 'true';

    if (useSupabase) {
      // Configuração para Supabase PostgreSQL
      return {
        type: 'postgres',
        host: this.configService.get('SUPABASE_DB_HOST'),
        port: parseInt(this.configService.get('SUPABASE_DB_PORT', '5432')),
        username: this.configService.get('SUPABASE_DB_USER'),
        password: this.configService.get('SUPABASE_DB_PASSWORD'),
        database: this.configService.get('SUPABASE_DB_NAME'),
        entities: [User, Book, Story],
        synchronize: !isProduction, // Apenas em desenvolvimento
        logging: !isProduction,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
        extra: {
          ssl: isProduction ? { rejectUnauthorized: false } : false,
        },
      };
    } else {
      // Fallback para SQLite local
      return {
        type: 'sqlite',
        database: this.configService.get('DATABASE_PATH', 'database/meu-livro-magico.db'),
        entities: [User, Book, Story],
        synchronize: true,
        logging: !isProduction,
        // Configurações específicas para SQLite
        enableWAL: true,
      };
    }
  }
}

