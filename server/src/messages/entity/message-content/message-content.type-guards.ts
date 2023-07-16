import { MessageContentType } from './message-content-type';
import {
  MessageContentEntity,
  TextMessageContentEntity,
  MediaMessageContentEntity,
  GifContentEntity,
  PollContentEntity,
} from './message-content.entity';

export const isTextContent = (
  value: MessageContentEntity,
): value is TextMessageContentEntity =>
  (value as TextMessageContentEntity).type === MessageContentType.TEXT_MESSAGE;

export const isMediaContent = (
  value: MessageContentEntity,
): value is MediaMessageContentEntity =>
  (value as MediaMessageContentEntity).type ===
  MessageContentType.MEDIA_MESSAGE;

export const isGifContent = (
  value: MessageContentEntity,
): value is GifContentEntity =>
  (value as GifContentEntity).type === MessageContentType.GIF_MESSAGE;

export const isPollContent = (
  value: MessageContentEntity,
): value is PollContentEntity =>
  (value as PollContentEntity).type === MessageContentType.POLL_MESSAGE;
