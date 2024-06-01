import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 200 })
  last_name: string;

  @Column({ type: "varchar", length: 200 })
  first_name: string;

  @Column({ type: "varchar", length: 200 })
  email: string;

  @Column({ type: "boolean" })
  is_active: boolean;
}
