import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '../entities/book.entity';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'Título do livro',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Status do livro',
    enum: BookStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;

  @ApiProperty({
    description: 'URL da imagem de capa',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    description: 'URL do PDF gerado',
    required: false,
  })
  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @ApiProperty({
    description: 'Conteúdo personalizado do livro (JSON)',
    required: false,
  })
  @IsOptional()
  @IsString()
  personalizedContent?: string;

  @ApiProperty({
    description: 'Progresso da geração (0-100)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  generationProgress?: number;

  @ApiProperty({
    description: 'Mensagem de erro (se houver)',
    required: false,
  })
  @IsOptional()
  @IsString()
  errorMessage?: string;
}

