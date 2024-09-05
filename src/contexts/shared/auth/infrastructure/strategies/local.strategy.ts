import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticateUseCase } from '../../application/use-cases/authenticate-use-case/authenticate.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.authenticateUseCase.run({ username, password });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
