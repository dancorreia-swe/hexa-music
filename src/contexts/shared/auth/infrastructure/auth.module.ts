import { Module } from '@nestjs/common';
import { RegisterController } from './http-api/v1/register/register.controller';
import { UserRepository } from '../domain/user.repository';
import { PrismaUserRepository } from './repositories/prisma.user-repository';
import { PrismaModule } from '@/contexts/shared/prisma/prisma.module';
import { RegisterUserUseCase } from '../application/use-cases/register-use-case/register-user.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [RegisterController],
  providers: [
    RegisterUserUseCase,
    PrismaUserRepository,
    {
      provide: UserRepository,
      useExisting: PrismaUserRepository,
    },
  ],
  exports: [RegisterUserUseCase],
})
export class AuthModule {}
