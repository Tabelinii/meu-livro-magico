import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Story } from '../../stories/entities/story.entity';

export enum BookStatus {
  DRAFT = 'draft',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  ERROR = 'error',
}

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 100 })
  childName: string;

  @Column({ length: 20 })
  childAge: string;

  @Column({ nullable: true, length: 500 })
  childInterests?: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: BookStatus.DRAFT,
  })
  status: BookStatus;

  @Column({ nullable: true, length: 500 })
  coverImageUrl?: string;

  @Column({ nullable: true, length: 500 })
  pdfUrl?: string;

  @Column('text', { nullable: true })
  personalizedContent?: string;

  @Column({ nullable: true, type: 'int' })
  generationProgress?: number;

  @Column({ nullable: true, length: 1000 })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Story, { eager: true })
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @Column()
  storyId: number;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}

