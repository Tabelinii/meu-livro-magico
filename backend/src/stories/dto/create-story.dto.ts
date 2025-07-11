import { IsString, IsEnum, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StoryCategory, StoryGender } from '../entities/story.entity';

export class CreateStoryDto {
  @ApiProperty({
    description: 'Slug único da história',
    example: 'grande-aventura-penico',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Título da história',
    example: 'A Grande Aventura do Penico',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descrição da história',
    example: 'Uma aventura mágica sobre o desfralde',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Categoria da história',
    enum: StoryCategory,
    example: StoryCategory.DESENVOLVIMENTO_INFANTIL,
  })
  @IsEnum(StoryCategory)
  category: StoryCategory;

  @ApiProperty({
    description: 'Gênero alvo da história',
    enum: StoryGender,
    example: StoryGender.UNISSEX,
  })
  @IsEnum(StoryGender)
  gender: StoryGender;

  @ApiProperty({
    description: 'Faixa etária recomendada',
    example: '2-5 anos',
  })
  @IsString()
  ageRange: string;

  @ApiProperty({
    description: 'URL da imagem de capa',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    description: 'Páginas da história',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        text: { type: 'string' },
        imagePrompt: { type: 'string' },
      },
    },
  })
  @IsArray()
  pages: {
    title: string;
    text: string;
    imagePrompt?: string;
  }[];

  @ApiProperty({
    description: 'Se a história está ativa',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Se a história é destacada',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

