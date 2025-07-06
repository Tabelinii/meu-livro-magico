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

  @Column()
  title: string;

  @Column()
  childName: string;

  @Column()
  childAge: string;

  @Column({ nullable: true })
  childInterests?: string;

  @Column({
    type: 'simple-enum',
    enum: BookStatus,
    default: BookStatus.DRAFT,
  })
  status: BookStatus;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ nullable: true })
  pdfUrl?: string;

  @Column('text', { nullable: true })
  personalizedContent?: string;

  @Column({ nullable: true })
  generationProgress?: number;

  @Column({ nullable: true })
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

