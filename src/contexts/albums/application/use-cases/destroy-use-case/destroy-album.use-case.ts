import { AlbumRepository } from "@/contexts/albums/domain/album.repository";
import { Injectable } from "@nestjs/common";
import { AlbumNotFoundException } from "@/contexts/albums/domain/album-not-found.exception";
import { DestroyAlbumDto } from "./destroy-album.dto";

@Injectable()
export class DestroyAlbumUseCase {
    constructor(private readonly albumRepository: AlbumRepository) {}

    async run(dto: DestroyAlbumDto): Promise<{ data: string }> {
        const album = await this.albumRepository.findById(dto.id);

        if (!album) {
            throw new AlbumNotFoundException(dto.id);
        }
        
        await this.albumRepository.destroy(dto.id);

        return {
            data: album.toPrimitives().id
        };
    }
}