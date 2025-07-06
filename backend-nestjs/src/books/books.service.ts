import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookStatus } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StoriesService } from '../stories/stories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private storiesService: StoriesService,
  ) {}

  async create(createBookDto: CreateBookDto, userId: number): Promise<Book> {
    // Verificar se a história existe
    const story = await this.storiesService.findOne(createBookDto.storyId);
    if (!story) {
      throw new BadRequestException('História não encontrada');
    }

    // Criar título personalizado
    const title = `${createBookDto.childName} e ${story.title}`;

    const book = this.booksRepository.create({
      ...createBookDto,
      title,
      userId,
      status: BookStatus.DRAFT,
    });

    return this.booksRepository.save(book);
  }

  async findAll(userId?: number): Promise<Book[]> {
    const where = userId ? { userId } : {};
    
    return this.booksRepository.find({
      where,
      relations: ['story', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId?: number): Promise<Book> {
    const where = userId ? { id, userId } : { id };
    
    const book = await this.booksRepository.findOne({
      where,
      relations: ['story', 'user'],
    });

    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto, userId?: number): Promise<Book> {
    const book = await this.findOne(id, userId);

    // Se está mudando a história, verificar se existe
    if (updateBookDto.storyId && updateBookDto.storyId !== book.storyId) {
      const story = await this.storiesService.findOne(updateBookDto.storyId);
      if (!story) {
        throw new BadRequestException('História não encontrada');
      }
      
      // Atualizar título se mudou a história
      if (updateBookDto.childName || updateBookDto.storyId) {
        const childName = updateBookDto.childName || book.childName;
        updateBookDto.title = `${childName} e ${story.title}`;
      }
    }

    Object.assign(book, updateBookDto);
    return this.booksRepository.save(book);
  }

  async remove(id: number, userId?: number): Promise<void> {
    const book = await this.findOne(id, userId);
    await this.booksRepository.remove(book);
  }

  async updateStatus(id: number, status: BookStatus, userId?: number): Promise<Book> {
    return this.update(id, { status }, userId);
  }

  async updateProgress(id: number, progress: number, userId?: number): Promise<Book> {
    return this.update(id, { generationProgress: progress }, userId);
  }

  async setError(id: number, errorMessage: string, userId?: number): Promise<Book> {
    return this.update(id, { 
      status: BookStatus.ERROR, 
      errorMessage 
    }, userId);
  }

  async getPersonalizedContent(id: number, userId?: number): Promise<any> {
    const book = await this.findOne(id, userId);
    
    if (!book.story) {
      throw new BadRequestException('História não encontrada no livro');
    }

    // Personalizar o conteúdo da história
    const personalizedPages = book.story.pages.map(page => ({
      title: page.title,
      text: this.personalizeText(page.text, book.childName, book.childAge),
      imagePrompt: page.imagePrompt ? 
        this.personalizeText(page.imagePrompt, book.childName, book.childAge) : 
        undefined,
    }));

    return {
      title: book.title,
      childName: book.childName,
      childAge: book.childAge,
      pages: personalizedPages,
      story: {
        id: book.story.id,
        title: book.story.title,
        category: book.story.category,
        gender: book.story.gender,
      },
    };
  }

  private personalizeText(text: string, childName: string, childAge: string): string {
    return text
      .replace(/{nome}/g, childName)
      .replace(/{idade}/g, childAge);
  }

  async getStatistics(userId?: number): Promise<any> {
    const where = userId ? { userId } : {};
    
    const total = await this.booksRepository.count({ where });
    const completed = await this.booksRepository.count({ 
      where: { ...where, status: BookStatus.COMPLETED } 
    });
    const generating = await this.booksRepository.count({ 
      where: { ...where, status: BookStatus.GENERATING } 
    });
    const draft = await this.booksRepository.count({ 
      where: { ...where, status: BookStatus.DRAFT } 
    });

    return {
      total,
      completed,
      generating,
      draft,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }
}

