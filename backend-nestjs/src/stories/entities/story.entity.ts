import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StoryCategory {
  DESENVOLVIMENTO_INFANTIL = 'desenvolvimento_infantil',
  SUPER_HEROI = 'super_heroi',
  PRINCESA = 'princesa',
  AVENTURA = 'aventura',
  PROFISSOES = 'profissoes',
  DINOSSAURO = 'dinossauro',
  ESPACO = 'espaco',
  AMIGO_LEAO = 'amigo_leao',
  BAILARINA = 'bailarina',
  FADA = 'fada',
  VETERINARIA = 'veterinaria',
  UNICORNIO = 'unicornio',
  SEREIA = 'sereia',
}

export enum StoryGender {
  MENINO = 'menino',
  MENINA = 'menina',
  UNISSEX = 'unissex',
}

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'simple-enum',
    enum: StoryCategory,
  })
  category: StoryCategory;

  @Column({
    type: 'simple-enum',
    enum: StoryGender,
    default: StoryGender.UNISSEX,
  })
  gender: StoryGender;

  @Column()
  ageRange: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column('json')
  pages: {
    title: string;
    text: string;
    imagePrompt?: string;
  }[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Story>) {
    Object.assign(this, partial);
  }
}

