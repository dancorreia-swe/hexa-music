import { Profile } from "./profile.entity";

export abstract class ProfileRepository {
  abstract save(profile: Profile): Promise<void>;
}
