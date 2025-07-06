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
    const useSupabase = process.env.USE_SUPABASE === 'true';
    
    if ((isProduction || forceSupabase || useSupabase) && this.canConnectToSupabase()) {
      console.log('🔌 PRODUÇÃO: Configurando Supabase PostgreSQL...');
      
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
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 30000,
          max: 3,
        },
        maxQueryExecutionTime: 10000,
        retryAttempts: 1,
        retryDelay: 2000,
      };
    } else {
      const reason = isProduction ? 'Supabase indisponível' : 'Ambiente de desenvolvimento';
      console.log(`🔌 ${reason}: Usando SQLite local...`);
      console.log('💡 Para forçar Supabase: FORCE_SUPABASE=true ou USE_SUPABASE=true');
      
      return {
        type: 'sqlite',
        database: 'database/meu-livro-magico.db',
        entities: [User, Book, Story],
        synchronize: true,
        logging: ['error', 'warn'],
      };
    }
  }

  private canConnectToSupabase(): boolean {
    // Em ambiente sandbox, sempre retorna false devido a limitações de DNS
    // Em produção real, isso funcionará normalmente
    const isSandbox = process.env.HOSTNAME?.includes('sandbox') || 
                     process.env.USER === 'ubuntu';
    
    if (isSandbox) {
      console.log('⚠️ Ambiente sandbox detectado - usando SQLite');
      return false;
    }
    
    return true;
  }
}

