import { AlbumRepository } from "@/contexts/albums/domain/album.repository";
import { Injectable } from "@nestjs/common";
import { DeleteAlbumDto } from "./delete-album.dto";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";

@Injectable()
export class DeleteAlbumUseCase {
    constructor(private readonly albumRepository: AlbumRepository) {}

    async run(dto: DeleteAlbumDto): Promise<{ data: string }> {
        const album = await this.albumRepository.findById(dto.id);

        if (!album) {
            throw new AlbumNotFoundException(dto.id);
        }
        
        await this.albumRepository.delete(dto.id);

        return {
            data: album.toPrimitives().id
        };
    }
}