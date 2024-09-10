import { PrismaModule } from "@/contexts/shared/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { ProfileRepository } from "../domain/profile.repository";
import { PrismaProfilesRepository } from "./repositories/prisma.profiles-repository";

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaProfilesRepository,
    {
      provide: ProfileRepository,
      useExisting: PrismaProfilesRepository,
    },
  ],
  exports: [ProfileRepository],
})
export class ProfileModule {}
