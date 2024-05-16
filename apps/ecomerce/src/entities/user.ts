import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class User {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  email: string;
}
