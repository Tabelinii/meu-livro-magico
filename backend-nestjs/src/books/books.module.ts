import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { StoriesModule } from '../stories/stories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    StoriesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}

