import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
// import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';

@Injectable()
export class SupabaseConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const forceSupabase = process.env.FORCE_SUPABASE === 'true';
        const useSupabase = process.env.USE_SUPABASE === 'true';
        const isProduction = process.env.NODE_ENV === 'production';

        // Tentar Supabase primeiro se solicitado
        if (forceSupabase || useSupabase || isProduction) {
            console.log('🔌 TENTANDO SUPABASE: Configurando PostgreSQL...');
            console.log('🌐 Host: db.meuhxbicgovoozocqaez.supabase.co');
            console.log('⚠️ Se falhar, usará SQLite como fallback');

            return {
                type: 'postgres',
                host: 'db.meuhxbicgovoozocqaez.supabase.co',
                port: 5432,
                username: 'postgres',
                password: '#$Sele130905',
                database: 'postgres',
                entities: [User, Story],
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
                retryAttempts: 1, // Reduzido para falhar mais rápido
                retryDelay: 1000,
            };
        } else {
            console.log('🔌 DESENVOLVIMENTO: Usando SQLite local...');
            console.log('💡 Para tentar Supabase: FORCE_SUPABASE=true');

            return {
                type: 'sqlite',
                database: 'database/meu-livro-magico.db',
                entities: [User, Story],
                synchronize: true,
                logging: ['error', 'warn'],
            };
        }
    }
}
