import {
  ChildEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { MediaEntity } from "./media.entity";
import { MessageEntity } from "./message.entity";

export enum MessageContentType {
  TEXT_MESSAGE = "text-message",
  MEDIA_MESSAGE = "media-message",
}

@Entity("message_contents")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export abstract class MessageContentEntity {
  type: MessageContentType;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => MessageEntity, (m) => m.content)
  message: MessageEntity;
}

@ChildEntity("text")
export class TextMessageContentEntity extends MessageContentEntity {
  type = MessageContentType.TEXT_MESSAGE;

  @Column({ type: "text" })
  textContent: string;
}

@ChildEntity("media")
export class MediaMessageContentEntity extends MessageContentEntity {
  type = MessageContentType.MEDIA_MESSAGE;

  @Column({ type: "text", nullable: true })
  textContent?: string;

  @OneToMany(() => MediaEntity, (media) => media.messageContent)
  media: MediaEntity[];
}

export const isTextContent = (
  value: MessageContentEntity
): value is TextMessageContentEntity =>
  value.type === MessageContentType.TEXT_MESSAGE;
