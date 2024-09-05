import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { V1_AUTH } from '../../route.constants';
import { LocalGuard } from '@/contexts/shared/auth/application/guards/local.guard';
import { Request } from 'express';
import { AuthenticateUseCase } from '@/contexts/shared/auth/application/use-cases/authenticate-use-case/authenticate.use-case';

@Controller(V1_AUTH)
export class LoginController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return this.authenticateUseCase.run((req.user as any).id);
  }
}
