import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Book from './Book';

@Entity('wishes')
class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  book_isbn: string;

  book: Book;

  @Column()
  requester_id: string;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Wish;
