import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
// import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';
import { seedStories } from './seeds';

async function runSeeds() {
    const dataSource = new DataSource({
        type: 'sqlite',
        database: 'database/meu-livro-magico.db',
        entities: [User, Story],
        synchronize: true,
        logging: false,
    });

    try {
        await dataSource.initialize();
        console.log('Conexão com banco de dados estabelecida');

        await seedStories(dataSource);

        console.log('Seeds executados com sucesso!');
    } catch (error) {
        console.error('Erro ao executar seeds:', error);
    } finally {
        await dataSource.destroy();
    }
}

runSeeds();
