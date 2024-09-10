export type ProfilePrimitives = {
  id?: number;
  userId: string;
  bio: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Profile {
  constructor(private attributes: ProfilePrimitives) {}

  static create(
    attributes: Omit<
      ProfilePrimitives,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    >,
  ): Profile {
    return new Profile({
      ...attributes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  toPrimitives(): ProfilePrimitives {
    return { ...this.attributes };
  }
}
