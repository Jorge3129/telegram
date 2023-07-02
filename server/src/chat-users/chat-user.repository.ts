import { FindOptionsWhere, Repository } from "typeorm";
import dataSource from "../data-source";
import { ChatUserEntity } from "./entity/chat-user.entity";

export class ChatUserRepository {
  constructor(private readonly chatUserRepo: Repository<ChatUserEntity>) {}

  public save(dto: Partial<ChatUserEntity>): Promise<ChatUserEntity> {
    return this.chatUserRepo.save({ ...dto, socketIds: [] });
  }

  public saveMany(dtos: Partial<ChatUserEntity>[]): Promise<ChatUserEntity[]> {
    return this.chatUserRepo.save(
      dtos.map((dto) => ({ ...dto, socketIds: [] }))
    );
  }

  public findOneBy(
    where: FindOptionsWhere<ChatUserEntity>
  ): Promise<ChatUserEntity | null> {
    return this.chatUserRepo.findOneBy(where);
  }

  public findBy(
    where: FindOptionsWhere<ChatUserEntity>
  ): Promise<ChatUserEntity[]> {
    return this.chatUserRepo.findBy(where);
  }
}

export const chatUserRepository = new ChatUserRepository(
  dataSource.getRepository(ChatUserEntity)
);
