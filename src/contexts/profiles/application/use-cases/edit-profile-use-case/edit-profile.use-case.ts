import { ProfileRepository } from "@/contexts/profiles/domain/profile.repository";
import { Injectable } from "@nestjs/common";
import { EditProfileDto } from "./edit-profile.dto";
import {
  Profile,
  ProfilePrimitives,
} from "@/contexts/profiles/domain/profile.entity";

@Injectable()
export class EditProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(editProfileDto: EditProfileDto): Promise<ProfilePrimitives> {
    const profile = await this.profileRepository.findByUserId(
      editProfileDto.userId,
    );

    if (!profile) {
      throw new Error("Profile not found");
    }

    const updatedProfile = new Profile({
      ...editProfileDto,
      createdAt: profile.toPrimitives().createdAt,
      updatedAt: new Date(),
    });

    await this.profileRepository.update(updatedProfile);

    return {
      ...updatedProfile.toPrimitives(),
    };
  }
}
