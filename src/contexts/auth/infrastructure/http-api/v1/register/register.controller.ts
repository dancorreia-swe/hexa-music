import { Body, Controller, Post } from '@nestjs/common';
import { V1_AUTH } from '../../route.constants';
import { RegisterUserUseCase } from '@/contexts/auth/application/register-use-case/register-user.use-case';
import { RegisterUserHttpDto } from './register.http-dto';
import { UserPrimitives } from '@/contexts/auth/domain/user.entity';

@Controller(V1_AUTH)
export class RegisterController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async run(
    @Body() registerUserHttpDto: RegisterUserHttpDto,
  ): Promise<{ user: UserPrimitives }> {
    return await this.registerUserUseCase.run({
      email: registerUserHttpDto.email,
      password: registerUserHttpDto.password,
      username: registerUserHttpDto.username,
      type: registerUserHttpDto.type,
      profileImage: registerUserHttpDto.profileImage,
    });
  }
}
