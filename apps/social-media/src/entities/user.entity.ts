import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserGroup } from "./user_group.entity";
import { Fellowship } from "./fellowship.entity";

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

  @OneToMany(() => Fellowship, (fellowship) => fellowship.follower)
  follower: Fellowship;

  @OneToMany(() => Fellowship, (fellowship) => fellowship.followed)
  followed: Fellowship;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  userGroup: UserGroup[];
}
