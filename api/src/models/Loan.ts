import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Book from './Book';

@Entity('loans')
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  book_isbn: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_isbn' })
  book: Book;

  @Column()
  book_owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'book_owner_id' })
  book_owner: User;

  @Column()
  book_receiver_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'book_receiver_id' })
  book_receiver: User;

  @Column('timestamp')
  received_at: Date;

  @Column('timestamp')
  returned_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Loan;
