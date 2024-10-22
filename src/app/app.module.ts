import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpApiModule } from "./http-api/http-api.module";
import { AuthModule } from "@/contexts/shared/auth/infrastructure/auth.module";
import { AlbumModule } from "@/contexts/albums/infrastructure/album.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    HttpApiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AlbumModule,
  ],
})
export class AppModule {}
