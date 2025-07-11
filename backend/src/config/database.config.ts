import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
// import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    console.log('🔧 Configurando banco de dados...');

    // FORÇAR USO EXCLUSIVO DO SUPABASE
    const supabaseUrl = configService.get<string>('SUPABASE_DB_URL');

    if (!supabaseUrl) {
        throw new Error('❌ SUPABASE_DB_URL é obrigatória! Configure no arquivo .env');
    }

    console.log('✅ Usando Supabase PostgreSQL exclusivamente');
    console.log(`🔗 Host: ${configService.get<string>('SUPABASE_DB_HOST')}`);

    return {
        type: 'postgres',
        url: supabaseUrl,
        host: configService.get<string>('SUPABASE_DB_HOST'),
        port: parseInt(configService.get<string>('SUPABASE_DB_PORT', '5432')),
        username: configService.get<string>('SUPABASE_DB_USERNAME'),
        password: configService.get<string>('SUPABASE_DB_PASSWORD'),
        database: configService.get<string>('SUPABASE_DB_NAME'),
        entities: [User, Story],
        synchronize: true, // Cria tabelas automaticamente
        ssl: {
            rejectUnauthorized: false, // Necessário para Supabase
        },
        logging: ['error', 'warn', 'migration'],
        retryAttempts: 3,
        retryDelay: 3000,
        autoLoadEntities: true,
    };
};
