import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Book from '@modules/books/infra/typeorm/entities/Book';
import Wish from '@modules/wishes/infra/typeorm/entities/Wish';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  whatsapp: string;

  @OneToMany(() => Book, book => book.owner)
  books: Book[];

  @OneToMany(() => Wish, wish => wish.requester)
  wishes: Wish[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
