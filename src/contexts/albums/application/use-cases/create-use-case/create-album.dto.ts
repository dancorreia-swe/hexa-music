import { AlbumType } from "@/contexts/albums/domain/album.entity";
import { JsonValue } from "@prisma/client/runtime/library";

export interface CreateAlbumDto {
    userId: string;
    name: string;
    type: AlbumType;
    albumPic: string;
    collaborations?: JsonValue;
    releasedAt?: Date | null;
}

interface CollaborationDto {
    userId: string
    name: string
}