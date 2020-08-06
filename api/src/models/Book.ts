import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  cover_url: string;

  @Column()
  borrowed: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Book;
