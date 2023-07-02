import {
  ChildEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { MediaEntity } from "./media.entity";

export enum MessageContentType {
  TEXT_MESSAGE = "text-message",
  MEDIA_MESSAGE = "media-message",
}

@Entity("message_contents")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export abstract class MessageContentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}

@ChildEntity("text")
export class TextMessageContentEntity extends MessageContentEntity {
  @Column({ type: "text" })
  textContent: string;
}

@ChildEntity("media")
export class MediaMessageContentEntity extends MessageContentEntity {
  @Column({ type: "text", nullable: true })
  textContent?: string;

  @OneToMany(() => MediaEntity, (media) => media.messageContent)
  media: MediaEntity[];
}
