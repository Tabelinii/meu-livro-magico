// import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// // import { ProcessingService } from './processing.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// @ApiTags('processing')
// @Controller('processing')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// export class ProcessingController {
//     constructor(private readonly processingService: ProcessingService) {}

//     @Post('books/:id/process')
//     @ApiOperation({ summary: 'Iniciar processamento de livro' })
//     @ApiResponse({
//         status: 200,
//         description: 'Processamento iniciado com sucesso',
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado',
//     })
//     async processBook(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
//         // Processar de forma assíncrona
//         this.processingService.processBook(+id, req.user.id).catch((error) => {
//             console.error('Erro no processamento assíncrono:', error);
//         });

//         return { message: 'Processamento iniciado com sucesso' };
//     }

//     @Get('books/:id/status')
//     @ApiOperation({ summary: 'Obter status do processamento' })
//     @ApiResponse({
//         status: 200,
//         description: 'Status retornado com sucesso',
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado',
//     })
//     async getProcessingStatus(@Param('id') id: string, @Request() req) {
//         return this.processingService.getProcessingStatus(+id, req.user.id);
//     }

//     @Get('books/:id/preview')
//     @ApiOperation({ summary: 'Gerar preview do livro' })
//     @ApiResponse({
//         status: 200,
//         description: 'Preview gerado com sucesso',
//         schema: {
//             type: 'object',
//             properties: {
//                 images: {
//                     type: 'array',
//                     items: { type: 'string' },
//                     description: 'Array de imagens em base64',
//                 },
//             },
//         },
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado',
//     })
//     async generatePreview(@Param('id') id: string, @Request() req) {
//         const images = await this.processingService.generatePreview(+id, req.user.id);
//         return { images };
//     }

//     @Post('books/:id/retry')
//     @ApiOperation({ summary: 'Tentar reprocessar livro com erro' })
//     @ApiResponse({
//         status: 200,
//         description: 'Reprocessamento iniciado com sucesso',
//     })
//     @ApiResponse({
//         status: 404,
//         description: 'Livro não encontrado',
//     })
//     async retryProcessing(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
//         // Reprocessar de forma assíncrona
//         this.processingService.retryProcessing(+id, req.user.id).catch((error) => {
//             console.error('Erro no reprocessamento assíncrono:', error);
//         });

//         return { message: 'Reprocessamento iniciado com sucesso' };
//     }
// }
