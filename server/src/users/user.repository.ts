import { mockUsers } from "../mocks/mock.users";
import { User } from "./user.type";

export class UserRepository {
  private readonly users: User[] = [];
  private idSequence = 0;

  constructor() {
    this.users.push(...mockUsers);
  }

  public async save(userDto: Omit<User, "id">): Promise<User> {
    const savedUser = { ...userDto, id: ++this.idSequence };

    this.users.push(savedUser);

    return savedUser;
  }

  public async findOne(
    predicate: (user: User) => boolean
  ): Promise<User | null> {
    return this.users.find(predicate) ?? null;
  }

  public async find(predicate: (user: User) => boolean): Promise<User[]> {
    return this.users.filter(predicate);
  }
}

export const userRepository = new UserRepository();
