import { BaseRepository } from "../shared/base-repository";
import { ChatUser } from "./chat-user.type";

export class ChatUserRepository extends BaseRepository<ChatUser> {
  protected rows: ChatUser[] = [];
}

export const chatUserRepository = new ChatUserRepository();
