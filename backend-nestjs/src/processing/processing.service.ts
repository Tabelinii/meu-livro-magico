import { Injectable, Logger } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { StoriesService } from '../stories/stories.service';
import { AiService } from '../ai/ai.service';
import { PdfService, BookData } from '../pdf/pdf.service';
import { BookStatus } from '../books/entities/book.entity';

@Injectable()
export class ProcessingService {
  private readonly logger = new Logger(ProcessingService.name);

  constructor(
    private booksService: BooksService,
    private storiesService: StoriesService,
    private aiService: AiService,
    private pdfService: PdfService,
  ) {}

  async processBook(bookId: number, userId?: number): Promise<void> {
    this.logger.log(`Iniciando processamento do livro ${bookId}`);

    try {
      // Atualizar status para "gerando"
      await this.booksService.updateStatus(bookId, BookStatus.GENERATING, userId);
      await this.booksService.updateProgress(bookId, 10, userId);

      // Buscar dados do livro
      const book = await this.booksService.findOne(bookId, userId);
      if (!book.story) {
        throw new Error('História não encontrada no livro');
      }

      // Incrementar contador de uso da história
      await this.storiesService.incrementUsage(book.storyId);

      // Obter conteúdo personalizado
      const personalizedContent = await this.booksService.getPersonalizedContent(bookId, userId);
      await this.booksService.updateProgress(bookId, 20, userId);

      // Gerar imagem de capa
      this.logger.log('Gerando imagem de capa...');
      const coverImageUrl = await this.aiService.generateBookCover(
        book.childName,
        book.story.title,
        book.story.category,
        book.story.gender
      );
      
      if (coverImageUrl) {
        await this.booksService.update(bookId, { coverImageUrl }, userId);
      }
      await this.booksService.updateProgress(bookId, 40, userId);

      // Gerar imagens para as páginas
      this.logger.log('Gerando imagens das páginas...');
      const pagesWithImages = await this.generatePageImages(
        personalizedContent.pages,
        book.childName,
        book.story.title,
        bookId,
        userId
      );

      // Preparar dados para o PDF
      const bookData: BookData = {
        title: personalizedContent.title,
        childName: book.childName,
        childAge: book.childAge,
        pages: pagesWithImages,
        coverImageUrl: coverImageUrl || undefined,
      };

      await this.booksService.updateProgress(bookId, 80, userId);

      // Gerar PDF
      this.logger.log('Gerando PDF...');
      const pdfBuffer = await this.pdfService.generateBookPdf(bookData);
      
      // Salvar PDF
      const filename = `${book.childName}_${book.story.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      const pdfPath = await this.pdfService.savePdfToFile(pdfBuffer, filename);
      
      // Atualizar livro com URL do PDF
      const pdfUrl = `/api/files/pdfs/${filename}`;
      await this.booksService.update(bookId, { 
        pdfUrl,
        personalizedContent: JSON.stringify(bookData),
        status: BookStatus.COMPLETED,
        generationProgress: 100
      }, userId);

      this.logger.log(`Livro ${bookId} processado com sucesso`);

    } catch (error) {
      this.logger.error(`Erro ao processar livro ${bookId}:`, error);
      
      await this.booksService.setError(
        bookId, 
        `Erro no processamento: ${error.message}`,
        userId
      );
      
      throw error;
    }
  }

  private async generatePageImages(
    pages: any[],
    childName: string,
    storyTitle: string,
    bookId: number,
    userId?: number
  ): Promise<any[]> {
    const pagesWithImages = [];
    const totalPages = pages.length;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      try {
        // Gerar imagem para a página se houver prompt
        let imageUrl = null;
        if (page.imagePrompt || page.text) {
          const prompt = page.imagePrompt || page.text;
          imageUrl = await this.aiService.generateStoryImage(
            prompt,
            childName,
            storyTitle
          );
        }

        pagesWithImages.push({
          title: page.title,
          text: page.text,
          imageUrl: imageUrl || undefined,
        });

        // Atualizar progresso
        const progress = 40 + Math.round((i + 1) / totalPages * 30);
        await this.booksService.updateProgress(bookId, progress, userId);

        this.logger.log(`Página ${i + 1}/${totalPages} processada`);

      } catch (error) {
        this.logger.warn(`Erro ao gerar imagem para página ${i + 1}:`, error);
        
        // Continuar sem imagem em caso de erro
        pagesWithImages.push({
          title: page.title,
          text: page.text,
          imageUrl: undefined,
        });
      }
    }

    return pagesWithImages;
  }

  async generatePreview(bookId: number, userId?: number): Promise<string[]> {
    this.logger.log(`Gerando preview do livro ${bookId}`);

    try {
      const book = await this.booksService.findOne(bookId, userId);
      const personalizedContent = await this.booksService.getPersonalizedContent(bookId, userId);

      // Preparar dados básicos para preview (sem imagens IA)
      const bookData: BookData = {
        title: personalizedContent.title,
        childName: book.childName,
        childAge: book.childAge,
        pages: personalizedContent.pages.slice(0, 3), // Apenas 3 páginas para preview
        coverImageUrl: book.coverImageUrl || undefined,
      };

      return await this.pdfService.generatePreviewImages(bookData);

    } catch (error) {
      this.logger.error(`Erro ao gerar preview do livro ${bookId}:`, error);
      throw error;
    }
  }

  async getProcessingStatus(bookId: number, userId?: number): Promise<any> {
    const book = await this.booksService.findOne(bookId, userId);
    
    return {
      id: book.id,
      status: book.status,
      progress: book.generationProgress || 0,
      errorMessage: book.errorMessage,
      isCompleted: book.status === BookStatus.COMPLETED,
      isProcessing: book.status === BookStatus.GENERATING,
      hasError: book.status === BookStatus.ERROR,
    };
  }

  async retryProcessing(bookId: number, userId?: number): Promise<void> {
    this.logger.log(`Tentando reprocessar livro ${bookId}`);

    // Resetar status e erro
    await this.booksService.update(bookId, {
      status: BookStatus.DRAFT,
      generationProgress: 0,
      errorMessage: null,
    }, userId);

    // Iniciar processamento novamente
    await this.processBook(bookId, userId);
  }
}

