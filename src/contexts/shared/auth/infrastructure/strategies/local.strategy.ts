import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUseCase } from '../../application/use-cases/login-use-case/login.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginUseCase: LoginUseCase) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.loginUseCase.run({ username, password });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
