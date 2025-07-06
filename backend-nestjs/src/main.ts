import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir acesso do frontend
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('Meu Livro Mágico API')
    .setDescription('API para plataforma de livros personalizados com IA')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação e autorização')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('books', 'Criação e gerenciamento de livros')
    .addTag('stories', 'Histórias e templates')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configurar prefixo global da API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  console.log(`🚀 Meu Livro Mágico Backend rodando em: http://localhost:${port}`);
  console.log(`📚 Documentação da API: http://localhost:${port}/api/docs`);
  console.log(`🌍 Ambiente: ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);
  console.log(`💾 Banco: ${isProduction || process.env.FORCE_SUPABASE === 'true' ? 'Supabase PostgreSQL' : 'SQLite Local'}`);
}

bootstrap();

