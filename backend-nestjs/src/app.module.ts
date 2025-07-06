import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { StoriesModule } from './stories/stories.module';
import { AiModule } from './ai/ai.module';
import { PdfModule } from './pdf/pdf.module';
import { ProcessingModule } from './processing/processing.module';
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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'meu-livro-magico-super-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '24h' },
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
    BooksModule,
    StoriesModule,
    AiModule,
    PdfModule,
    ProcessingModule,
  ],
  controllers: [],
  providers: [
    // Guard global de autenticação
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

