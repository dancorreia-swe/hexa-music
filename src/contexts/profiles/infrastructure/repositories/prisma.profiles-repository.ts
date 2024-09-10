import { PrismaService } from "@/contexts/shared/prisma/prisma.service";
import { ProfileRepository } from "../../domain/profile.repository";
import { Profile } from "../../domain/profile.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProfilesRepository extends ProfileRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(profile: Profile): Promise<void> {
    await this.prisma.profile.create({
      data: {
        ...profile.toPrimitives(),
      },
    });
  }
}
