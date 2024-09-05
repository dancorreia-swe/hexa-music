import { Module } from '@nestjs/common';
import { RegisterController } from './http-api/v1/register/register.controller';
import { UserRepository } from '../domain/user.repository';
import { PrismaUserRepository } from './repositories/prisma.user-repository';
import { PrismaModule } from '@/contexts/shared/prisma/prisma.module';
import { RegisterUserUseCase } from '../application/use-cases/register-use-case/register-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './http-api/v1/login/login.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ValidateUserUseCase } from '../application/use-cases/validate-use-case/validate-user.use-case';
import { AuthenticateUseCase } from '../application/use-cases/authenticate-use-case/authenticate.use-case';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'supersecretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [
    ValidateUserUseCase,
    RegisterUserUseCase,
    AuthenticateUseCase,
    PrismaUserRepository,
    LocalStrategy,
    JwtStrategy,
    {
      provide: UserRepository,
      useExisting: PrismaUserRepository,
    },
  ],
  exports: [RegisterUserUseCase, ValidateUserUseCase, AuthenticateUseCase],
})
export class AuthModule {}
