import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Story } from '../stories/entities/story.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.get('DATABASE_PATH', 'database/meu-livro-magico.db'),
      entities: [User, Book, Story],
      synchronize: this.configService.get('NODE_ENV') !== 'production',
      logging: this.configService.get('NODE_ENV') === 'development',
      autoLoadEntities: true,
    };
  }
}

