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

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  category: StoryCategory;

  @Column({
    type: 'varchar',
    length: 20,
    default: StoryGender.UNISSEX,
  })
  gender: StoryGender;

  @Column({ length: 50 })
  ageRange: string;

  @Column({ nullable: true, length: 500 })
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

  @Column({ default: 0, type: 'int' })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Story>) {
    Object.assign(this, partial);
  }
}

