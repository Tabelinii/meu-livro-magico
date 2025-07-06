import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { ProcessingController } from './processing.controller';
import { BooksModule } from '../books/books.module';
import { StoriesModule } from '../stories/stories.module';
import { AiModule } from '../ai/ai.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [
    BooksModule,
    StoriesModule,
    AiModule,
    PdfModule,
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService],
  exports: [ProcessingService],
})
export class ProcessingModule {}

