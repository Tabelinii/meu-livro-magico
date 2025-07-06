import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story, StoryCategory, StoryGender } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    // Verificar se slug já existe
    const existingStory = await this.storiesRepository.findOne({
      where: { slug: createStoryDto.slug },
    });
    if (existingStory) {
      throw new ConflictException('Slug já existe');
    }

    const story = this.storiesRepository.create(createStoryDto);
    return this.storiesRepository.save(story);
  }

  async findAll(
    category?: StoryCategory,
    gender?: StoryGender,
    isActive?: boolean,
  ): Promise<Story[]> {
    const where: any = {};
    
    if (category) where.category = category;
    if (gender) where.gender = gender;
    if (isActive !== undefined) where.isActive = isActive;

    return this.storiesRepository.find({
      where,
      order: { isFeatured: 'DESC', usageCount: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Story> {
    const story = await this.storiesRepository.findOne({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException('História não encontrada');
    }

    return story;
  }

  async findBySlug(slug: string): Promise<Story> {
    const story = await this.storiesRepository.findOne({
      where: { slug },
    });

    if (!story) {
      throw new NotFoundException('História não encontrada');
    }

    return story;
  }

  async update(id: number, updateStoryDto: UpdateStoryDto): Promise<Story> {
    const story = await this.findOne(id);

    // Verificar conflito de slug se está sendo alterado
    if (updateStoryDto.slug && updateStoryDto.slug !== story.slug) {
      const existingStory = await this.storiesRepository.findOne({
        where: { slug: updateStoryDto.slug },
      });
      if (existingStory) {
        throw new ConflictException('Slug já existe');
      }
    }

    Object.assign(story, updateStoryDto);
    return this.storiesRepository.save(story);
  }

  async remove(id: number): Promise<void> {
    const story = await this.findOne(id);
    await this.storiesRepository.remove(story);
  }

  async incrementUsage(id: number): Promise<void> {
    await this.storiesRepository.increment({ id }, 'usageCount', 1);
  }

  async getByCategory(): Promise<any> {
    const stories = await this.findAll();
    
    const grouped = stories.reduce((acc, story) => {
      if (!acc[story.category]) {
        acc[story.category] = [];
      }
      acc[story.category].push(story);
      return acc;
    }, {});

    return grouped;
  }

  async getByGender(): Promise<any> {
    const stories = await this.findAll();
    
    const grouped = stories.reduce((acc, story) => {
      if (!acc[story.gender]) {
        acc[story.gender] = [];
      }
      acc[story.gender].push(story);
      return acc;
    }, {});

    return grouped;
  }

  async getFeatured(): Promise<Story[]> {
    return this.storiesRepository.find({
      where: { isFeatured: true, isActive: true },
      order: { usageCount: 'DESC' },
      take: 6,
    });
  }

  async getPopular(): Promise<Story[]> {
    return this.storiesRepository.find({
      where: { isActive: true },
      order: { usageCount: 'DESC' },
      take: 10,
    });
  }

  async getStatistics(): Promise<any> {
    const total = await this.storiesRepository.count();
    const active = await this.storiesRepository.count({ where: { isActive: true } });
    const featured = await this.storiesRepository.count({ where: { isFeatured: true } });
    
    const byCategory = await this.storiesRepository
      .createQueryBuilder('story')
      .select('story.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('story.category')
      .getRawMany();

    const byGender = await this.storiesRepository
      .createQueryBuilder('story')
      .select('story.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .groupBy('story.gender')
      .getRawMany();

    return {
      total,
      active,
      featured,
      byCategory,
      byGender,
    };
  }
}

