import { Controller, Delete, Get, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { V1_ALBUM } from "../../route.constants";
import { AlbumPrimitives } from "@/contexts/albums/domain/album.entity";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { JwtAuthGuard } from "@/contexts/shared/auth/application/guards/jwt.guard";
import { DeleteAlbumUseCase } from "@/contexts/albums/application/use-cases/delete-use-case/delete-album.use-case";
import { DeleteAlbumHttpDto } from "./delete-album.http-dto";

@UseGuards(JwtAuthGuard)
@Controller(V1_ALBUM)
export class DeleteAlbumController {
    constructor (private readonly deleteAlbumUseCase: DeleteAlbumUseCase) {}

    @Delete(":id/soft-delete")
    async run (@Param() dto: DeleteAlbumHttpDto): Promise<{ data: string }> {
        try {
            return await this.deleteAlbumUseCase.run({ id: dto.id });
        } catch (error) {
            if (error instanceof AlbumNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}