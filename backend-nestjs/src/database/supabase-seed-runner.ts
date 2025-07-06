import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';
import { seedStories } from './seeds';

async function runSupabaseSeeds() {
  const configService = new ConfigService();
  
  const useSupabase = configService.get('USE_SUPABASE') === 'true';
  
  let dataSource: DataSource;
  
  if (useSupabase) {
    // Configuração para Supabase PostgreSQL
    dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('SUPABASE_DB_HOST'),
      port: parseInt(configService.get('SUPABASE_DB_PORT', '5432')),
      username: configService.get('SUPABASE_DB_USER'),
      password: configService.get('SUPABASE_DB_PASSWORD'),
      database: configService.get('SUPABASE_DB_NAME'),
      entities: [User, Book, Story],
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    });
  } else {
    // Fallback para SQLite local
    dataSource = new DataSource({
      type: 'sqlite',
      database: configService.get('DATABASE_PATH', 'database/meu-livro-magico.db'),
      entities: [User, Book, Story],
      synchronize: true,
      logging: true,
    });
  }

  try {
    console.log('🔌 Conectando ao banco de dados...');
    await dataSource.initialize();
    console.log(`✅ Conexão estabelecida com ${useSupabase ? 'Supabase PostgreSQL' : 'SQLite local'}`);

    console.log('🌱 Executando seeds...');
    await seedStories(dataSource);

    console.log('🎉 Seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Conexão fechada');
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  runSupabaseSeeds();
}

export { runSupabaseSeeds };

