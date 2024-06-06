import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserGroup } from "./user_group.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_data: Date;

  @Column({ type: "bool", name: "is_active" })
  is_active: boolean;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  userGroup: UserGroup[];
}
