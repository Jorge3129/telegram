import { BaseRepository } from "../shared/base-repository";
import { User, UserKey } from "./user.type";

export class UserRepository extends BaseRepository<User> {
  protected rows: User[] = [];

  constructor() {
    super();
  }
}

export const userRepository = new UserRepository();
