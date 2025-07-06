import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo livro personalizado' })
  @ApiResponse({
    status: 201,
    description: 'Livro criado com sucesso',
    type: Book,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou história não encontrada',
  })
  async create(@Body() createBookDto: CreateBookDto, @Request() req): Promise<Book> {
    return this.booksService.create(createBookDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar livros do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros retornada com sucesso',
    type: [Book],
  })
  async findAll(@Request() req): Promise<Book[]> {
    return this.booksService.findAll(req.user.id);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Obter estatísticas dos livros do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
  })
  async getStatistics(@Request() req) {
    return this.booksService.getStatistics(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar livro por ID' })
  @ApiResponse({
    status: 200,
    description: 'Livro encontrado',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Livro não encontrado',
  })
  async findOne(@Param('id') id: string, @Request() req): Promise<Book> {
    return this.booksService.findOne(+id, req.user.id);
  }

  @Get(':id/content')
  @ApiOperation({ summary: 'Obter conteúdo personalizado do livro' })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo personalizado retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Livro não encontrado',
  })
  async getPersonalizedContent(@Param('id') id: string, @Request() req) {
    return this.booksService.getPersonalizedContent(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro atualizado com sucesso',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Livro não encontrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Livro não encontrado',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
    await this.booksService.remove(+id, req.user.id);
    return { message: 'Livro deletado com sucesso' };
  }
}

