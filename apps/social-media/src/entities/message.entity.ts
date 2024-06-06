import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MessageRecipient } from "./message-recipeint.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "message_body" })
  messageBody: string;

  @OneToMany(
    () => MessageRecipient,
    (messageRecipient) => messageRecipient.message
  )
  messageRecipient: MessageRecipient;

  @CreateDateColumn()
  create_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
