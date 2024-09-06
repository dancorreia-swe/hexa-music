import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpApiModule } from './http-api/http-api.module';
import { AuthModule } from '@/contexts/shared/auth/infrastructure/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    HttpApiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
})
export class AppModule {}
