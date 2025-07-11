import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { BooksModule } from './books/books.module';
import { StoriesModule } from './stories/stories.module';
import { AiModule } from './ai/ai.module';
import { PdfModule } from './pdf/pdf.module';
// import { ProcessingModule } from './processing/processing.module';
import { CommonModule } from './common/common.module';
import { SupabaseConfig } from './config/supabase.config';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
    imports: [
        // Configuração global
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // JWT Module global
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '24h' },
            }),
        }),

        // Servir arquivos estáticos (PDFs, imagens)
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/api/files',
        }),

        // Configuração do banco de dados (SQLite ou Supabase PostgreSQL)
        TypeOrmModule.forRootAsync({
            useClass: SupabaseConfig,
        }),

        // Módulos da aplicação
        CommonModule,
        AuthModule,
        UsersModule,
        // BooksModule,
        StoriesModule,
        AiModule,
        PdfModule,
        // ProcessingModule,
    ],
    controllers: [],
})
export class AppModule {}
