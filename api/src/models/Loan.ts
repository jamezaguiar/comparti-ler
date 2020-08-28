import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Book from './Book';
import User from './User';

@Entity('loans')
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requester_id: string;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column()
  book_owner_id: string;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'book_owner_id' })
  book_owner: User;

  @Column()
  book_isbn: string;

  @Column()
  book_id: string;

  @OneToOne(type => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  status: 'requested' | 'accepted' | 'rejected' | 'delivered' | 'returned';

  @Column()
  received_at: Date;

  @Column()
  returned_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Loan;
