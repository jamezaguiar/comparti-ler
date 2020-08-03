import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLoan1596490517446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loans',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'book_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'book_owner_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'book_receiver_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'received_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'returned_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'loans',
      new TableForeignKey({
        name: 'Book',
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'loans',
      new TableForeignKey({
        name: 'BookOwner',
        columnNames: ['book_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'loans',
      new TableForeignKey({
        name: 'BookReceiver',
        columnNames: ['book_receiver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('loans', 'BookReceiver');
    await queryRunner.dropForeignKey('loans', 'BookOwner');
    await queryRunner.dropForeignKey('loans', 'Book');
    await queryRunner.dropTable('loans');
  }
}
