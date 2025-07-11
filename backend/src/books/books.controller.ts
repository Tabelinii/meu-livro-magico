// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
// import { BooksService } from './books.service';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { CurrentUser } from '../common/decorators/current-user.decorator';
// import { User } from '../users/entities/user.entity';
// import { Book } from './entities/book.entity';

// @ApiTags('books')
// @Controller('api/books')
// @ApiBearerAuth()
// export class BooksController {
//     constructor(private readonly booksService: BooksService) {}

//     @Post()
//     @ApiOperation({
//         summary: 'Criar novo livro personalizado',
//         description: 'Cria um novo livro vinculado automaticamente ao usuário logado',
//     })
//     @ApiResponse({
//         status: 201,
//         description: 'Livro criado com sucesso',
//         type: Book,
//     })
//     @ApiResponse({
//         status: 400,
//         description: 'Dados inválidos ou história não encontrada',
//     })
//     @ApiResponse({
//         status: 401,
//         description: 'Usuário não autenticado',
//     })
//     async create(@Body() createBookDto: CreateBookDto, @CurrentUser() user: User): Promise<Book> {
//         return this.booksService.create(createBookDto, user.id);
//     }

//     @Get()
//     @ApiOperation({
//         summary: 'Listar meus livros',
//         description: 'Lista apenas os livros do usuário logado',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Lista de livros retornada com sucesso',
//         type: [Book],
//     })
//     async findAll(@CurrentUser() user: User): Promise<Book[]> {
//         return this.booksService.findAll(user.id);
//     }

//     @Get('statistics')
//     @ApiOperation({
//         summary: 'Obter estatísticas dos meus livros',
//         description: 'Estatísticas dos livros do usuário logado',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Estatísticas retornadas com sucesso',
//     })
//     async getStatistics(@CurrentUser() user: User) {
//         return this.booksService.getStatistics(user.id);
//     }

//     @Get(':id')
//     @ApiOperation({
//         summary: 'Buscar meu livro por ID',
//         description: 'Busca um livro específico (apenas se pertencer ao usuário logado)',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Livro encontrado',
//         type: Book,
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado ou não pertence ao usuário',
//     })
//     async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<Book> {
//         return this.booksService.findOne(+id, user.id);
//     }

//     @Get(':id/content')
//     @ApiOperation({
//         summary: 'Obter conteúdo personalizado do livro',
//         description: 'Retorna o conteúdo personalizado (apenas se pertencer ao usuário logado)',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Conteúdo personalizado retornado com sucesso',
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado ou não pertence ao usuário',
//     })
//     async getPersonalizedContent(@Param('id') id: string, @CurrentUser() user: User) {
//         return this.booksService.getPersonalizedContent(+id, user.id);
//     }

//     @Patch(':id')
//     @ApiOperation({
//         summary: 'Atualizar meu livro',
//         description: 'Atualiza um livro (apenas se pertencer ao usuário logado)',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Livro atualizado com sucesso',
//         type: Book,
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado ou não pertence ao usuário',
//     })
//     async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @CurrentUser() user: User): Promise<Book> {
//         return this.booksService.update(+id, updateBookDto, user.id);
//     }

//     @Delete(':id')
//     @ApiOperation({
//         summary: 'Deletar meu livro',
//         description: 'Remove um livro (apenas se pertencer ao usuário logado)',
//     })
//     @ApiResponse({
//         status: 200,
//         description: 'Livro deletado com sucesso',
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado ou não pertence ao usuário',
//     })
//     async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<{ message: string }> {
//         await this.booksService.remove(+id, user.id);
//         return { message: 'Livro deletado com sucesso' };
//     }
// }
