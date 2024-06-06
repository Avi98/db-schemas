import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Fellowship {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.follower)
  @JoinColumn({ name: "follower_id", referencedColumnName: "id" })
  follower: User;

  @ManyToOne(() => User, (user) => user.followed)
  @JoinColumn({ name: "followed_id", referencedColumnName: "id" })
  followed: User;
}
