import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
// import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';
import { seedStories } from './seeds';

async function runSupabaseSeeds() {
    // Forçar uso do Supabase
    const useSupabase = true;

    let dataSource: DataSource;

    if (useSupabase) {
        // Configuração para Supabase PostgreSQL
        dataSource = new DataSource({
            type: 'postgres',
            host: 'db.meuhxbicgovoozocqaez.supabase.co',
            port: 5432,
            username: 'postgres',
            password: '#$Sele130905',
            database: 'postgres',
            entities: [User, Story],
            synchronize: true,
            logging: true,
            ssl: { rejectUnauthorized: false },
        });
    } else {
        // Fallback para SQLite local
        dataSource = new DataSource({
            type: 'sqlite',
            database: 'database/meu-livro-magico.db',
            entities: [User, Story],
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
