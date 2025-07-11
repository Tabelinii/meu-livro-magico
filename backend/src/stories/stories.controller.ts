import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Story, StoryCategory, StoryGender } from './entities/story.entity';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova história (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'História criada com sucesso',
    type: Story,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito - Slug já existe',
  })
  async create(@Body() createStoryDto: CreateStoryDto): Promise<Story> {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar histórias disponíveis' })
  @ApiQuery({ name: 'category', enum: StoryCategory, required: false })
  @ApiQuery({ name: 'gender', enum: StoryGender, required: false })
  @ApiQuery({ name: 'isActive', type: Boolean, required: false })
  @ApiResponse({
    status: 200,
    description: 'Lista de histórias retornada com sucesso',
    type: [Story],
  })
  async findAll(
    @Query('category') category?: StoryCategory,
    @Query('gender') gender?: StoryGender,
    @Query('isActive') isActive?: boolean,
  ): Promise<Story[]> {
    return this.storiesService.findAll(category, gender, isActive);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Obter histórias em destaque' })
  @ApiResponse({
    status: 200,
    description: 'Histórias em destaque retornadas com sucesso',
    type: [Story],
  })
  async getFeatured(): Promise<Story[]> {
    return this.storiesService.getFeatured();
  }

  @Get('popular')
  @ApiOperation({ summary: 'Obter histórias mais populares' })
  @ApiResponse({
    status: 200,
    description: 'Histórias populares retornadas com sucesso',
    type: [Story],
  })
  async getPopular(): Promise<Story[]> {
    return this.storiesService.getPopular();
  }

  @Get('by-category')
  @ApiOperation({ summary: 'Obter histórias agrupadas por categoria' })
  @ApiResponse({
    status: 200,
    description: 'Histórias agrupadas por categoria',
  })
  async getByCategory() {
    return this.storiesService.getByCategory();
  }

  @Get('by-gender')
  @ApiOperation({ summary: 'Obter histórias agrupadas por gênero' })
  @ApiResponse({
    status: 200,
    description: 'Histórias agrupadas por gênero',
  })
  async getByGender() {
    return this.storiesService.getByGender();
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas das histórias (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
  })
  async getStatistics() {
    return this.storiesService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar história por ID' })
  @ApiResponse({
    status: 200,
    description: 'História encontrada',
    type: Story,
  })
  @ApiResponse({
    status: 404,
    description: 'História não encontrada',
  })
  async findOne(@Param('id') id: string): Promise<Story> {
    return this.storiesService.findOne(+id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Buscar história por slug' })
  @ApiResponse({
    status: 200,
    description: 'História encontrada',
    type: Story,
  })
  @ApiResponse({
    status: 404,
    description: 'História não encontrada',
  })
  async findBySlug(@Param('slug') slug: string): Promise<Story> {
    return this.storiesService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar história (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'História atualizada com sucesso',
    type: Story,
  })
  @ApiResponse({
    status: 404,
    description: 'História não encontrada',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ): Promise<Story> {
    return this.storiesService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar história (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'História deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'História não encontrada',
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.storiesService.remove(+id);
    return { message: 'História deletada com sucesso' };
  }
}

