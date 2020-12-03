import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Book from '@modules/books/infra/typeorm/entities/Book';

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
