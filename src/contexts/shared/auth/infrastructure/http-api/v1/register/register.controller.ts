import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { V1_AUTH } from '../../route.constants';
import { RegisterUserHttpDto } from './register.http-dto';
import { Prisma } from '@prisma/client';
import { UserPrimitives } from '@/contexts/shared/auth/domain/user.entity';
import { RegisterUserUseCase } from '@/contexts/shared/auth/application/use-cases/register-use-case/register-user.use-case';

@Controller(V1_AUTH)
export class RegisterController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async run(
    @Body() registerUserHttpDto: RegisterUserHttpDto,
  ): Promise<{ user: UserPrimitives }> {
    try {
      return await this.registerUserUseCase.run({
        email: registerUserHttpDto.email,
        password: registerUserHttpDto.password,
        username: registerUserHttpDto.username,
        type: registerUserHttpDto.type,
        profileImage: registerUserHttpDto.profileImage,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `User with this ${error.meta.target} already exists`,
          );
        }
      }

      throw error;
    }
  }
}
