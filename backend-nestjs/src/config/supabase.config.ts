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
    const isProduction = process.env.NODE_ENV === 'production';
    const forceSupabase = process.env.FORCE_SUPABASE === 'true';
    
    if (isProduction || forceSupabase) {
      console.log('🔌 Configuração PRODUÇÃO: Tentando Supabase PostgreSQL...');
      
      return {
        type: 'postgres',
        host: 'db.meuhxbicgovoozocqaez.supabase.co',
        port: 5432,
        username: 'postgres',
        password: '#$Sele130905',
        database: 'postgres',
        entities: [User, Book, Story],
        synchronize: true,
        logging: ['error', 'warn'],
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
          connectionTimeoutMillis: 10000,
          idleTimeoutMillis: 30000,
          max: 5,
        },
        maxQueryExecutionTime: 15000,
        retryAttempts: 2,
        retryDelay: 3000,
      };
    } else {
      console.log('🔌 Configuração DESENVOLVIMENTO: Usando SQLite local...');
      console.log('💡 Para usar Supabase, defina FORCE_SUPABASE=true ou NODE_ENV=production');
      
      return {
        type: 'sqlite',
        database: 'database/meu-livro-magico.db',
        entities: [User, Book, Story],
        synchronize: true,
        logging: ['error', 'warn'],
      };
    }
  }
}

