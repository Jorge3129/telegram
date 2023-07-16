import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MediaMessageContentEntity } from './message-content/message-content.entity';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @ManyToOne(() => MediaMessageContentEntity, (m) => m.media)
  messageContent: MediaMessageContentEntity;
}
