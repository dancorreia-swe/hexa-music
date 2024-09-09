import { IsString, IsOptional, IsDateString, IsArray, ValidateNested, IsObject, IsUUID, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AlbumType } from '@/contexts/albums/domain/album.entity';
import { JsonValue } from '@prisma/client/runtime/library';

export class CreateAlbumHttpDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    name: string;

    @IsString()
    type: AlbumType;

    @IsString()
    albumPic: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CollaborationHttpDto)
    collaborations?: JsonValue;

    @IsOptional()
    @IsDateString()
    releasedAt?: Date | null;
}

export class CollaborationHttpDto {
    @IsString()
    userId: string;

    @IsString()
    name: string;
}