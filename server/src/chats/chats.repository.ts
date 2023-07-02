import { FindOptionsWhere, Repository } from "typeorm";
import { ChatEntity } from "./entity/chat.entity";
import dataSource from "../data-source";
import { ChatUserEntity } from "../chat-users/entity/chat-user.entity";

export class ChatsRepository {
  constructor(private readonly chatRepo: Repository<ChatEntity>) {}

  public async findByUserId(userId: number): Promise<ChatEntity[]> {
    return this.chatRepo
      .createQueryBuilder("chat")
      .innerJoin(ChatUserEntity, "chatUser", "chatUser.chatId = chat.id")
      .where("chatUser.userId = :userId", { userId })
      .getMany();
  }

  public save(dto: Partial<ChatEntity>): Promise<ChatEntity> {
    return this.chatRepo.save({ ...dto });
  }

  public saveMany(dtos: Partial<ChatEntity>[]): Promise<ChatEntity[]> {
    return this.chatRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public findOneBy(
    where: FindOptionsWhere<ChatEntity>
  ): Promise<ChatEntity | null> {
    return this.chatRepo.findOneBy(where);
  }

  public findBy(where: FindOptionsWhere<ChatEntity>): Promise<ChatEntity[]> {
    return this.chatRepo.findBy(where);
  }
}

export const chatsRepo = new ChatsRepository(
  dataSource.getRepository(ChatEntity)
);
