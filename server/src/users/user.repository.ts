import { mockUsers } from "../mocks/mock.users";
import { BaseRepository } from "../shared/base-repository";
import { User, UserKey } from "./user.type";

export class UserRepository extends BaseRepository<User> {
  protected rows: User[] = [];

  constructor() {
    super();

    this.saveMany(mockUsers);
  }
}

export const userRepository = new UserRepository();
