import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./register-user.dto";
import { UserRepository } from "../../../domain/user.repository";
import { User, UserPrimitives } from "../../../domain/user.entity";
import { ProfileRepository } from "@/contexts/profiles/domain/profile.repository";
import { Profile } from "@/contexts/profiles/domain/profile.entity";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run(
    registerDto: RegisterUserDto,
  ): Promise<{ user: Omit<UserPrimitives, "password"> } | any> {
    const user = User.create(registerDto);

    await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toPrimitives();
    const profile = Profile.create({
      userId: userWithoutPassword.id,
      profileImage: registerDto.profileImage,
      bio: "",
    });

    await this.profileRepository.save(profile);

    return {
      user: userWithoutPassword,
    };
  }
}
