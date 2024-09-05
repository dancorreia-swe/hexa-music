import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

type UserType = 'COMMON' | 'ARTIST';

export type UserPrimitives = {
  id?: string;
  profileImage: string;
  username: string;
  password: string;
  type: UserType;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export class User {
  constructor(private attributes: UserPrimitives) {}

  static create(
    attributes: Omit<
      UserPrimitives,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): User {
    return new User({
      ...attributes,
      id: uuidv4(),
      password: bcrypt.hashSync(attributes.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  toPrimitives(): UserPrimitives {
    return { ...this.attributes };
  }
}
