import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Nome da criança protagonista',
    example: 'João',
  })
  @IsString()
  @MinLength(2)
  childName: string;

  @ApiProperty({
    description: 'Idade da criança',
    example: '5',
  })
  @IsString()
  childAge: string;

  @ApiProperty({
    description: 'Interesses da criança (opcional)',
    example: 'dinossauros, futebol, desenhar',
    required: false,
  })
  @IsOptional()
  @IsString()
  childInterests?: string;

  @ApiProperty({
    description: 'ID da história/template a ser usado',
    example: 1,
  })
  @IsNumber()
  storyId: number;
}

