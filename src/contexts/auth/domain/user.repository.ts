import { User } from './user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(uuid: string): Promise<User | null>;
  abstract delete(uuid: string): Promise<void>;
}
