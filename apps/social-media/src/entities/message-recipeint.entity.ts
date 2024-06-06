import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class MessageRecipient {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  recipient_id: string;

  @ManyToOne(() => Message, (message) => message.messageRecipient)
  @JoinColumn({ name: "message_id", referencedColumnName: "id" })
  message!: Message;

  @Column({ name: "is_read", type: "boolean", default: false })
  isRead: boolean;
}
