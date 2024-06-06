import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./user.entity";
import { Group } from "./group.entity";

@Unique(["user", "group"])
@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.userGroup)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Group, (group) => group.userGroup)
  @JoinColumn({ name: "group_id", referencedColumnName: "id" })
  group: Group;
}
