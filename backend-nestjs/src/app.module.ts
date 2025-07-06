import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
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

@Module({
  imports: [
    // Configuração global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
  providers: [],
})
export class AppModule {}

