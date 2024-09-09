import { Module } from "@nestjs/common";
import { CreateAlbumController } from "./http-api/v1/create-album/create-album.controller";
import { FindAlbumByIdController } from "./http-api/v1/find-album-by-id/find-album-by-id.controller";
import { CreateAlbumUseCase } from "../application/use-cases/create-use-case/create-album.use-case";
import { FindAlbumByIdUseCase } from "../application/use-cases/find-by-id-use-case/find-album-by-id.use-case";
import { PrismaAlbumRepository } from "./repositories/prisma.album-repository";
import { AlbumRepository } from "../domain/album.repository";
import { PrismaModule } from "@/contexts/shared/prisma/prisma.module";
import { DeleteAlbumUseCase } from "../application/use-cases/delete-use-case/delete-album.use-case";
import { DeleteAlbumController } from "./http-api/v1/delete-album/delete-album.controller";
import { DestroyAlbumController } from "./http-api/v1/destroy-album/destroy-album.controller";
import { DestroyAlbumUseCase } from "../application/use-cases/destroy-use-case/destroy-album.use-case";
import { RestoreAlbumController } from "./http-api/v1/restore-album/restore-album.controller";
import { RestoreAlbumUseCase } from "../application/use-cases/restore-use-case/restore-album.use-case";

@Module({
    imports: [PrismaModule],
    controllers: [
        CreateAlbumController, 
        FindAlbumByIdController,
        DeleteAlbumController,
        DestroyAlbumController,
        RestoreAlbumController
    ],
    providers: [
        CreateAlbumUseCase,
        FindAlbumByIdUseCase,
        DeleteAlbumUseCase,
        DestroyAlbumUseCase,
        RestoreAlbumUseCase,
        PrismaAlbumRepository,
        {
            provide: AlbumRepository,
            useExisting: PrismaAlbumRepository
        },
    ],
    exports: [CreateAlbumUseCase, FindAlbumByIdUseCase],
})
export class AlbumModule {}