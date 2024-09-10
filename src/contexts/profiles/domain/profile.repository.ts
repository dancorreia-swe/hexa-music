import { Profile } from "./profile.entity";

export abstract class ProfileRepository {
  abstract save(profile: Profile): Promise<void>;
  abstract update(profile: Partial<Profile>): Promise<void>;
  abstract findByUserId(userId: string): Promise<Profile | null>;
}
